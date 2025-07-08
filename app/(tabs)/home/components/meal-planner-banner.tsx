import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

export function MealPlannerBanner() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/food-on-the-table.jpg")}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <ThemedText style={styles.title}>Meal Planner</ThemedText>
          <ThemedText style={styles.subtitle}>Coming Soon!</ThemedText>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageBackground: {
    width: "100%",
    height: 120,
    justifyContent: "center",
  },
  imageStyle: {
    borderRadius: 15,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 4,
  },
});
