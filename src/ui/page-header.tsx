import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet, Text, View } from "react-native";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  style?: any;
}

export function PageHeader({ title, subtitle, style }: PageHeaderProps) {
  const theme = useColorScheme();
  const colors = Colors[theme || "light"];
  const styles = useStyles(colors);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

function useStyles(colors: any) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: colors.icon,
      lineHeight: 22,
    },
  });
}
