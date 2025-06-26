export interface ParsedItem {
  name: string;
  quantity: number;
  unit: string;
  confidence: number; // 0-1 scale indicating parsing confidence
}

/**
 * Simple shopping item parser that extracts name, quantity, and unit from basic word/number positioning.
 */
export class ItemParser {
  private static readonly DEFAULT_UNIT = "pcs";

  private static readonly PARSING_PATTERNS = [
    // Pattern 1: Number + Word + Product (e.g., "2 bottles wine", "500g flour")
    {
      regex: /^(\d+(?:[.,]\d+)?)\s*([a-zA-Z]+)?\s+(.+)$/i,
      groups: { quantity: 1, unit: 2, name: 3 },
      confidence: 0.9,
    },
    // Pattern 2: Product + Number + Word (e.g., "wine 2 bottles", "flour 500g")
    {
      regex: /^(.+?)\s+(\d+(?:[.,]\d+)?)\s*([a-zA-Z]+)?$/i,
      groups: { name: 1, quantity: 2, unit: 3 },
      confidence: 0.8,
    },
    // Pattern 3: Number with 'x' (e.g., "3x apples", "2×bottles")
    {
      regex: /^(\d+(?:[.,]\d+)?)\s*[xX×]\s*(.+)$/i,
      groups: { quantity: 1, name: 2 },
      confidence: 0.85,
    },
    // Pattern 4: Product only (e.g., "milk", "bread")
    {
      regex: /^(.+)$/i,
      groups: { name: 1 },
      confidence: 0.3,
    },
  ];

  /**
   * Parses a shopping list item from natural language input.
   * @param input - The input string to parse
   * @returns ParsedItem with extracted information and confidence score
   */
  static parse(input: string): ParsedItem {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return {
        name: "",
        quantity: 1,
        unit: this.DEFAULT_UNIT,
        confidence: 0,
      };
    }

    // Try each pattern in order of confidence
    for (const pattern of this.PARSING_PATTERNS) {
      const match = trimmedInput.match(pattern.regex);

      if (match) {
        const extractedData = this.extractFromMatch(match, pattern.groups);

        if (extractedData.name) {
          return {
            name: this.cleanName(extractedData.name),
            quantity: extractedData.quantity || 1,
            unit: this.cleanUnit(extractedData.unit) || this.DEFAULT_UNIT,
            confidence: pattern.confidence,
          };
        }
      }
    }

    // Fallback: treat entire input as product name
    return {
      name: this.cleanName(trimmedInput),
      quantity: 1,
      unit: this.DEFAULT_UNIT,
      confidence: 0.1,
    };
  }

  /**
   * Extracts data from regex match based on group mapping.
   */
  private static extractFromMatch(
    match: RegExpMatchArray,
    groups: { name?: number; quantity?: number; unit?: number }
  ) {
    const result: { name?: string; quantity?: number; unit?: string } = {};

    if (groups.name && match[groups.name]) {
      result.name = match[groups.name];
    }

    if (groups.quantity && match[groups.quantity]) {
      result.quantity = this.parseQuantity(match[groups.quantity]);
    }

    if (groups.unit && match[groups.unit]) {
      result.unit = match[groups.unit];
    }

    return result;
  }

  /**
   * Parses quantity from string.
   */
  private static parseQuantity(quantityStr: string): number {
    const numericValue = parseFloat(quantityStr.replace(",", "."));
    return !isNaN(numericValue) ? numericValue : 1;
  }

  /**
   * Cleans and normalizes the product name.
   */
  private static cleanName(name: string): string {
    return name.trim().replace(/\s+/g, " "); // Replace multiple spaces with single space
  }

  /**
   * Cleans and normalizes the unit.
   */
  private static cleanUnit(unit?: string): string {
    if (!unit) return this.DEFAULT_UNIT;
    return unit.trim().toLowerCase();
  }

  /**
   * Formats the parsed item for display purposes.
   */
  static formatForDisplay(parsed: ParsedItem): string {
    const { name, quantity, unit } = parsed;

    if (quantity === 1 && unit === this.DEFAULT_UNIT) {
      return name;
    }

    return `${name} (${quantity} ${unit})`;
  }

  /**
   * Creates a breakdown of how the input was parsed for preview display.
   */
  static getParseBreakdown(input: string): {
    original: string;
    parsed: ParsedItem;
    parts: {
      type: "quantity" | "unit" | "name";
      value: string;
      position: number;
    }[];
  } {
    const parsed = this.parse(input);
    const trimmedInput = input.trim();
    const parts: {
      type: "quantity" | "unit" | "name";
      value: string;
      position: number;
    }[] = [];

    // Find which pattern matched
    for (const pattern of this.PARSING_PATTERNS) {
      const match = trimmedInput.match(pattern.regex);
      if (match) {
        // Extract parts based on the pattern
        if (pattern.groups.quantity && match[pattern.groups.quantity]) {
          const quantityMatch = match[pattern.groups.quantity];
          const position = trimmedInput.indexOf(quantityMatch);
          parts.push({ type: "quantity", value: quantityMatch, position });
        }
        if (pattern.groups.unit && match[pattern.groups.unit]) {
          const unitMatch = match[pattern.groups.unit];
          const position = trimmedInput.indexOf(unitMatch);
          parts.push({ type: "unit", value: unitMatch, position });
        }
        if (pattern.groups.name && match[pattern.groups.name]) {
          const nameMatch = match[pattern.groups.name];
          const position = trimmedInput.indexOf(nameMatch);
          parts.push({ type: "name", value: nameMatch, position });
        }
        break;
      }
    }

    return {
      original: trimmedInput,
      parsed,
      parts: parts.sort((a, b) => a.position - b.position),
    };
  }

  /**
   * Creates a JSON representation suitable for Firestore storage.
   */
  static toFirestoreDocument(parsed: ParsedItem, userId: string): any {
    return {
      name: parsed.name,
      quantity: `${parsed.quantity} ${parsed.unit}`,
      completed: false,
      createdAt: new Date(),
      userId: userId,
      parsedData: {
        originalName: parsed.name,
        numericQuantity: parsed.quantity,
        unit: parsed.unit,
        confidence: parsed.confidence,
        parsedAt: new Date(),
      },
    };
  }
}
