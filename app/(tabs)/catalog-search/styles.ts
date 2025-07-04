import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemCard: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  itemTitleSection: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 3,
    lineHeight: 22,
  },
  storeInfo: {
    fontSize: 13,
    opacity: 0.6,
  },
  storeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 8,
  },
  storeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  storeBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  pageInfo: {
    fontSize: 12,
    opacity: 0.7,
  },
  discountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 50,
    alignItems: "center",
  },
  discountText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  priceSection: {
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  originalPrice: {
    fontSize: 15,
    textDecorationLine: "line-through",
    marginRight: 10,
    opacity: 0.7,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: "700",
  },
  savingsText: {
    fontSize: 13,
    fontWeight: "500",
    opacity: 0.8,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  addToListButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
  },
  addToListButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  pdfButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
  },
  pdfButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  loyaltyCardIndicator: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    backgroundColor: "rgba(0,0,0,0.02)",
  },
  loyaltyCardIcon: {
    marginRight: 8,
  },
  loyaltyCardText: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
});
