import { Text, View } from "react-native";
import { useStyles } from "../styles";
import { memo } from "react";

export const HomeHeader = memo(function HomeHeader() {
  const { styles } = useStyles();

  return (
    <View style={styles.header}>
      <Text style={styles.greeting}>Good day!</Text>
      <Text style={styles.subtitle}>What would you like to cook today?</Text>
    </View>
  );
});
