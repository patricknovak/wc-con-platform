/**
 * Smart pricing engine
 * Suggests pricing based on historical data and contextual factors
 */

/**
 * Customer type for pricing adjustments
 */
export type CustomerType = 'retail' | 'contractor' | 'wholesale' | 'government';

/**
 * Pricing request with context
 */
export interface PricingRequest {
  /** Product/service name */
  productName: string;

  /** Quantity ordered */
  quantity: number;

  /** Unit of measurement (tons, cubic meters, etc.) */
  unit: string;

  /** Delivery distance in km from Hinton */
  deliveryDistance: number;

  /** Type of customer */
  customerType: CustomerType;

  /** Any special notes/requirements */
  notes?: string;
}

/**
 * Pricing suggestion with reasoning
 */
export interface PricingSuggestion {
  /** Suggested unit price */
  unitPrice: number;

  /** Suggested total (before tax) */
  totalPrice: number;

  /** Price range (low - high) */
  priceRange: {
    low: number;
    high: number;
  };

  /** Confidence level 0-100 */
  confidence: number;

  /** Reasoning for the suggestion */
  reasoning: string[];

  /** Any flags (unusual pricing, market factors) */
  flags: string[];

  /** Discount recommendation if applicable */
  recommendedDiscount?: number;
}

/**
 * Suggest pricing for a product/service
 * @param request Pricing request with context
 * @returns Pricing suggestion with reasoning
 */
export function suggestPricing(request: PricingRequest): PricingSuggestion {
  const reasoning: string[] = [];
  const flags: string[] = [];

  // TODO: Query historical pricing data points from database
  // const historicalPrices = await getHistoricalPrices(request.productName);

  // Mock historical data for demonstration
  const historicalAveragePrices: Record<string, number> = {
    'road_crush_1_2_inch': 18,
    'road_crush_2_inch': 16,
    'washed_rock': 24,
    'fractured_rock': 20,
    'natural_round_rock': 22,
    'pea_gravel': 26,
    'drain_rock': 15,
    'topsoil': 28,
    'pit_run': 14,
    'sand': 19,
    'concrete_blocks_regular': 2.5,
    'concrete_blocks_half': 1.8,
    'lego_blocks': 3.2,
    'excavation_hourly': 85,
    'trucking_per_km': 2.5,
    'equipment_rental_daily_excavator': 450,
    'equipment_rental_daily_loader': 380,
    'equipment_rental_daily_dozer': 520,
  };

  // Normalize product name
  const normalizedProduct = request.productName
    .toLowerCase()
    .replace(/\s+/g, '_');
  const basePrice = historicalAveragePrices[normalizedProduct];

  let unitPrice = basePrice || 25; // Default fallback price
  let confidence = basePrice ? 75 : 40;

  reasoning.push(`Base price for ${request.productName}: $${unitPrice}/unit`);

  // Apply delivery distance markup
  if (request.deliveryDistance > 50) {
    const distanceMultiplier = 1 + (request.deliveryDistance - 50) * 0.01;
    unitPrice *= distanceMultiplier;
    reasoning.push(
      `Delivery distance adjustment (${request.deliveryDistance}km): +${((distanceMultiplier - 1) * 100).toFixed(1)}%`
    );
  }

  // Apply customer type adjustment
  const customerMultipliers: Record<CustomerType, number> = {
    retail: 1.15, // Full price
    contractor: 1.05, // Slight discount
    wholesale: 0.85, // Bulk discount
    government: 0.9, // Government rate
  };

  const multiplier = customerMultipliers[request.customerType];
  unitPrice *= multiplier;
  reasoning.push(
    `Customer type (${request.customerType}): ${multiplier > 1 ? '+' : ''}${((multiplier - 1) * 100).toFixed(1)}%`
  );

  // Volume discount
  let recommendedDiscount: number | undefined;
  if (request.quantity >= 100) {
    recommendedDiscount = 5;
    reasoning.push(`Large order (${request.quantity} units): 5% discount available`);
  } else if (request.quantity >= 50) {
    recommendedDiscount = 2.5;
    reasoning.push(`Medium order (${request.quantity} units): 2.5% discount available`);
  }

  // Round to nearest $0.50
  unitPrice = Math.round(unitPrice * 2) / 2;

  const totalPrice = unitPrice * request.quantity;

  // Create price range (±10%)
  const priceRange = {
    low: Math.round(unitPrice * 0.9 * 2) / 2,
    high: Math.round(unitPrice * 1.1 * 2) / 2,
  };

  // Flag unusual pricing if not based on historical data
  if (!basePrice) {
    flags.push('No historical pricing data - estimate only');
    confidence = Math.max(confidence - 30, 20);
  }

  // Flag high delivery distances
  if (request.deliveryDistance > 150) {
    flags.push('Delivery distance exceeds normal service area');
  }

  // Flag unusual quantities
  if (request.quantity < 5) {
    flags.push('Very small order - consider minimum order requirements');
  }

  return {
    unitPrice,
    totalPrice,
    priceRange,
    confidence: Math.min(confidence, 100),
    reasoning,
    flags,
    recommendedDiscount,
  };
}

/**
 * Compare current pricing to historical norms
 */
export function analyzeMarketRate(
  productName: string,
  proposedPrice: number
): {
  comparison: 'above_market' | 'market_rate' | 'below_market';
  deviation: number; // percentage difference from average
  recommendation: string;
} {
  // Mock market average
  const marketAverages: Record<string, number> = {
    'road_crush': 17,
    'washed_rock': 23,
    'gravel': 20,
  };

  const normalized = productName.toLowerCase();
  const average = marketAverages[normalized] || 20;
  const deviation = ((proposedPrice - average) / average) * 100;

  let comparison: 'above_market' | 'market_rate' | 'below_market';
  let recommendation: string;

  if (deviation > 10) {
    comparison = 'above_market';
    recommendation = `Price is ${deviation.toFixed(1)}% above market average`;
  } else if (deviation < -10) {
    comparison = 'below_market';
    recommendation = `Price is ${Math.abs(deviation).toFixed(1)}% below market average`;
  } else {
    comparison = 'market_rate';
    recommendation = 'Price is competitive with market rates';
  }

  return {
    comparison,
    deviation,
    recommendation,
  };
}
