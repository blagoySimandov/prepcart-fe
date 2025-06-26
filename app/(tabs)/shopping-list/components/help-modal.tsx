import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";

interface HelpModalProps {
  visible: boolean;
  onClose: () => void;
}

export function HelpModal({ visible, onClose }: HelpModalProps) {
  const { styles, colors } = useStyles();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.helpModalOverlay}>
        <View style={styles.helpModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>✨ Smart Adding Guide</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.icon} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.helpContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.helpSection}>
              <Text style={styles.helpSectionTitle}>
                🚀 How Smart Adding Works
              </Text>
              <Text style={styles.helpDescription}>
                Just type naturally! Our smart parser automatically detects
                quantities, units, and item names from how you position words
                and numbers.
              </Text>

              <View style={styles.smartParsingDemo}>
                <View style={styles.demoRow}>
                  <Text style={styles.demoInput}>
                    &quot;2 bottles wine&quot;
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color={colors.icon}
                    style={styles.demoArrow}
                  />
                  <View style={styles.demoResult}>
                    <Text style={styles.demoResultText}>
                      <Text
                        style={[
                          styles.demoPart,
                          { backgroundColor: colors.quantity },
                        ]}>
                        2
                      </Text>{" "}
                      <Text
                        style={[
                          styles.demoPart,
                          { backgroundColor: colors.unit },
                        ]}>
                        bottles
                      </Text>{" "}
                      <Text
                        style={[
                          styles.demoPart,
                          { backgroundColor: colors.name },
                        ]}>
                        wine
                      </Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.demoRow}>
                  <Text style={styles.demoInput}>&quot;flour 500g&quot;</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color={colors.icon}
                    style={styles.demoArrow}
                  />
                  <View style={styles.demoResult}>
                    <Text style={styles.demoResultText}>
                      <Text
                        style={[
                          styles.demoPart,
                          { backgroundColor: colors.name },
                        ]}>
                        flour
                      </Text>{" "}
                      <Text
                        style={[
                          styles.demoPart,
                          { backgroundColor: colors.quantity },
                        ]}>
                        500
                      </Text>
                      <Text
                        style={[
                          styles.demoPart,
                          { backgroundColor: colors.unit },
                        ]}>
                        g
                      </Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.demoRow}>
                  <Text style={styles.demoInput}>&quot;3x apples&quot;</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color={colors.icon}
                    style={styles.demoArrow}
                  />
                  <View style={styles.demoResult}>
                    <Text style={styles.demoResultText}>
                      <Text
                        style={[
                          styles.demoPart,
                          { backgroundColor: colors.quantity },
                        ]}>
                        3
                      </Text>
                      x{" "}
                      <Text
                        style={[
                          styles.demoPart,
                          { backgroundColor: colors.name },
                        ]}>
                        apples
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.helpSection}>
              <Text style={styles.helpSectionTitle}>
                🎯 Smart Pattern Recognition
              </Text>
              <Text style={styles.helpDescription}>
                The parser recognizes these patterns automatically:
              </Text>

              <View style={styles.patternList}>
                <View style={styles.patternItem}>
                  <Text style={styles.patternName}>Number + Unit + Name</Text>
                  <Text style={styles.patternExample}>
                    &quot;2 bottles wine&quot;, &quot;500g flour&quot;
                  </Text>
                </View>
                <View style={styles.patternItem}>
                  <Text style={styles.patternName}>Name + Number + Unit</Text>
                  <Text style={styles.patternExample}>
                    &quot;wine 2 bottles&quot;, &quot;flour 500g&quot;
                  </Text>
                </View>
                <View style={styles.patternItem}>
                  <Text style={styles.patternName}>Number × Name</Text>
                  <Text style={styles.patternExample}>
                    &quot;3x apples&quot;, &quot;2×bread&quot;
                  </Text>
                </View>
                <View style={styles.patternItem}>
                  <Text style={styles.patternName}>Name Only</Text>
                  <Text style={styles.patternExample}>
                    &quot;milk&quot; → 1 pcs milk
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.helpSection}>
              <Text style={styles.helpSectionTitle}>⚙️ Manual Mode</Text>
              <Text style={styles.helpDescription}>
                Need precise control? Tap the down arrow to switch to manual
                mode with separate fields for name, quantity, and unit.
              </Text>

              <View style={styles.manualModeDemo}>
                <View style={styles.manualField}>
                  <Text style={styles.fieldLabel}>Name:</Text>
                  <View style={styles.fieldExample}>
                    <Text style={styles.fieldExampleText}>Wine</Text>
                  </View>
                </View>
                <View style={styles.manualFieldRow}>
                  <View style={styles.manualField}>
                    <Text style={styles.fieldLabel}>Quantity:</Text>
                    <View style={[styles.fieldExample, { flex: 1 }]}>
                      <Text style={styles.fieldExampleText}>2</Text>
                    </View>
                  </View>
                  <View style={styles.manualField}>
                    <Text style={styles.fieldLabel}>Unit:</Text>
                    <View style={[styles.fieldExample, { flex: 1 }]}>
                      <Text style={styles.fieldExampleText}>bottles</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.colorLegend}>
              <Text style={styles.legendTitle}>Color Legend:</Text>
              <View style={styles.legendItems}>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: colors.quantity },
                    ]}
                  />
                  <Text style={styles.legendText}>Quantity</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: colors.unit },
                    ]}
                  />
                  <Text style={styles.legendText}>Unit</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: colors.name },
                    ]}
                  />
                  <Text style={styles.legendText}>Name</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.helpFooter}>
            <TouchableOpacity style={styles.gotItButton} onPress={onClose}>
              <Text style={styles.gotItButtonText}>Got it! 🎉</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
