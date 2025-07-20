import { useColors } from "@/hooks/useColors";
import { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface RecipeActionButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children: ReactNode | ReactNode[];
  variant?: ActionButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
  size?: ActionButtonSize;
  roundness?: ActionButtonRoundness;
  disabled?: boolean;
}

type ActionButtonVariant = "primary" | "outline";
type ActionButtonSize = "small" | "compact" | "medium" | "large";
type ActionButtonRoundness = "square" | "rounded" | "pill";

export function ActionButton({
  onPress,
  style,
  children,
  variant = "primary",
  loading = false,
  fullWidth = false,
  size = "medium",
  roundness = "rounded",
  disabled = false,
}: RecipeActionButtonProps) {
  const colors = useColors();
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      shadowColor: colors.tint,
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
      ...(fullWidth && {
        flex: 1,
      }),
      ...(roundness === "square" && {
        borderRadius: 0,
      }),
      ...(roundness === "rounded" && {
        borderRadius: 12,
      }),
      ...(roundness === "pill" && {
        borderRadius: 999,
      }),
      ...(size === "small" && {
        paddingVertical: 6,
        paddingHorizontal: 12,
        minHeight: 32,
      }),
      ...(size === "compact" && {
        paddingVertical: 10,
        paddingHorizontal: 20,
        minHeight: 40,
      }),
      ...(size === "medium" && {
        paddingVertical: 12,
        paddingHorizontal: 24,
        minHeight: 48,
      }),
      ...(size === "large" && {
        paddingVertical: 16,
        paddingHorizontal: 32,
        minHeight: 56,
      }),
      ...(variant === "primary" && {
        backgroundColor: colors.tint,
      }),
      ...(variant === "outline" && {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: colors.tint,
        shadowOpacity: 0.1,
        shadowColor: colors.text,
      }),
      ...(loading && {
        opacity: 0.7,
      }),
      ...(disabled && {
        opacity: 0.5,
        backgroundColor: variant === "primary" ? colors.border : "transparent",
        borderColor: colors.border,
      }),
    },
    buttonContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 20,
    },
    loadingIndicator: {
      marginRight: 8,
      width: 16,
      height: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontWeight: "700",
      letterSpacing: 0.5,
      alignItems: "center",
      textAlign: "center",
      ...(size === "small" && {
        fontSize: 13,
      }),
      ...(size === "compact" && {
        fontSize: 15,
      }),
      ...(size === "medium" && {
        fontSize: 16,
      }),
      ...(size === "large" && {
        fontSize: 18,
      }),
      ...(variant === "primary" && {
        color: colors.buttonText,
      }),
      ...(variant === "outline" && {
        color: colors.tint,
      }),
      ...(disabled && {
        color: colors.border,
      }),
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={loading || disabled ? 1 : 0.8}>
      <View style={styles.buttonContent}>
        {loading && (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              size="small"
              color={variant === "primary" ? colors.buttonText : colors.tint}
            />
          </View>
        )}
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}
