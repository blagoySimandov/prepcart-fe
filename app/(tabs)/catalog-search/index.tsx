import { useRouter } from "expo-router";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useShoppingList } from "@/app/(tabs)/shopping-list/hooks";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CatalogService } from "@/src/catalog-search";
import { ProductCandidate } from "@/src/catalog-search/types";
import { convertGsUrlToHttps } from "@/src/catalog-search/utils";
import { Discount } from "@/src/discounts/types";
import { useUserService } from "@/src/user";
import { ItemParser } from "@/src/utils/item-parser";
import { styles } from "./styles";

export default function CatalogSearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductCandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingItems, setAddingItems] = useState<Set<string>>(new Set());
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const { addItem } = useShoppingList();
  const userService = useUserService();

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

  const handleAddToList = async (item: ProductCandidate) => {
    if (!userService) {
      Alert.alert("Error", "Please make sure you're logged in.");
      return;
    }

    setAddingItems((prev) => new Set(prev).add(item.id));

    try {
      // Create a discount object matching the schema structure
      const discount: Discount & {
        confidence_score: number;
        is_exact_match: boolean;
      } = {
        id: item.id,
        product_name: item.productName,
        store_id: item.storeId,
        country: "bulgaria",
        discount_percent: item.discountPercent,
        price_before_discount_local: item.priceBeforeDiscount,
        currency_local: "BGN",
        page_number: item.pageNumber,
        similarity_score: 1.0, // High confidence since it's a direct match
        confidence_score: 95, // High confidence for direct catalog search
        is_exact_match: true, // This is an exact match from catalog search
      };

      // Create a parsed item with the discount pre-populated
      const combinedInput = `${item.productName} 1`;
      const parsedItem = ItemParser.parse(combinedInput);
      const firestoreDoc = ItemParser.toFirestoreDocument(
        parsedItem,
        userService.userId
      );

      // Override with our specific data and add the discount
      firestoreDoc.name = item.productName;
      firestoreDoc.quantity = "1";
      firestoreDoc.detectedDiscounts = [discount];
      firestoreDoc.createdAt = new Date();

      // Add the item with discount information directly
      await userService.shoppingList.addParsedItem(firestoreDoc);

      Alert.alert(
        "Added to Shopping List! 🛒",
        `${item.productName} has been added to your shopping list with a ${item.discountPercent}% discount already detected!`,
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Error adding item to list:", error);
      Alert.alert(
        "Error",
        "Could not add item to shopping list. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setAddingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
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
            const isAdding = addingItems.has(item.id);

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

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[
                      styles.addToListButton,
                      { backgroundColor: themeColors.tint },
                    ]}
                    onPress={() => handleAddToList(item)}
                    disabled={isAdding}>
                    {isAdding ? (
                      <ActivityIndicator size={16} color="white" />
                    ) : (
                      <IconSymbol size={16} name="plus.circle" color="white" />
                    )}
                    <Text style={styles.addToListButtonText}>
                      {isAdding ? "Adding..." : "Add to List"}
                    </Text>
                  </TouchableOpacity>

                  {item.sourceFileUri && (
                    <TouchableOpacity
                      style={[
                        styles.pdfButton,
                        { backgroundColor: themeColors.tint },
                      ]}
                      onPress={() => handleViewPdf(item)}>
                      <IconSymbol size={16} name="doc.text" color="white" />
                      <Text style={styles.pdfButtonText}>View Brochure</Text>
                    </TouchableOpacity>
                  )}
                </View>
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
