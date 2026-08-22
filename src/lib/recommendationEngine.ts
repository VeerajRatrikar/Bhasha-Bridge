// Recommendation Engine for Bhasha-Bridge
// Implements trust-aware composite ranking for supplier discovery

import { Supplier, ExtractedEntities, RecommendationExplanation } from '../types';

export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export function rankSuppliersForEntities(
  suppliers: Supplier[],
  entities: ExtractedEntities,
  userLocation: { lat: number; lon: number } = { lat: 12.9716, lon: 77.5946 }, // Default Bengaluru
  trustedSupplierIds: string[] = []
): { supplier: Supplier; explanation: RecommendationExplanation; distanceKm: number }[] {
  
  const results = suppliers.map((supplier) => {
    // 1. Text & Category Relevance Score (40% weight)
    let relevanceScore = 50; // base score
    if (entities.product) {
      const prodLower = entities.product.toLowerCase();
      const hasSpecialtyMatch = supplier.Specialties.some((s) => s.toLowerCase().includes(prodLower) || prodLower.includes(s.toLowerCase()));
      if (hasSpecialtyMatch) relevanceScore += 40;
    }
    if (entities.category) {
      const catLower = entities.category.toLowerCase();
      const hasCatMatch = supplier.Categories.some((c) => c.toLowerCase().includes(catLower));
      if (hasCatMatch) relevanceScore += 10;
    }
    relevanceScore = Math.min(100, relevanceScore);

    // 2. Trust Score (30% weight)
    // Map supplier Trust_Score (0-100)
    const trustScore = supplier.Trust_Score;

    // 3. Proximity Score (15% weight)
    const distanceKm = calculateDistanceKm(userLocation.lat, userLocation.lon, supplier.Latitude, supplier.Longitude);
    // 0-10km -> 100, 10-50km -> 80, 50-100km -> 60, >100km -> 40
    let distanceScore = 100;
    if (distanceKm > 100) distanceScore = 40;
    else if (distanceKm > 50) distanceScore = 65;
    else if (distanceKm > 15) distanceScore = 80;
    else if (distanceKm > 5) distanceScore = 90;

    // 4. Historical Relationship Bonus (15% weight)
    const isTrusted = trustedSupplierIds.includes(supplier.Supplier_ID);
    const historyBonus = isTrusted ? 100 : 40;

    // Final Composite Formula: 0.40 * Rel + 0.30 * Trust + 0.15 * Dist + 0.15 * Hist
    const finalCompositeScore = Math.round(
      0.4 * relevanceScore + 0.3 * trustScore + 0.15 * distanceScore + 0.15 * historyBonus
    );

    const keyFactors: string[] = [];
    if (relevanceScore > 80) keyFactors.push('Direct product specialty match');
    if (trustScore >= 90) keyFactors.push(`High Trust Score (${trustScore}%) & GST Verified`);
    if (distanceKm <= 20) keyFactors.push(`Proximity match (${distanceKm} km away)`);
    if (isTrusted) keyFactors.push('Saved as Trusted Preferred Vendor');

    const explanation: RecommendationExplanation = {
      supplierId: supplier.Supplier_ID,
      relevanceScore,
      trustScore,
      distanceScore,
      historyBonus,
      finalCompositeScore,
      keyFactors
    };

    return {
      supplier,
      explanation,
      distanceKm
    };
  });

  // Sort descending by final composite score
  return results.sort((a, b) => b.explanation.finalCompositeScore - a.explanation.finalCompositeScore);
}
