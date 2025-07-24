import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { useStyles } from "./styles";
import { ThumbnailProps } from "./types";

export function Thumbnail({ imageUrl }: ThumbnailProps = {}) {
  const { styles, colors } = useStyles();

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      {imageUrl ? (
        // TODO: Replace with actual Image component when implementing
        <View style={styles.placeholder}>
          <MaterialIcons name="image" size={32} color={colors.icon} />
        </View>
      ) : (
        <View style={styles.placeholder}>
          <MaterialIcons name="restaurant" size={32} color={colors.icon} />
        </View>
      )}
    </View>
  );
}
