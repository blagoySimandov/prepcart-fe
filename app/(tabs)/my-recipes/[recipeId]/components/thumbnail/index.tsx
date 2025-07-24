import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, View } from "react-native";
import { useStyles } from "./styles";
import { ThumbnailProps } from "./types";

export function Thumbnail({ imageUrl }: ThumbnailProps = {}) {
  const { styles, colors } = useStyles();

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel="Recipe step thumbnail"
        />
      ) : (
        <View style={styles.placeholder}>
          <MaterialIcons name="restaurant" size={32} color={colors.icon} />
        </View>
      )}
    </View>
  );
}
