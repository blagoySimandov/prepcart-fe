import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { Video as ExpoVideo, ResizeMode } from "expo-av";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useStepVideo, useTimer } from "./hooks";
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
  const {
    videoRef,
    isPlaying,
    isLoading,
    isVideoReady,
    handlePlayPause,
    handlePlaybackStatusUpdate,
  } = useStepVideo({ startTimestamp, endTimestamp });

  if (!videoLink) {
    return (
      <View
        style={[styles.videoContainer, { backgroundColor: colors.secondary }]}>
        <View style={styles.videoPlaceholder}>
          <MaterialIcons name="videocam-off" size={64} color={colors.icon} />
          <ThemedText style={styles.videoText}>Video not available</ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.videoContainer}>
      <View style={styles.videoWrapper}>
        <ExpoVideo
          ref={videoRef}
          source={{ uri: videoLink }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls={false}
          shouldPlay={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
        {(!isPlaying || isLoading || !isVideoReady) && (
          <TouchableOpacity
            style={styles.videoOverlay}
            onPress={handlePlayPause}
            activeOpacity={0.8}>
            <View style={styles.playButton}>
              {isLoading || !isVideoReady ? (
                <ActivityIndicator size="large" color={colors.buttonText} />
              ) : (
                <MaterialIcons
                  name="play-arrow"
                  size={48}
                  color={colors.buttonText}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
        {isPlaying && !isLoading && isVideoReady && (
          <TouchableOpacity
            style={styles.videoTapArea}
            onPress={handlePlayPause}
            activeOpacity={1}
          />
        )}
        {startTimestamp !== undefined && endTimestamp !== undefined && (
          <View style={styles.timestampOverlay}>
            <ThemedText
              style={[styles.videoTimestamp, { color: colors.buttonText }]}>
              {startTimestamp}s - {endTimestamp}s
            </ThemedText>
          </View>
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
  const {
    timeLeft,
    isRunning,
    handleStart,
    handlePause,
    handleReset,
    getDisplayText,
    getTimerState,
  } = useTimer(durationMinutes);

  const timerState = getTimerState();

  return (
    <TouchableOpacity
      style={[
        styles.timerContainer,
        {
          backgroundColor: colors.tint,
          opacity: timerState === "initial" ? 0.9 : 1,
        },
      ]}
      onPress={
        timeLeft === null ? handleStart : isRunning ? handlePause : handleStart
      }
      activeOpacity={0.8}>
      {/* Left side: Timer icon and time */}
      <View style={styles.timerLeft}>
        <MaterialIcons name="timer" size={20} color={colors.buttonText} />
        <ThemedText style={[styles.timerText, { color: colors.buttonText }]}>
          {getDisplayText()}
        </ThemedText>
      </View>

      {/* Right side: Controls */}
      <View style={styles.timerRight}>
        {timeLeft !== null ? (
          <View style={styles.timerControls}>
            <MaterialIcons
              name={isRunning ? "pause" : "play-arrow"}
              size={20}
              color={colors.buttonText}
            />
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
              activeOpacity={0.8}>
              <MaterialIcons
                name="refresh"
                size={18}
                color={colors.buttonText}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <ThemedText style={[styles.startText, { color: colors.buttonText }]}>
            Start
          </ThemedText>
        )}
      </View>
    </TouchableOpacity>
  );
}

export const Instruction = Object.assign(InstructionBase, {
  Video,
  Text,
  Timer,
});
