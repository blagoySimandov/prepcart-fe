import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Text, TextStyle } from "react-native";

interface HighlightedTextProps {
  text: string;
  highlightResult?: {
    value: string;
    matchLevel: string;
    matchedWords: string[];
  };
  style?: TextStyle;
  highlightStyle?: TextStyle;
}

export function HighlightedText({
  text,
  highlightResult,
  style,
  highlightStyle,
}: HighlightedTextProps) {
  const warningColor = useThemeColor({}, "warning");
  const defaultHighlightStyle: TextStyle = {
    fontWeight: "bold",
    backgroundColor: warningColor + "40",
  };

  if (!highlightResult || !highlightResult.value) {
    return <Text style={style}>{text}</Text>;
  }

  // Parse the highlighted HTML from Algolia
  const highlightedValue = highlightResult.value;

  // Simple HTML parsing for <mark> tags
  const parts = highlightedValue.split(/(<mark>.*?<\/mark>)/g);

  return (
    <Text style={style}>
      {parts.map((part, index) => {
        if (part.startsWith("<mark>") && part.endsWith("</mark>")) {
          const highlightedText = part.replace(/<\/?mark>/g, "");
          return (
            <Text key={index} style={highlightStyle || defaultHighlightStyle}>
              {highlightedText}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
}
