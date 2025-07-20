import { StyleProp, Text, TextStyle } from "react-native";
import { useStyles } from "../styles";

interface RecipeDescriptionProps {
  description?: string;
  style?: StyleProp<TextStyle>;
}

export function RecipeDescription({
  description,
  style,
}: RecipeDescriptionProps) {
  const styles = useStyles();

  if (!description) return null;

  return (
    <Text style={[styles.description, style]} numberOfLines={2}>
      {description}
    </Text>
  );
}
