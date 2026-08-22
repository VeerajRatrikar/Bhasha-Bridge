// Server-side Bhashini ULCA pipeline client (API keys stay on server)

const CONFIG_URL = 'https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline';

export type BhashiniTaskType = 'asr' | 'translation' | 'tts';

export interface BhashiniLanguageConfig {
  sourceLanguage: string;
  targetLanguage?: string;
}

interface PipelineCacheEntry {
  callbackUrl: string;
  authHeaderName: string;
  authHeaderValue: string;
  serviceIds: Record<string, string>;
  expiresAt: number;
}

const pipelineCache = new Map<string, PipelineCacheEntry>();
const CACHE_TTL_MS = 30 * 60 * 1000;

export function isBhashiniConfigured(): boolean {
  return Boolean(
    process.env.BHASHINI_USER_ID &&
      process.env.BHASHINI_API_KEY &&
      process.env.BHASHINI_PIPELINE_ID
  );
}

function getCredentials() {
  const userId = process.env.BHASHINI_USER_ID;
  const apiKey = process.env.BHASHINI_API_KEY;
  const pipelineId = process.env.BHASHINI_PIPELINE_ID;

  if (!userId || !apiKey || !pipelineId) {
    throw new Error('Bhashini credentials are not configured');
  }

  return { userId, apiKey, pipelineId };
}

function cacheKey(taskTypes: BhashiniTaskType[], lang: BhashiniLanguageConfig): string {
  return JSON.stringify({ taskTypes, lang });
}

async function fetchWithRetry(url: string, init: RequestInit, retries = 2): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, init);
      if (response.ok || attempt === retries) return response;
      lastError = new Error(`HTTP ${response.status}: ${await response.text()}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
    await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
  }

  throw lastError ?? new Error('Bhashini request failed');
}

function pickServiceId(
  configs: Array<{ taskType: string; config: Array<{ serviceId: string; language?: Record<string, string> }> }>,
  taskType: string,
  lang: BhashiniLanguageConfig
): string {
  const taskConfig = configs.find((c) => c.taskType === taskType);
  if (!taskConfig?.config?.length) {
    throw new Error(`No Bhashini service config for task: ${taskType}`);
  }

  const match = taskConfig.config.find((entry) => {
    const source = entry.language?.sourceLanguage;
    const target = entry.language?.targetLanguage;
    if (taskType === 'translation') {
      return source === lang.sourceLanguage && target === lang.targetLanguage;
    }
    return source === lang.sourceLanguage;
  });

  return (match ?? taskConfig.config[0]).serviceId;
}

export async function getPipelineSession(
  taskTypes: BhashiniTaskType[],
  lang: BhashiniLanguageConfig
): Promise<PipelineCacheEntry> {
  const key = cacheKey(taskTypes, lang);
  const cached = pipelineCache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached;

  const { userId, apiKey, pipelineId } = getCredentials();

  const pipelineTasks = taskTypes.map((taskType) => {
    if (taskType === 'asr') {
      return {
        taskType,
        config: { language: { sourceLanguage: lang.sourceLanguage } },
      };
    }
    if (taskType === 'translation') {
      return {
        taskType,
        config: {
          language: {
            sourceLanguage: lang.sourceLanguage,
            targetLanguage: lang.targetLanguage ?? 'en',
          },
        },
      };
    }
    return {
      taskType,
      config: { language: { sourceLanguage: lang.sourceLanguage } },
    };
  });

  const response = await fetchWithRetry(CONFIG_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      userID: userId,
      ulcaApiKey: apiKey,
    },
    body: JSON.stringify({
      pipelineTasks,
      pipelineRequestConfig: { pipelineId },
    }),
  });

  if (!response.ok) {
    throw new Error(`Bhashini pipeline config failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const endpoint = data.pipelineInferenceAPIEndPoint;
  const responseConfig: Array<{
    taskType: string;
    config: Array<{ serviceId: string; language?: Record<string, string> }>;
  }> = data.pipelineResponseConfig ?? [];

  const serviceIds: Record<string, string> = {};
  for (const taskType of taskTypes) {
    serviceIds[taskType] = pickServiceId(responseConfig, taskType, lang);
  }

  const entry: PipelineCacheEntry = {
    callbackUrl: endpoint.callbackUrl,
    authHeaderName: endpoint.inferenceApiKey.name,
    authHeaderValue: endpoint.inferenceApiKey.value,
    serviceIds,
    expiresAt: Date.now() + CACHE_TTL_MS,
  };

  pipelineCache.set(key, entry);
  return entry;
}

export async function runBhashiniASR(
  audioBase64: string,
  sourceLanguage: string,
  audioFormat = 'wav',
  samplingRate = 16000
): Promise<{ transcript: string; confidence: number }> {
  const session = await getPipelineSession(['asr'], { sourceLanguage });
  const serviceId = session.serviceIds.asr;

  const body = {
    pipelineTasks: [
      {
        taskType: 'asr',
        config: {
          language: { sourceLanguage },
          serviceId,
          audioFormat,
          samplingRate,
        },
      },
    ],
    inputData: {
      input: [{ source: null }],
      audio: [{ audioContent: audioBase64 }],
    },
  };

  const response = await fetchWithRetry(session.callbackUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [session.authHeaderName]: session.authHeaderValue,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Bhashini ASR failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const asrOutput = data.pipelineResponse?.find(
    (item: { taskType: string }) => item.taskType === 'asr'
  );
  const transcript = asrOutput?.output?.[0]?.source ?? '';

  return { transcript, confidence: transcript ? 0.94 : 0.5 };
}

export async function runBhashiniTranslation(
  text: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<string> {
  const session = await getPipelineSession(['translation'], { sourceLanguage, targetLanguage });
  const serviceId = session.serviceIds.translation;

  const body = {
    pipelineTasks: [
      {
        taskType: 'translation',
        config: {
          language: { sourceLanguage, targetLanguage },
          serviceId,
        },
      },
    ],
    inputData: {
      input: [{ source: text }],
      audio: [{ audioContent: null }],
    },
  };

  const response = await fetchWithRetry(session.callbackUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [session.authHeaderName]: session.authHeaderValue,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Bhashini translation failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const translationOutput = data.pipelineResponse?.find(
    (item: { taskType: string }) => item.taskType === 'translation'
  );
  return translationOutput?.output?.[0]?.target ?? text;
}

export async function runBhashiniTTS(
  text: string,
  sourceLanguage: string,
  gender: 'male' | 'female' = 'female'
): Promise<string> {
  const session = await getPipelineSession(['tts'], { sourceLanguage });
  const serviceId = session.serviceIds.tts;

  const body = {
    pipelineTasks: [
      {
        taskType: 'tts',
        config: {
          language: { sourceLanguage },
          serviceId,
          gender,
        },
      },
    ],
    inputData: {
      input: [{ source: text }],
      audio: [{ audioContent: null }],
    },
  };

  const response = await fetchWithRetry(session.callbackUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [session.authHeaderName]: session.authHeaderValue,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Bhashini TTS failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const ttsOutput = data.pipelineResponse?.find(
    (item: { taskType: string }) => item.taskType === 'tts'
  );
  const audioContent = ttsOutput?.audio?.[0]?.audioContent;
  if (!audioContent) throw new Error('Bhashini TTS returned no audio');
  return audioContent;
}

export function toBhashiniLanguageCode(appLang: string): string {
  if (appLang.startsWith('kn')) return 'kn';
  if (appLang.startsWith('en')) return 'en';
  return 'en';
}
