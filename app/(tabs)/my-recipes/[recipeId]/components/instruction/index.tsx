import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useStyles } from "./styles";
import { InstructionProps, TextProps, TimerProps, VideoProps } from "./types";

function InstructionBase({ children }: InstructionProps) {
  const { styles, colors } = useStyles();

  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      {children}
    </View>
  );
}

function Video({ videoLink, startTimestamp, endTimestamp }: VideoProps) {
  const { styles, colors } = useStyles();
  return (
    <View
      style={[styles.videoContainer, { backgroundColor: colors.secondary }]}>
      <View style={styles.videoPlaceholder}>
        <MaterialIcons
          name="play-circle-filled"
          size={64}
          color={colors.tint}
        />
        <ThemedText style={styles.videoText}>
          {videoLink ? "Tap to play video" : "Video not available"}
        </ThemedText>
        {startTimestamp !== undefined && endTimestamp !== undefined && (
          <ThemedText style={[styles.videoTimestamp, { color: colors.icon }]}>
            {startTimestamp}s - {endTimestamp}s
          </ThemedText>
        )}
      </View>
    </View>
  );
}

function Text({ children }: TextProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.textContainer}>
      <ThemedText style={styles.instructionText}>{children}</ThemedText>
    </View>
  );
}

function Timer({ durationMinutes }: TimerProps) {
  const { styles, colors } = useStyles();

  return (
    <TouchableOpacity
      style={[styles.timerContainer, { backgroundColor: colors.tint }]}>
      <MaterialIcons name="timer" size={20} color={colors.buttonText} />
      <ThemedText style={[styles.timerText, { color: colors.buttonText }]}>
        Set Timer: {durationMinutes} min
      </ThemedText>
    </TouchableOpacity>
  );
}

export const Instruction = Object.assign(InstructionBase, {
  Video,
  Text,
  Timer,
});
