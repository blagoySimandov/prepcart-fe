import { useAlert } from "@/components/providers/alert-provider";
import { formatTime } from "@/src/utils/formatters";
import { AVPlaybackStatus, Video as ExpoVideo } from "expo-av";
import { useCallback, useReducer, useRef, useState } from "react";

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
  const [showThumbnail, setShowThumbnail] = useState(true);

  const resetAndPlay = useCallback(async () => {
    if (!videoRef.current || !isVideoReady) return;
    
    setIsLoading(true);
    setShowThumbnail(false);
    try {
      if (startTimestamp !== undefined) {
        await videoRef.current.setPositionAsync(startTimestamp * 1000);
      }
      await videoRef.current.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.warn("Video play error:", error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [startTimestamp, isVideoReady]);

  const pause = useCallback(async () => {
    if (!videoRef.current) return;
    
    try {
      await videoRef.current.pauseAsync();
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
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) {
        setIsVideoReady(false);
        setIsLoading(false);
        return;
      }

      if (!isVideoReady) {
        setIsVideoReady(true);
        setIsLoading(false);
        if (startTimestamp !== undefined && showThumbnail) {
          videoRef.current?.setPositionAsync(startTimestamp * 1000).catch(() => {});
        }
      }

      if (endTimestamp && status.positionMillis && status.positionMillis / 1000 >= endTimestamp) {
        pause();
      }

      interface ExtendedPlaybackStatus extends AVPlaybackStatus {
        didJustFinish?: boolean;
      }
      if ((status as ExtendedPlaybackStatus).didJustFinish) {
        setIsPlaying(false);
        setShowThumbnail(true);
      }
    },
    [endTimestamp, isVideoReady, pause, startTimestamp, showThumbnail],
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