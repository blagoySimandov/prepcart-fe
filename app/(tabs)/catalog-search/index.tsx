import { useRouter } from "expo-router";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CatalogService } from "@/src/catalog-search";
import { ProductCandidate } from "@/src/catalog-search/types";
import { convertGsUrlToHttps } from "@/src/catalog-search/utils";
import { styles } from "./styles";

export default function CatalogSearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductCandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.length > 2) {
      setLoading(true);
      try {
        const searchResults = await CatalogService.search(searchQuery);
        console.log("Search results:", searchResults);
        setResults(searchResults);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  }, []);

  const debouncedSearch = useMemo(() => debounce(search, 500), [search]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleInputChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const handleViewPdf = (item: ProductCandidate) => {
    if (item.sourceFileUri) {
      const httpsUrl = convertGsUrlToHttps(item.sourceFileUri);
      router.push({
        pathname: "/catalog-search/pdf-viewer",
        params: {
          source: httpsUrl,
          page: item.pageNumber.toString(),
          productName: item.productName,
        },
      });
    }
  };

  const calculateDiscountedPrice = (
    originalPrice: number,
    discountPercent: number
  ) => {
    return originalPrice * (1 - discountPercent / 100);
  };

  const calculateSavings = (originalPrice: number, discountPercent: number) => {
    return originalPrice * (discountPercent / 100);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>
        Catalog Search
      </Text>
      <TextInput
        style={[
          styles.input,
          { color: themeColors.text, borderColor: themeColors.tint },
        ]}
        placeholder="Search for products..."
        placeholderTextColor={themeColors.tabIconDefault}
        value={query}
        onChangeText={handleInputChange}
      />
      {loading ? (
        <ActivityIndicator size="large" color={themeColors.tint} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const discountedPrice = calculateDiscountedPrice(
              item.priceBeforeDiscount,
              item.discountPercent
            );
            const savings = calculateSavings(
              item.priceBeforeDiscount,
              item.discountPercent
            );

            return (
              <View
                style={[
                  styles.itemCard,
                  {
                    backgroundColor: themeColors.background,
                    shadowColor: themeColors.text,
                  },
                ]}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemTitleSection}>
                    <Text
                      style={[styles.itemName, { color: themeColors.text }]}>
                      {item.productName}
                    </Text>
                    <Text
                      style={[
                        styles.storeInfo,
                        { color: themeColors.tabIconDefault },
                      ]}>
                      {item.storeId} • Page {item.pageNumber}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.discountBadge,
                      { backgroundColor: themeColors.tint },
                    ]}>
                    <Text style={styles.discountText}>
                      -{item.discountPercent}%
                    </Text>
                  </View>
                </View>

                <View style={styles.priceSection}>
                  <View style={styles.priceRow}>
                    <Text
                      style={[
                        styles.originalPrice,
                        { color: themeColors.tabIconDefault },
                      ]}>
                      {item.priceBeforeDiscount.toFixed(2)} BGN
                    </Text>
                    <Text
                      style={[
                        styles.discountedPrice,
                        { color: themeColors.tint },
                      ]}>
                      {discountedPrice.toFixed(2)} BGN
                    </Text>
                  </View>
                  <Text
                    style={[styles.savingsText, { color: themeColors.tint }]}>
                    You save {savings.toFixed(2)} BGN
                  </Text>
                </View>

                {item.sourceFileUri && (
                  <TouchableOpacity
                    style={[
                      styles.pdfButton,
                      { backgroundColor: themeColors.tint },
                    ]}
                    onPress={() => handleViewPdf(item)}>
                    <IconSymbol size={18} name="doc.text" color="white" />
                    <Text style={styles.pdfButtonText}>View Brochure</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}
