/**
 * Indic & Vernacular Natural Language Processing (NLP/NLU) Entity Extraction Engine
 * Supports Kannada (kn-IN), English (en-IN), and Code-Switched Kannada-English (Kanglish)
 */

export interface ParsedNluResult {
  rawText: string;
  detectedLanguage: 'kn-IN' | 'en-IN' | 'kn-en-mixed';
  intent: 'SEARCH_SUPPLIER' | 'REQUEST_QUOTE' | 'CALCULATE_FREIGHT' | 'CHECK_ESCROW' | 'UNKNOWN';
  confidenceScore: number; // 0 to 1.0
  entities: {
    category: string | null;
    district: string | null;
    budget: string | null;
    quantity: string | null;
    timeline: string | null;
    specs: string[];
  };
  matchedSuppliersCount: number;
}

export function parseNaturalLanguageInput(input: string): ParsedNluResult {
  const text = input.trim();
  const lower = text.toLowerCase();

  // 1. Language Detection
  const hasKannadaChar = /[\u0C80-\u0CFF]/.test(text);
  const hasEnglishChar = /[a-zA-Z]/.test(text);
  let detectedLanguage: 'kn-IN' | 'en-IN' | 'kn-en-mixed' = 'en-IN';

  if (hasKannadaChar && hasEnglishChar) {
    detectedLanguage = 'kn-en-mixed';
  } else if (hasKannadaChar) {
    detectedLanguage = 'kn-IN';
  }

  // 2. Intent Classification
  let intent: ParsedNluResult['intent'] = 'SEARCH_SUPPLIER';
  if (
    lower.includes('freight') || lower.includes('cost') || lower.includes('calculator') ||
    lower.includes('ಸಾಗಣೆ') || lower.includes('ವೆಚ್ಚ') || lower.includes('ಲೆಕ್ಕ')
  ) {
    intent = 'CALCULATE_FREIGHT';
  } else if (
    lower.includes('escrow') || lower.includes('payment') || lower.includes('upi') ||
    lower.includes('ಪಾವತಿ') || lower.includes('ಲಾಕ್') || lower.includes('ಹಣ')
  ) {
    intent = 'CHECK_ESCROW';
  } else if (
    lower.includes('rfq') || lower.includes('quote') || lower.includes('bid') ||
    lower.includes('ಕೊಟೇಶನ್') || lower.includes('ದರ') || lower.includes('ಟೆಂಡರ್')
  ) {
    intent = 'REQUEST_QUOTE';
  }

  // 3. Category Extraction
  let category: string | null = null;
  if (
    lower.includes('silk') || lower.includes(' yarn') || lower.includes('mulberry') || lower.includes('spool') ||
    lower.includes('ರೇಷ್ಮೆ') || lower.includes('ನೂಲು') || lower.includes('ಬಟ್ಟೆ')
  ) {
    category = 'Mysuru Silk & Textile Weaving';
  } else if (
    lower.includes('cnc') || lower.includes('gear') || lower.includes('tooling') || lower.includes('milling') ||
    lower.includes('ಪೀಣ್ಯ') || lower.includes('ಗೇರ್') || lower.includes('ಮಿಲ್ಲಿಂಗ್')
  ) {
    category = 'Peenya CNC & Precision Engineering';
  } else if (
    lower.includes('valve') || lower.includes('foundry') || lower.includes('ductile') || lower.includes('iron') ||
    lower.includes('ವಾಲ್ವ್') || lower.includes('ಫೌಂಡ್ರಿ')
  ) {
    category = 'Belagavi Foundry & Hydraulic Valves';
  } else if (
    lower.includes('cotton') || lower.includes('bale') || lower.includes('combed') ||
    lower.includes('ಹತ್ತಿ') || lower.includes('ಗಿರಣಿ')
  ) {
    category = 'Davangere Cotton Spinning Mills';
  } else if (
    lower.includes('coffee') || lower.includes('cardamom') || lower.includes('spice') ||
    lower.includes('ಕಾಫಿ') || lower.includes('ಏಲಕ್ಕಿ') || lower.includes('ಸಾಂಬಾರ')
  ) {
    category = 'Chikkamagaluru Spices & Arabica Coffee';
  }

  // 4. District / Location Extraction
  let district: string | null = null;
  if (lower.includes('peenya') || lower.includes('bengaluru') || lower.includes('ಪೀಣ್ಯ') || lower.includes('ಬೆಂಗಳೂರು')) {
    district = 'Bengaluru (Peenya Industrial Area)';
  } else if (lower.includes('mysuru') || lower.includes('mysore') || lower.includes('ಮೈಸೂರು')) {
    district = 'Mysuru Weaving Corridor';
  } else if (lower.includes('belagavi') || lower.includes('belgaum') || lower.includes('ಬೆಳಗಾವಿ')) {
    district = 'Belagavi Foundry Cluster';
  } else if (lower.includes('davangere') || lower.includes('ದಾವಣಗೆರೆ')) {
    district = 'Davangere Central Corridor';
  } else if (lower.includes('chikkamagaluru') || lower.includes('chikmagalur') || lower.includes('ಚಿಕ್ಕಮಗಳೂರು')) {
    district = 'Chikkamagaluru & Hassan';
  }

  // 5. Budget Extraction Regex
  let budget: string | null = null;
  const budgetMatch = text.match(/(₹?\s?\d+([.,]\d+)*\s*(lakhs?|lakh|k|thousand|ಸಾಕ|ಲಕ್ಷ)?)/i);
  if (budgetMatch) {
    budget = budgetMatch[0].trim();
    if (!budget.startsWith('₹')) budget = '₹' + budget;
  } else if (lower.includes('6.5') || lower.includes('6,50,000')) {
    budget = '₹6,50,000';
  } else if (lower.includes('9.8') || lower.includes('9,85,000')) {
    budget = '₹9,85,000';
  }

  // 6. Quantity Extraction Regex
  let quantity: string | null = null;
  const qtyMatch = text.match(/(\d+([.,]\d+)*\s*(pcs|pieces|meters|m|bales|kg|units|meters|ಮೀಟರ್|ಪೀಸ್))/i);
  if (qtyMatch) {
    quantity = qtyMatch[0].trim();
  }

  // 7. Timeline Extraction
  let timeline: string | null = null;
  if (lower.includes('14') || lower.includes('two weeks') || lower.includes('2 weeks') || lower.includes('ವಾರ')) {
    timeline = '14 Days';
  } else if (lower.includes('48 hours') || lower.includes('2 days') || lower.includes('ದಿವಸ')) {
    timeline = '48 Hours Express';
  } else if (lower.includes('7 days') || lower.includes('1 week')) {
    timeline = '7 Days';
  }

  // 8. Extract Specifications
  const specs: string[] = [];
  if (lower.includes('haas') || lower.includes('5-axis') || lower.includes('±0.05mm')) {
    specs.push('±0.05mm precision tolerance on 5-axis Haas CNC');
  }
  if (lower.includes('silk mark') || lower.includes('200 gsm') || lower.includes('mulberry')) {
    specs.push('Silk Mark Certified 200 GSM pure Mulberry silk');
  }
  if (lower.includes('nabl') || lower.includes('25-bar') || lower.includes('hydrostatic')) {
    specs.push('NABL 25-bar hydrostatic pressure tested body');
  }
  if (specs.length === 0) {
    specs.push('Karnataka MSME Quality Standard Certified');
  }

  // Confidence Score Calculation based on extracted entity richness
  let confidenceScore = 0.72;
  if (category) confidenceScore += 0.08;
  if (district) confidenceScore += 0.08;
  if (budget) confidenceScore += 0.06;
  if (quantity) confidenceScore += 0.06;

  return {
    rawText: text,
    detectedLanguage,
    intent,
    confidenceScore: Math.min(confidenceScore, 0.99),
    entities: {
      category: category || 'General MSME Procurement',
      district: district || 'Karnataka (All Districts)',
      budget: budget || 'As Per RFQ Quote',
      quantity: quantity || 'Standard Order Quantity',
      timeline: timeline || 'Within 14 Days',
      specs
    },
    matchedSuppliersCount: category ? 18 : 142
  };
}
