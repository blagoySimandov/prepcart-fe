import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COUNTRIES } from "../constants";
import { useStyles } from "../styles";

interface CountrySelectionModalProps {
  visible: boolean;
  onSelect: (country: string) => Promise<void>;
  onSkip: () => void;
}

interface Country {
  code: string;
  name: string;
  flag: string;
}

export function CountrySelectionModal({
  visible,
  onSelect,
  onSkip,
}: CountrySelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const styles = useStyles();
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");

  const filteredCountries = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCountry = async (country: Country) => {
    setIsUpdating(true);
    try {
      await onSelect(`${country.code}|${country.name}`);
      setSearchQuery("");
    } catch (error) {
      console.error("Error selecting country:", error);
      Alert.alert("Error", "Failed to save country. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSkip = () => {
    setSearchQuery("");
    onSkip();
  };

  const handleRequestClose = () => {
    if (!isUpdating) {
      handleSkip();
    }
  };

  const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={[
        styles.countryItem,
        { borderColor: borderColor || "#ccc" },
      ]}
      onPress={() => handleSelectCountry(item)}
      disabled={isUpdating}
    >
      <ThemedText style={styles.countryFlag}>{item.flag}</ThemedText>
      <ThemedText style={styles.countryName}>{item.name}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleRequestClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.countryModalContent, { backgroundColor }]}>
          <ThemedText type="title" style={styles.modalTitle}>
            Select Your Country
          </ThemedText>
          <ThemedText type="default" style={styles.modalSubtitle}>
            This helps us provide better localized content and features
          </ThemedText>

          <TextInput
            style={[
              styles.textInput,
              styles.searchInput,
              {
                borderColor: borderColor || "#ccc",
                color: textColor,
                backgroundColor: backgroundColor,
              },
            ]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search countries..."
            placeholderTextColor={textColor ? `${textColor}80` : "#999"}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            editable={!isUpdating}
          />

          <FlatList
            data={filteredCountries}
            renderItem={renderCountryItem}
            keyExtractor={(item) => item.code}
            style={styles.countryList}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
          />

          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.skipButton,
                { borderColor: borderColor || "#ccc" },
              ]}
              onPress={handleSkip}
              disabled={isUpdating}
            >
              <ThemedText type="defaultSemiBold">Skip for now</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}