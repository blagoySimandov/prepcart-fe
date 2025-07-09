import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";

export function NoResultsFound({ query }: { query: string }) {
  const color = useThemeColor({}, "text");
  return (
    <ThemedView style={styles.container}>
      <IconSymbol name="xmark.circle" style={styles.icon} color={color} />
      <ThemedText
        style={styles.text}
      >{`No results found for "${query}"`}</ThemedText>
      <ThemedText style={styles.subText}>
        Try searching for something else.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    opacity: 0.7,
  },
  icon: {
    fontSize: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
  },
});
