import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AlertButton {
  text: string;
  style?: "default" | "cancel" | "destructive";
  onPress?: () => void;
}

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  onDismiss?: () => void;
}

export function CustomAlert({
  visible,
  title,
  message,
  buttons = [{ text: "OK" }],
  onDismiss,
}: CustomAlertProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const styles = useStyles();
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const showAnimation = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideAnimation = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  const handleButtonPress = (button: AlertButton) => {
    hideAnimation(() => {
      opacityAnim.setValue(0);
      scaleAnim.setValue(0.8);

      if (button.onPress) {
        button.onPress();
      }
      if (onDismiss) {
        onDismiss();
      }
    });
  };

  const getButtonStyle = (buttonStyle?: string) => {
    switch (buttonStyle) {
      case "destructive":
        return { color: colors.error };
      case "cancel":
        return { color: colors.icon };
      default:
        return { color: colors.tint };
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onShow={showAnimation}
      onRequestClose={() => handleButtonPress({ text: "Cancel" })}>
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: opacityAnim,
          },
        ]}>
        <Animated.View
          style={[
            styles.alertContainer,
            {
              backgroundColor: colors.card,
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {message && (
            <Text style={[styles.message, { color: colors.icon }]}>
              {message}
            </Text>
          )}
          <View style={styles.buttonsContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  index < buttons.length - 1 && {
                    borderRightWidth: 1,
                    borderRightColor: colors.border,
                  },
                ]}
                onPress={() => handleButtonPress(button)}>
                <Text
                  style={[
                    styles.buttonText,
                    getButtonStyle(button.style),
                    button.style === "cancel" && styles.cancelButtonText,
                  ]}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const { width } = Dimensions.get("window");

const useStyles = () => {
  const colors = Colors[useColorScheme() ?? "light"];

  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    alertContainer: {
      width: Math.min(width - 40, 320),
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
      paddingTop: 20,
      paddingHorizontal: 20,
      marginBottom: 8,
    },
    message: {
      fontSize: 14,
      textAlign: "center",
      paddingHorizontal: 20,
      lineHeight: 20,
      marginBottom: 20,
    },
    buttonsContainer: {
      flexDirection: "row",
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    button: {
      flex: 1,
      paddingVertical: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "500",
    },
    cancelButtonText: {
      fontWeight: "400",
    },
  });
};
