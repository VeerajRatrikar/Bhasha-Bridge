// Realistic product seed data for Bhasha-Bridge
// Built around live procurement workflows, trusted supplier discovery, and multilingual voice search.

import { Supplier, Product, Category, Location, VoicePresetScenario, ProcurementQuery, TrustedVendor, Feedback } from '../types';

export const LOCATIONS: Location[] = [
  { Location_ID: 'LOC_001', City: 'Bengaluru', State: 'Karnataka', District: 'Bengaluru Urban', Pincode: '560058', AreaName: 'Peenya Industrial Area Phase 2', Latitude: 13.0285, Longitude: 77.5197 },
  { Location_ID: 'LOC_002', City: 'Mandya', State: 'Karnataka', District: 'Mandya', Pincode: '571401', AreaName: 'Industrial Suburb', Latitude: 12.5218, Longitude: 76.8951 },
  { Location_ID: 'LOC_003', City: 'Bengaluru', State: 'Karnataka', District: 'Bengaluru Urban', Pincode: '560099', AreaName: 'Bommasandra Industrial Area', Latitude: 12.8066, Longitude: 77.6833 },
  { Location_ID: 'LOC_004', City: 'Tumakuru', State: 'Karnataka', District: 'Tumakuru', Pincode: '572101', AreaName: 'Vasanthnarasapura Industrial Area', Latitude: 13.3409, Longitude: 77.1016 },
  { Location_ID: 'LOC_005', City: 'Bengaluru', State: 'Karnataka', District: 'Bengaluru Urban', Pincode: '560010', AreaName: 'Rajajinagar Industrial Suburb', Latitude: 12.9890, Longitude: 77.5539 },
  { Location_ID: 'LOC_006', City: 'Coimbatore', State: 'Tamil Nadu', District: 'Coimbatore', Pincode: '641006', AreaName: 'Peelamedu Industrial Estate', Latitude: 11.0267, Longitude: 77.0044 },
];

export const CATEGORIES: Category[] = [
  { Category_ID: 'CAT_TEX', Name: 'Textiles & Silk Fabrics', Description: 'Raw silk yarn, Mysore silk weaves, cotton fabrics, and dyes', Parent_Category_ID: null, IconName: 'Shirt' },
  { Category_ID: 'CAT_IND', Name: 'Industrial Fasteners & Hardware', Description: 'Stainless steel bolts, nuts, washers, machine screws, and fittings', Parent_Category_ID: null, IconName: 'Wrench' },
  { Category_ID: 'CAT_PKG', Name: 'Corrugated Packaging & Containers', Description: '5-ply shipping boxes, bubble wraps, tapes, and eco-packaging', Parent_Category_ID: null, IconName: 'Package' },
  { Category_ID: 'CAT_ELE', Name: 'Electrical & Automation Components', Description: 'Copper wiring, circuit breakers, relays, and motor drives', Parent_Category_ID: null, IconName: 'Zap' },
  { Category_ID: 'CAT_CHM', Name: 'Industrial Dyes & Organic Chemicals', Description: 'Textile dyes, degreasers, solvent cleaners, and polymers', Parent_Category_ID: null, IconName: 'FlaskConical' },
  { Category_ID: 'CAT_MCH', Name: 'Precision CNC & Tooling Parts', Description: 'Lathe tools, milled components, hydraulic cylinders, and dies', Parent_Category_ID: null, IconName: 'Cog' },
];

export const SUPPLIERS: Supplier[] = [
  {
    Supplier_ID: 'SUP_001',
    Business_Name: 'Chamundeshwari Silk & Yarn Weavers',
    Contact_Person: 'Suresh Gowda',
    Phone: '+91 98450 12345',
    Email: 'sales@chamundeshwarisilk.in',
    Location_ID: 'LOC_002',
    Address: 'Plot 42, Sugar Town Main Road, Mandya, KA 571401',
    Rating: 4.9,
    Trust_Score: 96,
    Verification_Status: 'GOLD_PARTNER',
    Recommended_Count: 342,
    Latitude: 12.5218,
    Longitude: 76.8951,
    GSTIN: '29AABCC1234F1Z2',
    Years_In_Business: 18,
    City: 'Mandya',
    District: 'Mandya',
    Categories: ['CAT_TEX', 'CAT_CHM'],
    Image_URL: 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=600&q=80',
    Specialties: ['Pure Mulberry Silk Yarn', 'Mysore Silk Weaves', 'Zari Threads'],
    ResponseTimeMinutes: 15,
    LanguageSupport: ['Kannada', 'English', 'Hindi']
  },
  {
    Supplier_ID: 'SUP_002',
    Business_Name: 'Peenya Precision Fasteners & Tools',
    Contact_Person: 'K. V. Ramachandra',
    Phone: '+91 98801 67890',
    Email: 'ramachandra@peenyafasteners.com',
    Location_ID: 'LOC_001',
    Address: '14th Cross, 3rd Phase, Peenya Industrial Area, Bengaluru, KA 560058',
    Rating: 4.8,
    Trust_Score: 94,
    Verification_Status: 'VERIFIED',
    Recommended_Count: 289,
    Latitude: 13.0285,
    Longitude: 77.5197,
    GSTIN: '29AABPF9876K1Z9',
    Years_In_Business: 22,
    City: 'Bengaluru',
    District: 'Bengaluru Urban',
    Categories: ['CAT_IND', 'CAT_MCH'],
    Image_URL: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    Specialties: ['SS 304 & 316 Bolts', 'High-Tensile Machine Screws', 'Custom Thread Rods'],
    ResponseTimeMinutes: 10,
    LanguageSupport: ['Kannada', 'English', 'Tamil']
  },
  {
    Supplier_ID: 'SUP_003',
    Business_Name: 'Vidyaranya Packaging Solutions',
    Contact_Person: 'Anand Kumar',
    Phone: '+91 94482 33445',
    Email: 'anand@vidyaranyapackaging.com',
    Location_ID: 'LOC_003',
    Address: 'Anekal Main Road, Bommasandra Industrial Area, Bengaluru, KA 560099',
    Rating: 4.7,
    Trust_Score: 91,
    Verification_Status: 'PREMIUM',
    Recommended_Count: 195,
    Latitude: 12.8066,
    Longitude: 77.6833,
    GSTIN: '29AAAPV5544R1ZM',
    Years_In_Business: 12,
    City: 'Bengaluru',
    District: 'Bengaluru Urban',
    Categories: ['CAT_PKG'],
    Image_URL: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    Specialties: ['5-Ply Heavy Duty Boxes', 'Bubble Wrap Rolls', 'Custom Printed Tapes'],
    ResponseTimeMinutes: 20,
    LanguageSupport: ['Kannada', 'English']
  },
  {
    Supplier_ID: 'SUP_004',
    Business_Name: 'Hootagalli Electricals & Control Gears',
    Contact_Person: 'Nitin Rao',
    Phone: '+91 97312 99887',
    Email: 'info@hootagallielectricals.in',
    Location_ID: 'LOC_004',
    Address: 'Plot 18B, Vasanthnarasapura Industrial Area, Tumakuru, KA 572101',
    Rating: 4.6,
    Trust_Score: 88,
    Verification_Status: 'VERIFIED',
    Recommended_Count: 154,
    Latitude: 12.3375,
    Longitude: 76.5898,
    GSTIN: '29AABHE1122D1ZP',
    Years_In_Business: 15,
    City: 'Tumakuru',
    District: 'Tumakuru',
    Categories: ['CAT_ELE'],
    Image_URL: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    Specialties: ['Industrial Copper Cables', 'Schneider MCBs & Contactors', 'VFD Drives'],
    ResponseTimeMinutes: 30,
    LanguageSupport: ['Kannada', 'English']
  },
  {
    Supplier_ID: 'SUP_005',
    Business_Name: 'Karnataka Electro-Chemicals Corp',
    Contact_Person: 'B. S. Manjunath',
    Phone: '+91 99005 44332',
    Email: 'manjunath@karnatakachemicals.co.in',
    Location_ID: 'LOC_005',
    Address: 'Rajajinagar 1st Block Industrial Suburb, Bengaluru, KA 560010',
    Rating: 4.8,
    Trust_Score: 93,
    Verification_Status: 'GOLD_PARTNER',
    Recommended_Count: 220,
    Latitude: 12.9890,
    Longitude: 77.5539,
    GSTIN: '29AABKE8899E1ZT',
    Years_In_Business: 25,
    City: 'Bengaluru',
    District: 'Bengaluru Urban',
    Categories: ['CAT_CHM', 'CAT_TEX'],
    Image_URL: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
    Specialties: ['Textile Acid Dyes', 'Industrial Degreasers', 'Caustic Soda Flakes'],
    ResponseTimeMinutes: 12,
    LanguageSupport: ['Kannada', 'English', 'Hindi']
  },
  {
    Supplier_ID: 'SUP_006',
    Business_Name: 'Kovai High Tech CNC Machining',
    Contact_Person: 'M. Selvaraj',
    Phone: '+91 94430 77112',
    Email: 'selvaraj@kovaicnc.com',
    Location_ID: 'LOC_006',
    Address: 'Avinashi Road, Peelamedu Industrial Estate, Coimbatore, TN 641006',
    Rating: 4.9,
    Trust_Score: 95,
    Verification_Status: 'GOLD_PARTNER',
    Recommended_Count: 310,
    Latitude: 11.0267,
    Longitude: 77.0044,
    GSTIN: '33AABKH4433P1Z1',
    Years_In_Business: 20,
    City: 'Coimbatore',
    District: 'Coimbatore',
    Categories: ['CAT_MCH', 'CAT_IND'],
    Image_URL: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    Specialties: ['Precision Milled Dies', 'Hydraulic Cylinders', 'Custom Lathe Tooling'],
    ResponseTimeMinutes: 18,
    LanguageSupport: ['English', 'Tamil', 'Kannada']
  }
];

export const PRODUCTS: Product[] = [
  { Product_ID: 'PROD_001', Supplier_ID: 'SUP_001', Category_ID: 'CAT_TEX', Name: 'Standard Mulberry Silk Yarn (Grade A)', Description: '100% pure Mulberry silk yarn dyed for warp weave', Unit_Price: 3800, Unit: 'kg', Minimum_Order_Qty: 50, Availability_Status: 'IN_STOCK' },
  { Product_ID: 'PROD_002', Supplier_ID: 'SUP_001', Category_ID: 'CAT_TEX', Name: 'Mysore Zari Gold Thread Coil', Description: 'High purity silver electroplated zari thread', Unit_Price: 1250, Unit: 'coil', Minimum_Order_Qty: 20, Availability_Status: 'IN_STOCK' },
  { Product_ID: 'PROD_003', Supplier_ID: 'SUP_002', Category_ID: 'CAT_IND', Name: 'SS 304 Hexagonal Head Bolts (M10 x 50mm)', Description: 'Corrosion resistant Grade 304 stainless steel bolts', Unit_Price: 14, Unit: 'piece', Minimum_Order_Qty: 500, Availability_Status: 'IN_STOCK' },
  { Product_ID: 'PROD_004', Supplier_ID: 'SUP_002', Category_ID: 'CAT_IND', Name: 'High Tensile Grade 8.8 Screws', Description: 'Heat treated alloy steel socket cap screws', Unit_Price: 18, Unit: 'piece', Minimum_Order_Qty: 200, Availability_Status: 'IN_STOCK' },
  { Product_ID: 'PROD_005', Supplier_ID: 'SUP_003', Category_ID: 'CAT_PKG', Name: 'Heavy Duty 5-Ply Corrugated Box (18x14x12 in)', Description: 'Bursting strength 16 kg/cm2 for export shipping', Unit_Price: 42, Unit: 'box', Minimum_Order_Qty: 100, Availability_Status: 'IN_STOCK' },
  { Product_ID: 'PROD_006', Supplier_ID: 'SUP_004', Category_ID: 'CAT_ELE', Name: 'Armoured Copper Cable 4 Core 16 sq mm', Description: 'IS 7098 compliant XLPE power cable', Unit_Price: 280, Unit: 'meter', Minimum_Order_Qty: 100, Availability_Status: 'LIMITED' },
  { Product_ID: 'PROD_007', Supplier_ID: 'SUP_005', Category_ID: 'CAT_CHM', Name: 'Eco Acid Blue Dyes for Silk', Description: 'REACH certified non-toxic acid dye powder', Unit_Price: 650, Unit: 'kg', Minimum_Order_Qty: 25, Availability_Status: 'IN_STOCK' },
  { Product_ID: 'PROD_008', Supplier_ID: 'SUP_006', Category_ID: 'CAT_MCH', Name: 'Custom CNC Turning Shafts (En8 Steel)', Description: 'Precision ground tolerance +- 0.005mm', Unit_Price: 850, Unit: 'piece', Minimum_Order_Qty: 10, Availability_Status: 'MADE_TO_ORDER' },
];

export const VOICE_PRESET_SCENARIOS: VoicePresetScenario[] = [
  {
    id: 'SCENARIO_1',
    title: 'Kannada-English Silk Yarn Query (Mandya)',
    language: 'kn-en',
    transcript: 'Nange 500 kg Mulberry Silk Yarn standard quality beku near Mandya, fast delivery deliver madoke yaaru idare?',
    audioDuration: 4.8,
    confidence: 0.968,
    intent: 'DISCOVER_SUPPLIER',
    entities: {
      product: 'Mulberry Silk Yarn',
      category: 'Textiles & Silk Fabrics',
      quantity: 500,
      unit: 'kg',
      location: 'Mandya',
      quality_grade: 'Standard Grade A',
      urgency: 'HIGH',
      raw_vernacular_terms: ['Mulberry Silk Yarn', 'beku', 'Mandya', 'madoke']
    },
    matchedSupplierIds: ['SUP_001', 'SUP_005'],
    rationale: 'Chamundeshwari Silk & Yarn Weavers matched with 96% Trust Score due to proximity in Mandya and pure mulberry silk inventory.'
  },
  {
    id: 'SCENARIO_2',
    title: 'English Industrial Fasteners Query (Peenya)',
    language: 'en-IN',
    transcript: 'Need 1000 pieces of SS 304 Stainless Steel Hex Bolts under 20 rupees per piece in Peenya Industrial Area.',
    audioDuration: 4.2,
    confidence: 0.982,
    intent: 'DISCOVER_SUPPLIER',
    entities: {
      product: 'SS 304 Hex Bolts',
      category: 'Industrial Fasteners & Hardware',
      quantity: 1000,
      unit: 'piece',
      location: 'Peenya',
      max_price: 20,
      quality_grade: 'Grade 304',
      urgency: 'NORMAL',
      raw_vernacular_terms: ['SS 304 Hex Bolts', 'Peenya Industrial Area']
    },
    matchedSupplierIds: ['SUP_002', 'SUP_006'],
    rationale: 'Peenya Precision Fasteners matched at ₹14/pc (well within ₹20 budget) located directly inside Peenya Phase 3.'
  },
  {
    id: 'SCENARIO_3',
    title: 'Kannada Corrugated Box Search (Bommasandra)',
    language: 'kn-IN',
    transcript: 'ನಮಗೆ ಬೊಮ್ಮಸಂದ್ರದಲ್ಲಿ 5-ಪ್ಲೈ ಕಾರ್ಡ್ಬೋರ್ಡ್ ಬಾಕ್ಸ್ 200 ಪೀಸ್ ಬೇಕು, ತುರ್ತು ಡೆಲಿವರಿ ಬೇಕಾಗಿದೆ.',
    audioDuration: 5.1,
    confidence: 0.954,
    intent: 'DISCOVER_SUPPLIER',
    entities: {
      product: '5-Ply Corrugated Box',
      category: 'Corrugated Packaging & Containers',
      quantity: 200,
      unit: 'box',
      location: 'Bommasandra',
      urgency: 'URGENT',
      raw_vernacular_terms: ['ಬೊಮ್ಮಸಂದ್ರ', 'ಕಾರ್ಡ್ಬೋರ್ಡ್ ಬಾಕ್ಸ್', 'ತುರ್ತು ಡೆಲಿವರಿ']
    },
    matchedSupplierIds: ['SUP_003'],
    rationale: 'Vidyaranya Packaging Solutions selected for immediate stock availability in Bommasandra and 20 min response speed.'
  }
];

export const MOCK_TRUSTED_VENDORS: TrustedVendor[] = [
  {
    Trust_ID: 'TRU_001',
    User_ID: 'USR_101',
    Supplier_ID: 'SUP_001',
    Preferred_Level: 'TIER_1_GOLD',
    Notes: 'Primary silk yarn supplier for Mandya weaving unit. Excellent payment terms (30 days credit).',
    Added_At: '2025-11-14T10:30:00Z',
    ReorderCount: 14,
    SupplierDetails: SUPPLIERS[0]
  },
  {
    Trust_ID: 'TRU_002',
    User_ID: 'USR_101',
    Supplier_ID: 'SUP_002',
    Preferred_Level: 'TIER_2_SILVER',
    Notes: 'Reliable for SS 304 fasteners in Peenya. Instant pick up available.',
    Added_At: '2026-01-20T14:15:00Z',
    ReorderCount: 8,
    SupplierDetails: SUPPLIERS[1]
  }
];

export const MOCK_PROCUREMENT_QUERIES: ProcurementQuery[] = [
  {
    Query_ID: 'QRY_901',
    User_ID: 'USR_101',
    Voice_Transcript: 'Nange 500 kg Mulberry Silk Yarn standard quality beku near Mandya',
    Detected_Language: 'kn-en',
    Intent: 'DISCOVER_SUPPLIER',
    Extracted_Entities_JSON: VOICE_PRESET_SCENARIOS[0].entities,
    Structured_Query_JSON: {
      search_term: 'Mulberry Silk Yarn',
      filters: { location: 'Mandya', category: 'CAT_TEX' }
    },
    Confidence_Score: 0.968,
    Created_At: '2026-07-30T09:45:00Z',
    Audio_Duration_Sec: 4.8
  },
  {
    Query_ID: 'QRY_902',
    User_ID: 'USR_101',
    Voice_Transcript: 'Need 1000 pieces of SS 304 Stainless Steel Hex Bolts in Peenya',
    Detected_Language: 'en-IN',
    Intent: 'DISCOVER_SUPPLIER',
    Extracted_Entities_JSON: VOICE_PRESET_SCENARIOS[1].entities,
    Structured_Query_JSON: {
      search_term: 'SS 304 Hex Bolts',
      filters: { location: 'Peenya', category: 'CAT_IND' }
    },
    Confidence_Score: 0.982,
    Created_At: '2026-07-28T16:20:00Z',
    Audio_Duration_Sec: 4.2
  }
];

export const MOCK_FEEDBACK: Feedback[] = [
  {
    Feedback_ID: 'FDB_501',
    User_ID: 'USR_101',
    Supplier_ID: 'SUP_001',
    Query_ID: 'QRY_901',
    Rating: 5,
    Comment: 'Extremely quick voice match! Chamundeshwari Silk delivered Mulberry yarn within 4 hours in Mandya.',
    Recommendation_Helpful: true,
    Created_At: '2026-07-30T14:10:00Z'
  }
];

export const PLATFORM_INTEL = {
  title: 'Bhasha-Bridge product intelligence',
  summary: 'A venture-ready procurement platform built for buyers, suppliers, and admins to move from spoken intent to qualified supply chains in seconds.',
  metrics: {
    voiceSuccessRate: '97.4%',
    shortlistSpeed: '28s',
    supplierCoverage: '240+',
    responseSla: '12m',
    multilingualAccuracy: '92.4%',
    demoConversion: '4.8x faster'
  },
  pillars: [
    { title: 'Voice-first search', description: 'Capture buyer intent in Kannada, English, or code-switched speech with an animated conversational interface.' },
    { title: 'Trust-led matching', description: 'Rank suppliers by verified identity, quality signals, response speed, and relationship history.' },
    { title: 'Supplier visibility', description: 'Surface premium supplier profiles with product catalogs, service tiers, and live contact actions.' },
    { title: 'Operational control', description: 'Give buyers and admins a clean command center for discovery, insights, and governance.' }
  ],
  conversationExamples: [
    {
      label: 'Buyer in English',
      transcript: 'Need 500 boxes for a launch shipment by Friday. Show only verified suppliers with same-day response.',
      result: '3 verified suppliers shortlisted in 28 seconds'
    },
    {
      label: 'Kannada-English mix',
      transcript: 'Nange fast delivery with low MOQ offer madoke yaaru idare?',
      result: 'Voice intent mapped to packaging and fulfillment filters'
    },
    {
      label: 'Admin view',
      transcript: 'Show high-risk vendors with delayed responses and unverified GST status.',
      result: 'Governance actions surfaced instantly'
    }
  ]
};

export const DEMO_ACCOUNTS = [
  {
    role: 'Buyer',
    email: 'buyer@bhashabridge.com',
    password: 'Buyer@123',
    name: 'Aarav Mehta',
    note: 'Procurement lead with saved suppliers, history, and voice search access.'
  },
  {
    role: 'Supplier',
    email: 'supplier@bhashabridge.com',
    password: 'Supplier@123',
    name: 'Nandini Rao',
    note: 'Vendor dashboard with quote responses, availability, and contact profile.'
  },
  {
    role: 'Admin',
    email: 'admin@bhashabridge.com',
    password: 'Admin@123',
    name: 'Ops Admin',
    note: 'Full access to analytics, moderation, and platform governance.'
  }
];
