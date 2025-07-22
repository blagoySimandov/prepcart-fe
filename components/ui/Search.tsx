import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface SearchProps {
  children: React.ReactNode;
}

interface SearchBarProps extends Omit<TextInputProps, "style"> {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  rightIcon?: React.ReactNode;
}

interface SearchFiltersProps {
  children?: React.ReactNode;
}

function SearchRoot({ children }: SearchProps) {
  return <ThemedView style={styles.container}>{children}</ThemedView>;
}

function SearchBar({
  placeholder = "Search",
  value,
  onChangeText,
  rightIcon,
  ...props
}: SearchBarProps) {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={[
          styles.searchInput,
          rightIcon ? styles.searchInputWithIcon : undefined,
          {
            color: themeColors.text,
            borderColor: themeColors.tint,
            backgroundColor: themeColors.card,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={themeColors.tabIconDefault}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
    </View>
  );
}

function SearchFilters({ children }: SearchFiltersProps) {
  return <View style={styles.filtersContainer}>{children}</View>;
}

export const Search = Object.assign(SearchRoot, {
  SearchBar: SearchBar,
  Filters: SearchFilters,
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginBottom: 12,
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    flex: 1,
  },
  searchInputWithIcon: {
    paddingRight: 52,
  },
  rightIconContainer: {
    position: "absolute",
    right: 12,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
