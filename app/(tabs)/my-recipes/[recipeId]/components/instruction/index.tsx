import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { ResizeMode } from "expo-av";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useStepVideo, useTimer } from "./hooks";
import { useStyles } from "./styles";
import { InstructionProps, TextProps, TimerProps, VideoProps } from "./types";
import { DetailModal } from "../detail-modal";
import { DetailSection } from "../detail-section";
import { ICON_SIZES, SPACING, OPACITY } from "@/constants/ui";
import { ICON_NAMES } from "@/constants/icons";
import { COMMON_COLORS } from "@/constants/colors";
import { VIDEO_DEFAULTS } from "../../constants";
import { MODAL_TITLES, LABELS, MESSAGES } from "../../messages";
import { useDetailModal } from "../hooks";
import { StepVideo } from "./components";

function InstructionBase({
  children,
  isModified,
  modificationDetail,
}: InstructionProps) {
  const { styles, colors } = useStyles();
  const modal = useDetailModal();

  return (
    <>
      <View
        style={[
          styles.container,
          { borderColor: colors.border },
          isModified && styles.modifiedContainer,
        ]}
      >
        {isModified && (
          <TouchableOpacity
            style={styles.modifiedIndicator}
            onPress={modal.open}
          >
            <MaterialIcons
              name={ICON_NAMES.edit}
              size={ICON_SIZES.medium}
              color={COMMON_COLORS.white}
            />
            <ThemedText style={styles.modifiedText}>
              {LABELS.modified}
            </ThemedText>
            <MaterialIcons
              name={ICON_NAMES.info}
              size={ICON_SIZES.small}
              color={COMMON_COLORS.white}
              style={{ marginLeft: SPACING.xs }}
            />
          </TouchableOpacity>
        )}
        {children}
      </View>

      {modificationDetail && (
        <DetailModal
          visible={modal.isVisible}
          onClose={modal.close}
          title={MODAL_TITLES.modifiedInstruction}
        >
          <DetailSection label={LABELS.original} strikethrough>
            {modificationDetail.originalInstruction}
          </DetailSection>
          <DetailSection label={LABELS.reason}>
            {modificationDetail.reason}
          </DetailSection>
        </DetailModal>
      )}
    </>
  );
}

function Video({ videoLink, startTimestamp, endTimestamp }: VideoProps) {
  const { styles, colors } = useStyles();
  const {
    videoRef,
    isPlaying,
    isLoading,
    isVideoReady,
    showThumbnail,
    handlePlayPause,
    handlePlaybackStatusUpdate,
  } = useStepVideo({ startTimestamp, endTimestamp });

  if (!videoLink) {
    return (
      <View
        style={[styles.videoContainer, { backgroundColor: colors.secondary }]}
      >
        <View style={styles.videoPlaceholder}>
          <MaterialIcons
            name={ICON_NAMES.videocamOff}
            size={64}
            color={colors.icon}
          />
          <ThemedText style={styles.videoText}>
            {MESSAGES.videoNotAvailable}
          </ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.videoContainer}>
      <View style={styles.videoWrapper}>
        <StepVideo
          ref={videoRef}
          source={{ uri: videoLink }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
        {(showThumbnail || isLoading || !isVideoReady) && !isPlaying && (
          <TouchableOpacity
            style={styles.videoOverlay}
            onPress={handlePlayPause}
            activeOpacity={0.8}
          >
            <View style={styles.playButton}>
              {isLoading || !isVideoReady ? (
                <ActivityIndicator
                  size={VIDEO_DEFAULTS.loaderSize}
                  color={colors.buttonText}
                />
              ) : (
                <MaterialIcons
                  name={ICON_NAMES.playArrow}
                  size={48}
                  color={colors.buttonText}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
        {!showThumbnail && (
          <TouchableOpacity
            style={styles.videoTapArea}
            onPress={handlePlayPause}
            activeOpacity={1}
          />
        )}
        {startTimestamp && endTimestamp && (
          <View style={styles.timestampOverlay}>
            <ThemedText
              style={[styles.videoTimestamp, { color: colors.buttonText }]}
            >
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
          opacity: timerState === "initial" ? OPACITY.slight : OPACITY.full,
        },
      ]}
      onPress={
        timeLeft === null ? handleStart : isRunning ? handlePause : handleStart
      }
      activeOpacity={0.8}
    >
      {/* Left side: Timer icon and time */}
      <View style={styles.timerLeft}>
        <MaterialIcons
          name={ICON_NAMES.timer}
          size={ICON_SIZES.xl}
          color={colors.buttonText}
        />
        <ThemedText style={[styles.timerText, { color: colors.buttonText }]}>
          {getDisplayText()}
        </ThemedText>
      </View>

      {/* Right side: Controls */}
      <View style={styles.timerRight}>
        {timeLeft !== null ? (
          <View style={styles.timerControls}>
            <MaterialIcons
              name={isRunning ? ICON_NAMES.pause : ICON_NAMES.playArrow}
              size={ICON_SIZES.xl}
              color={colors.buttonText}
            />
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name={ICON_NAMES.refresh}
                size={ICON_SIZES.large}
                color={colors.buttonText}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <ThemedText style={[styles.startText, { color: colors.buttonText }]}>
            {LABELS.start}
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
