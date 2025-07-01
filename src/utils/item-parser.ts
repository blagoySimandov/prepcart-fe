export interface ParsedItem {
  name: string;
  quantity: number;
  unit: string;
  confidence: number; // 0-1 scale indicating parsing confidence
}

export class ItemParser {
  private static readonly DEFAULT_UNIT = "pcs";

  private static readonly PARSING_PATTERNS = [
    // Pattern 1: Number + unit + product
    {
      regex: /^(\d+(?:[.,]\d+)?)\s+([^\d\s]+)?\s+(.+)$/u,
      groups: { quantity: 1, unit: 2, name: 3 },
      confidence: 0.9,
    },
    // Pattern 2: Product + NumberUnit (e.g., "Cheese 500g")
    {
      regex: /^(.+?)\s+(\d+(?:[.,]\d+)?)([a-zA-Zа-яА-Я]+)$/u,
      groups: { name: 1, quantity: 2, unit: 3 },
      confidence: 0.85,
    },
    // Pattern 3: Product + Number + unit
    {
      regex: /^(.+?)\s+(\d+(?:[.,]\d+)?)(?:\s+([^\d\s]+))?$/u,
      groups: { name: 1, quantity: 2, unit: 3 },
      confidence: 0.8,
    },
    // Pattern 4: Number x Name
    {
      regex: /^(\d+(?:[.,]\d+)?)\s*[xX×]\s*(.+)$/u,
      groups: { quantity: 1, name: 2 },
      confidence: 0.85,
    },
    // Pattern 5: Name only
    {
      regex: /^(.+)$/u,
      groups: { name: 1 },
      confidence: 0.3,
    },
  ];

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

    return {
      name: this.cleanName(trimmedInput),
      quantity: 1,
      unit: this.DEFAULT_UNIT,
      confidence: 0.1,
    };
  }

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

  private static parseQuantity(quantityStr: string): number {
    const numericValue = parseFloat(quantityStr.replace(",", "."));
    return !isNaN(numericValue) ? numericValue : 1;
  }

  private static cleanName(name: string): string {
    return name.trim().replace(/\s+/g, " ");
  }

  private static cleanUnit(unit?: string): string {
    if (!unit) return this.DEFAULT_UNIT;
    return unit.trim().toLowerCase();
  }

  static formatForDisplay(parsed: ParsedItem): string {
    const { name, quantity, unit } = parsed;
    if (quantity === 1 && unit === this.DEFAULT_UNIT) {
      return name;
    }
    return `${name} (${quantity} ${unit})`;
  }

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

    for (const pattern of this.PARSING_PATTERNS) {
      const match = trimmedInput.match(pattern.regex);
      if (match) {
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

  static toFirestoreDocument(parsed: ParsedItem, userId: string): any {
    return {
      name: parsed.name,
      quantity: parsed.quantity,
      unit: parsed.unit,
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
