import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useStoreNames } from "@/src/shared/hooks/use-store-names";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface StoreFilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedStores: string[];
  allStores: string[];
  onStoreToggle: (storeId: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export function StoreFilterModal({
  visible,
  onClose,
  selectedStores,
  allStores,
  onStoreToggle,
  onSelectAll,
  onClearAll,
}: StoreFilterModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { getStoreName, isLoading: isLoadingStoreNames } = useStoreNames();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}>
        <View
          style={{
            backgroundColor: colors.background,
            borderRadius: 15,
            width: "90%",
            maxWidth: 400,
            maxHeight: "80%",
          }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: colors.tabIconDefault + "20",
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: colors.text,
              }}>
              Filter by Store
            </Text>
            <TouchableOpacity onPress={onClose}>
              <IconSymbol
                name="xmark"
                size={20}
                color={colors.tabIconDefault}
              />
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingVertical: 15,
              gap: 10,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: colors.tint,
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={onSelectAll}
              disabled={isLoadingStoreNames}>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: 14,
                }}>
                Select All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: colors.tabIconDefault + "20",
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={onClearAll}
              disabled={isLoadingStoreNames}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "600",
                  fontSize: 14,
                }}>
                Clear All
              </Text>
            </TouchableOpacity>
          </View>

          {/* Store List */}
          <ScrollView
            style={{
              maxHeight: 300,
              paddingHorizontal: 20,
            }}>
            {isLoadingStoreNames ? (
              <View
                style={{
                  padding: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <ActivityIndicator size="large" color={colors.tint} />
                <Text
                  style={{
                    marginTop: 12,
                    fontSize: 14,
                    color: colors.tabIconDefault,
                  }}>
                  Loading stores...
                </Text>
              </View>
            ) : (
              allStores.map((storeId) => {
                const isSelected = selectedStores.includes(storeId);
                return (
                  <TouchableOpacity
                    key={storeId}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.tabIconDefault + "10",
                    }}
                    onPress={() => onStoreToggle(storeId)}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor: isSelected
                          ? colors.tint
                          : colors.tabIconDefault,
                        backgroundColor: isSelected
                          ? colors.tint
                          : "transparent",
                        marginRight: 12,
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      {isSelected && (
                        <IconSymbol
                          name="checkmark"
                          size={12}
                          color="#FFFFFF"
                        />
                      )}
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.text,
                        flex: 1,
                      }}>
                      {getStoreName(storeId)}
                    </Text>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>

          {/* Footer */}
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.tint,
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={onClose}>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: 16,
                }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
