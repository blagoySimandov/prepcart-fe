import { useShoppingList } from "@/app/(tabs)/shopping-list/hooks";
import { useAlert } from "@/components/providers/AlertProvider";
import { analytics } from "@/firebaseConfig";
import { ProductCandidate } from "@/src/catalog-search/types";
import { convertGsUrlToHttps } from "@/src/catalog-search/utils";
import { useUserService } from "@/src/user";
import { useRouter } from "expo-router";
import { useState } from "react";

export function useProductActions() {
  const [addingItems, setAddingItems] = useState<Set<string>>(new Set());
  const router = useRouter();
  const { showAlert } = useAlert();
  const userService = useUserService();
  useShoppingList();

  const handleViewPdf = (item: ProductCandidate) => {
    if (item.sourceFileUri) {
      analytics.logEvent("view_catalog_pdf", {
        product_name: item.productName,
        source: item.sourceFileUri,
        page: item.pageNumber,
      });
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
      showAlert("Error", "Please make sure you're logged in.");
      return;
    }

    setAddingItems((prev) => new Set(prev).add(item.id));

    try {
      await userService.shoppingList.addItemFromCatalog(
        item,
        userService.userId
      );

      showAlert(
        "Added to Shopping List! 🛒",
        `${item.productName} has been added to your shopping list with a ${item.discountPercent}% discount already detected!`
      );
    } catch (error) {
      console.error("Error adding item to list:", error);
      showAlert(
        "Error",
        "Could not add item to shopping list. Please try again."
      );
    } finally {
      setAddingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }
  };

  return { addingItems, handleViewPdf, handleAddToList };
}
