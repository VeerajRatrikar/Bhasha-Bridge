// Database & Application Type Definitions for Bhasha-Bridge
// Shared application models for procurement, suppliers, and voice workflows

export type LanguageCode = 'kn-IN' | 'en-IN' | 'kn-en';

export interface Location {
  Location_ID: string;
  City: string;
  State: string;
  District: string;
  Pincode: string;
  AreaName?: string;
  Latitude?: number;
  Longitude?: number;
}

export interface Category {
  Category_ID: string;
  Name: string;
  Description: string;
  Parent_Category_ID: string | null;
  IconName?: string;
}

export interface Product {
  Product_ID: string;
  Supplier_ID: string;
  Category_ID: string;
  Name: string;
  Description: string;
  Unit_Price: number;
  Unit: string; // e.g. 'kg', 'meters', 'pieces', 'boxes'
  Minimum_Order_Qty: number;
  Availability_Status: 'IN_STOCK' | 'LIMITED' | 'MADE_TO_ORDER' | 'OUT_OF_STOCK';
  Image_URL?: string;
}

export interface Supplier {
  Supplier_ID: string;
  Business_Name: string;
  Contact_Person: string;
  Phone: string;
  Email: string;
  Location_ID: string;
  Address: string;
  Rating: number; // e.g. 4.8
  Trust_Score: number; // 0 - 100
  Verification_Status: 'VERIFIED' | 'GOLD_PARTNER' | 'PENDING' | 'PREMIUM';
  Recommended_Count: number;
  Latitude: number;
  Longitude: number;
  GSTIN: string;
  Years_In_Business: number;
  City: string;
  District: string;
  Categories: string[];
  Image_URL?: string;
  Specialties: string[];
  ResponseTimeMinutes: number;
  LanguageSupport: string[]; // e.g. ['Kannada', 'English', 'Hindi']
}

export interface User {
  User_ID: string;
  Name: string;
  Phone: string;
  Language: LanguageCode;
  Business_Type: string;
  City: string;
  Created_At: string;
  Avatar_URL?: string;
}

export interface ExtractedEntities {
  product?: string;
  category?: string;
  quantity?: number;
  unit?: string;
  location?: string;
  max_price?: number;
  quality_grade?: string;
  urgency?: string;
  raw_vernacular_terms?: string[];
}

export interface ProcurementQuery {
  Query_ID: string;
  User_ID: string;
  Voice_Transcript: string;
  Detected_Language: LanguageCode;
  Intent: string; // e.g. 'DISCOVER_SUPPLIER', 'CHECK_PRICE', 'COMPARE_VENDOR'
  Extracted_Entities_JSON: ExtractedEntities;
  Structured_Query_JSON: {
    search_term: string;
    filters: Record<string, any>;
  };
  Confidence_Score: number; // e.g. 0.964
  Created_At: string;
  Audio_Duration_Sec?: number;
}

export interface TrustedVendor {
  Trust_ID: string;
  User_ID: string;
  Supplier_ID: string;
  Preferred_Level: 'TIER_1_GOLD' | 'TIER_2_SILVER' | 'LOCAL_FAVORITE';
  Notes: string;
  Added_At: string;
  ReorderCount: number;
  SupplierDetails?: Supplier;
}

export interface Feedback {
  Feedback_ID: string;
  User_ID: string;
  Supplier_ID: string;
  Query_ID: string;
  Rating: number;
  Comment: string;
  Recommendation_Helpful: boolean;
  Created_At: string;
}

export interface VoicePresetScenario {
  id: string;
  title: string;
  language: LanguageCode;
  transcript: string;
  audioDuration: number;
  confidence: number;
  intent: string;
  entities: ExtractedEntities;
  matchedSupplierIds: string[];
  rationale: string;
}

export interface RecommendationExplanation {
  supplierId: string;
  relevanceScore: number; // 0-100
  trustScore: number; // 0-100
  distanceScore: number; // 0-100
  historyBonus: number; // 0-100
  finalCompositeScore: number; // 0-100
  keyFactors: string[];
}

export interface PaymentTransaction {
  Payment_ID: string;
  Supplier_ID: string;
  Supplier_Name: string;
  Amount: number;
  GST_Amount: number;
  Total_Paid: number;
  Currency: string;
  Payment_Method: 'UPI_GPAY' | 'UPI_PHONEPE' | 'RAZORPAY_CARD' | 'ESCROW_LOCK' | 'NETBANKING';
  Status: 'COMPLETED' | 'ESCROW_LOCKED' | 'PENDING' | 'REFUNDED';
  Transaction_Ref: string;
  Item_Description: string;
  Paid_At: string;
  Invoice_Number: string;
}

export interface FreightEstimate {
  originCity: string;
  destinationCity: string;
  distanceKm: number;
  weightKg: number;
  vehicleType: 'TATA_ACE' | 'TRUCK_14FT' | 'EICHER_19FT' | 'EXPRESS_COURIER';
  estimatedCostINR: number;
  estimatedTransitHours: number;
  co2SavingsKg: number;
}

