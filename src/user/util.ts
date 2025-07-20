import { ShoppingItem } from "./shopping-list";

const DEFAULT_CURRENCY = "BGN";

export const calculateSavingsFromItems = (
  items: ShoppingItem[],
): Record<string, number> => {
  const savings: Record<string, number> = {};

  items.forEach((item) => {
    if (item.detectedDiscounts && item.detectedDiscounts.length > 0) {
      const bestDiscount = item.detectedDiscounts.reduce((best, current) =>
        current.discount_percent > best.discount_percent ? current : best,
      );
      const itemSaving =
        bestDiscount.price_before_discount_local *
        (bestDiscount.discount_percent / 100);
      const currency = bestDiscount.currency_local || DEFAULT_CURRENCY;

      savings[currency] = (savings[currency] || 0) + itemSaving;
    }
  });

  return savings;
};

interface FormatTimeOptions {
  showSeconds: boolean;
}

export const formatTime = (
  seconds: number,
  options: FormatTimeOptions = { showSeconds: true },
) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (options.showSeconds) {
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return mins.toString().padStart(2, "0");
};
