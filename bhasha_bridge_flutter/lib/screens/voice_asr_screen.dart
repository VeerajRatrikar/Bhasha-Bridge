import 'package:flutter/material.dart';

class VoiceAsrScreen extends StatefulWidget {
  const VoiceAsrScreen({super.key});

  @override
  State<VoiceAsrScreen> createState() => _VoiceAsrScreenState();
}

class _VoiceAsrScreenState extends State<VoiceAsrScreen> {
  bool isRecording = false;
  int selectedPreset = 0;

  final List<Map<String, String>> presets = [
    {
      'label': '⚙️ Peenya CNC (English)',
      'query': 'Need 500 pcs Haas CNC precision spur gears from Peenya hub under 6.5 lakhs within 14 days',
      'category': 'Peenya CNC Precision Engineering',
      'budget': '₹6,50,000',
      'hub': 'Peenya Industrial Area, Bengaluru',
    },
    {
      'label': '🧶 Mysuru Silk (Kannada)',
      'query': 'ನನಗೆ ಮೈಸೂರಿನಿಂದ 200 GSM organic pure mulberry raw silk blend ಬೇಕು, 1000 meters minimum order',
      'category': 'Mysuru Silk & Organic Weaves',
      'budget': '₹9,85,000',
      'hub': 'Mysuru Weavers Hub & Expressway',
    },
    {
      'label': '🔧 Belagavi Valve (Kanglish)',
      'query': 'Belagavi foundry cluster ninda 15,000 hydraulic ductile iron valves beku under 12 lakhs with e-way bill',
      'category': 'Belagavi Heavy Foundry Valves',
      'budget': '₹12,00,000',
      'hub': 'Belagavi Foundry Corridor',
    },
    {
      'label': '📦 Davangere Cotton (Kannada)',
      'query': 'ದಾವಣಗೆರೆ ನೂಲಿನ ಗಿರಣಿಗಳಿಂದ 500 ಬೇಲ್ಸ್ ಸಾವಯವ ಹತ್ತಿ ನೂಲು ತಕ್ಷಣವೇ ಬೇಕಾಗಿದೆ.',
      'category': 'Davangere Cotton Spinning Mills',
      'budget': '₹12,80,000',
      'hub': 'Davangere Central Corridor',
    },
  ];

  void _toggleMic() {
    setState(() {
      isRecording = !isRecording;
    });

    if (isRecording) {
      Future.delayed(const Duration(milliseconds: 1500), () {
        if (mounted) {
          setState(() {
            isRecording = false;
            selectedPreset = (selectedPreset + 1) % presets.length;
          });
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final p = presets[selectedPreset];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0A0D16),
        title: const Text('Bhashini Indic Voice ASR Studio'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Sample Presets Wrap
            const Text(
              'Select Vernacular Voice Scenario:',
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: List.generate(presets.length, (index) {
                final isSel = selectedPreset == index;
                return ChoiceChip(
                  label: Text(presets[index]['label']!),
                  selected: isSel,
                  selectedColor: const Color(0xFFF59E0B),
                  backgroundColor: const Color(0xFF0E1422),
                  labelStyle: TextStyle(
                    color: isSel ? Colors.black : Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 11,
                  ),
                  onSelected: (val) {
                    if (val) {
                      setState(() {
                        selectedPreset = index;
                      });
                    }
                  },
                );
              }),
            ),

            const SizedBox(height: 24),

            // Microphone Orb
            Center(
              child: GestureDetector(
                onTap: _toggleMic,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  width: isRecording ? 120 : 100,
                  height: isRecording ? 120 : 100,
                  decoration: BoxDecoration(
                    color: isRecording ? Colors.red : const Color(0xFFF59E0B),
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: isRecording
                            ? Colors.red.withOpacity(0.6)
                            : const Color(0xFFF59E0B).withOpacity(0.3),
                        blurRadius: 25,
                        spreadRadius: 6,
                      )
                    ],
                  ),
                  child: Icon(
                    isRecording ? Icons.stop : Icons.mic,
                    size: 50,
                    color: Colors.black,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Center(
              child: Text(
                isListeningText(),
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
              ),
            ),

            const SizedBox(height: 24),

            // Extracted NLU Result Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF0E1422),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0x40F59E0B)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Extracted NLU Entities',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: const Color(0x3010B981),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Text(
                          'Confidence: 96.4%',
                          style: TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                      )
                    ],
                  ),
                  const Divider(color: Colors.white10, height: 20),
                  const Text(
                    'Transcribed Speech:',
                    style: TextStyle(color: Colors.grey, fontSize: 11),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    p['query']!,
                    style: const TextStyle(color: Color(0xFFF59E0B), fontWeight: FontWeight.bold, fontSize: 13),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          'Category: ${p['category']!}',
                          style: const TextStyle(fontSize: 11, color: Colors.white),
                        ),
                      ),
                      Text(
                        'Budget: ${p['budget']!}',
                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.emeraldAccent),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Hub: ${p['hub']!}',
                    style: const TextStyle(fontSize: 11, color: Colors.grey),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  String isListeningText() {
    if (isRecording) {
      return 'ಧ್ವನಿ ದಾಖಲಿಸಲಾಗುತ್ತಿದೆ... (Processing Vernacular Speech)';
    }
    return 'Tap Microphone to Speak in Kannada (ಧ್ವನಿ ASR)';
  }
}
