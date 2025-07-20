import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet, Text } from "react-native";

interface HeadingProps {
  children: string;
  style?: any;
}

export function Heading({ children, style }: HeadingProps) {
  const theme = useColorScheme();
  const colors = Colors[theme || "light"];
  const styles = useStyles(colors);

  return <Text style={[styles.heading, style]}>{children}</Text>;
}

function useStyles(colors: any) {
  return StyleSheet.create({
    heading: {
      fontSize: 32,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 4,
    },
  });
}
