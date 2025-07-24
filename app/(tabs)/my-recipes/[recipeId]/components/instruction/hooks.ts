import { useAlert } from "@/components/providers/AlertProvider";
import { AVPlaybackStatus, Video as ExpoVideo } from "expo-av";
import { useCallback, useEffect, useRef, useState } from "react";

export function useStepVideo({
  startTimestamp,
  endTimestamp,
}: {
  startTimestamp?: number;
  endTimestamp?: number;
}) {
  const videoRef = useRef<ExpoVideo>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const handlePlayPause = useCallback(async () => {
    if (!videoRef.current) return;
    setIsLoading(true);
    try {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        if (startTimestamp !== undefined) {
          await videoRef.current.setPositionAsync(startTimestamp * 1000);
        }
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, startTimestamp]);

  const handlePlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) return;

      // When video loads for the first time, seek to startTimestamp and pause to show as thumbnail
      if (!isVideoReady && status.isLoaded && startTimestamp !== undefined) {
        setIsVideoReady(true);
        videoRef.current?.setPositionAsync(startTimestamp * 1000);
        videoRef.current?.pauseAsync();
      }

      if (endTimestamp && (status.positionMillis || 0) / 1000 >= endTimestamp) {
        videoRef.current?.pauseAsync();
        setIsPlaying(false);
      }
      if ((status as any).didJustFinish) setIsPlaying(false);
    },
    [endTimestamp, startTimestamp, isVideoReady],
  );

  return {
    videoRef,
    isPlaying,
    isLoading,
    isVideoReady,
    handlePlayPause,
    handlePlaybackStatusUpdate,
  };
}

export function useTimer(durationMinutes: number) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Convert minutes to seconds for countdown
  const totalSeconds = durationMinutes * 60;

  // Format time display (MM:SS)
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const { showAlert } = useAlert();

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(null);
    //TODO: bettter Timer completion flow
    showAlert(
      "Timer Complete! ⏰",
      `Your ${durationMinutes} minute timer has finished.`,
      [{ text: "OK", style: "default" }],
    );
  }, [durationMinutes, showAlert]);

  const handleStart = useCallback(() => {
    if (timeLeft === null) {
      setTimeLeft(totalSeconds);
    }
    setIsRunning(true);
    setIsPaused(false);
  }, [timeLeft, totalSeconds]);

  const handlePause = useCallback(() => {
    setIsRunning(false);
    setIsPaused(true);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(null);
  }, []);

  const getDisplayText = useCallback(() => {
    if (timeLeft !== null) {
      return formatTime(timeLeft);
    }
    return `Set Timer: ${durationMinutes} min`;
  }, [timeLeft, formatTime, durationMinutes]);

  const getTimerState = useCallback(() => {
    if (isRunning) return "running";
    if (isPaused) return "paused";
    if (timeLeft !== null) return "ready";
    return "initial";
  }, [isRunning, isPaused, timeLeft]);

  useEffect(() => {
    if (!isRunning || timeLeft === null) return;

    if (timeLeft <= 0) {
      handleTimerComplete();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev: number | null) => {
        if (prev === null || prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, handleTimerComplete]);

  return {
    timeLeft,
    isRunning,
    isPaused,
    handleStart,
    handlePause,
    handleReset,
    getDisplayText,
    getTimerState,
  };
}
