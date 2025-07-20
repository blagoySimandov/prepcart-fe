import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useStyles } from "../styles";

interface RecipeImageProps {
  imageUri?: string;
  title: string;
  style?: StyleProp<ViewStyle>;
}

export function RecipeImage({ imageUri, title, style }: RecipeImageProps) {
  const theme = useColorScheme();
  const colors = Colors[theme || "light"];
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const styles = useStyles();

  return (
    <View style={[styles.imageContainer, style]}>
      {imageUri && !imageError ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>🍳</Text>
        </View>
      )}

      {imageLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      )}

      {/* Gradient overlay for better text readability */}
      <View style={styles.gradientOverlay} />

      {/* Recipe title overlay */}
      <View style={styles.titleOverlay}>
        <Text style={styles.recipeTitle} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </View>
  );
}
