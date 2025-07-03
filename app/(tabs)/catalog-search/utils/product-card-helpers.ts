export const calculateDiscountedPrice = (
  originalPrice: number,
  discountPercent: number
) => {
  return originalPrice * (1 - discountPercent / 100);
};

export const calculateSavings = (
  originalPrice: number,
  discountPercent: number
) => {
  return originalPrice * (discountPercent / 100);
};
