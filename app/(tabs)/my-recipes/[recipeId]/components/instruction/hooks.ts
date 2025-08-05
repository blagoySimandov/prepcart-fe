import { useAlert } from "@/components/providers/alert-provider";
import { formatTime } from "@/src/utils/formatters";
import {
  useEffect,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

export function useStepVideo({
  startTimestamp,
  endTimestamp,
}: {
  startTimestamp?: number;
  endTimestamp?: number;
}) {
  const videoRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);

  // Calculate extended timestamps for short videos
  const { extendedStartTimestamp, extendedEndTimestamp } = useMemo(() => {
    if (startTimestamp === undefined || endTimestamp === undefined) {
      return {
        extendedStartTimestamp: startTimestamp,
        extendedEndTimestamp: endTimestamp,
      };
    }

    const originalDuration = endTimestamp - startTimestamp;

    // If video is 2 seconds or less, extend it to 3.5 seconds
    if (originalDuration <= 2) {
      const targetDuration = 3.5;
      const additionalTime = targetDuration - originalDuration;
      const timeBefore = additionalTime * 0.6; // 60% before
      const timeAfter = additionalTime * 0.4; // 40% after

      const newStartTimestamp = Math.max(0, startTimestamp - timeBefore);
      const newEndTimestamp = endTimestamp + timeAfter;

      console.log("📏 Extended short video:", {
        original: `${startTimestamp}s - ${endTimestamp}s (${originalDuration}s)`,
        extended: `${newStartTimestamp.toFixed(1)}s - ${newEndTimestamp.toFixed(1)}s (${targetDuration}s)`,
        added: `${timeBefore.toFixed(1)}s before, ${timeAfter.toFixed(1)}s after`,
      });

      return {
        extendedStartTimestamp: newStartTimestamp,
        extendedEndTimestamp: newEndTimestamp,
      };
    }

    return {
      extendedStartTimestamp: startTimestamp,
      extendedEndTimestamp: endTimestamp,
    };
  }, [startTimestamp, endTimestamp]);

  const resetAndPlay = useCallback(async () => {
    if (!videoRef.current || !isVideoReady) return;

    setIsLoading(true);
    setShowThumbnail(false);
    try {
      if (extendedStartTimestamp !== undefined) {
        videoRef.current.setPositionAsync(extendedStartTimestamp * 1000);
      }
      videoRef.current.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.warn("Video play error:", error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [extendedStartTimestamp, isVideoReady]);

  const pause = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      videoRef.current.pauseAsync();
      setIsPlaying(false);
      setShowThumbnail(true);
    } catch (error) {
      console.warn("Video pause error:", error);
    }
  }, []);

  const handlePlayPause = useCallback(async () => {
    if (isPlaying) {
      await pause();
    } else {
      await resetAndPlay();
    }
  }, [isPlaying, pause, resetAndPlay]);

  const handlePlaybackStatusUpdate = useCallback(
    (status: any) => {
      if (!status.isLoaded) {
        setIsVideoReady(false);
        setIsLoading(false);
        return;
      }

      if (!isVideoReady) {
        setIsVideoReady(true);
        setIsLoading(false);
        if (extendedStartTimestamp !== undefined && showThumbnail) {
          videoRef.current?.setPositionAsync(extendedStartTimestamp * 1000);
        }
      }

      // Use extended timestamps for playback control
      if (extendedEndTimestamp && status.positionMillis) {
        const currentSeconds = status.positionMillis / 1000;
        const duration = extendedEndTimestamp - (extendedStartTimestamp || 0);

        // For very short videos (≤3.5 seconds), be more lenient with timing
        const tolerance = duration <= 3.5 ? 0.5 : 0.1;

        if (currentSeconds >= extendedEndTimestamp - tolerance) {
          pause();
        }
      }

      if (status.didJustFinish) {
        setIsPlaying(false);
        setShowThumbnail(true);
      }
    },
    [
      extendedEndTimestamp,
      isVideoReady,
      pause,
      extendedStartTimestamp,
      showThumbnail,
    ],
  );

  return {
    videoRef,
    isPlaying,
    isLoading,
    isVideoReady,
    showThumbnail,
    handlePlayPause,
    handlePlaybackStatusUpdate,
  };
}

interface TimerState {
  timeLeft: number | null;
  isRunning: boolean;
  isPaused: boolean;
  intervalId: NodeJS.Timeout | number | null;
}

type TimerAction =
  | { type: "START"; totalSeconds: number }
  | { type: "RESUME" }
  | { type: "PAUSE" }
  | { type: "RESET" }
  | { type: "TICK"; onComplete: () => void }
  | { type: "SET_INTERVAL"; intervalId: NodeJS.Timeout | number }
  | { type: "COMPLETE" };

const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case "START":
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      return {
        ...state,
        timeLeft:
          state.timeLeft === null ? action.totalSeconds : state.timeLeft,
        isRunning: true,
        isPaused: false,
        intervalId: null,
      };

    case "RESUME":
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      return {
        ...state,
        isRunning: true,
        isPaused: false,
        intervalId: null,
      };

    case "PAUSE":
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      return {
        ...state,
        isRunning: false,
        isPaused: true,
        intervalId: null,
      };

    case "RESET":
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      return {
        timeLeft: null,
        isRunning: false,
        isPaused: false,
        intervalId: null,
      };

    case "SET_INTERVAL":
      return {
        ...state,
        intervalId: action.intervalId,
      };

    case "TICK":
      if (state.timeLeft === null || state.timeLeft <= 1) {
        if (state.intervalId) {
          clearInterval(state.intervalId);
        }
        action.onComplete();
        return {
          timeLeft: null,
          isRunning: false,
          isPaused: false,
          intervalId: null,
        };
      }
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };

    case "COMPLETE":
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      return {
        timeLeft: null,
        isRunning: false,
        isPaused: false,
        intervalId: null,
      };

    default:
      return state;
  }
};

export function useTimer(durationMinutes: number) {
  const [state, dispatch] = useReducer(timerReducer, {
    timeLeft: null,
    isRunning: false,
    isPaused: false,
    intervalId: null,
  });

  const totalSeconds = durationMinutes * 60;

  const { showAlert } = useAlert();

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
    };
  }, [state.intervalId]);

  const handleTimerComplete = useCallback(() => {
    dispatch({ type: "COMPLETE" });
    showAlert(
      "Timer Complete! ⏰",
      `Your ${durationMinutes} minute timer has finished.`,
      [{ text: "OK", style: "default" }],
    );
  }, [durationMinutes, showAlert]);

  const startInterval = useCallback(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "TICK", onComplete: handleTimerComplete });
    }, 1000);
    dispatch({ type: "SET_INTERVAL", intervalId });
  }, [handleTimerComplete]);

  const handleStart = useCallback(() => {
    dispatch({ type: "START", totalSeconds });
    startInterval();
  }, [totalSeconds, startInterval]);

  const handleResume = useCallback(() => {
    dispatch({ type: "RESUME" });
    startInterval();
  }, [startInterval]);

  const handlePause = useCallback(() => {
    dispatch({ type: "PAUSE" });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const handleStartOrResume = useCallback(() => {
    if (state.timeLeft === null) {
      handleStart();
    } else {
      handleResume();
    }
  }, [state.timeLeft, handleStart, handleResume]);

  const getDisplayText = useCallback(() => {
    if (state.timeLeft !== null) {
      return formatTime(state.timeLeft);
    }
    return `Set Timer: ${durationMinutes} min`;
  }, [state.timeLeft, durationMinutes]);

  const getTimerState = useCallback(() => {
    if (state.isRunning) return "running";
    if (state.isPaused) return "paused";
    if (state.timeLeft !== null) return "ready";
    return "initial";
  }, [state.isRunning, state.isPaused, state.timeLeft]);

  return {
    timeLeft: state.timeLeft,
    isRunning: state.isRunning,
    isPaused: state.isPaused,
    handleStart: handleStartOrResume,
    handlePause,
    handleReset,
    getDisplayText,
    getTimerState,
  };
}

