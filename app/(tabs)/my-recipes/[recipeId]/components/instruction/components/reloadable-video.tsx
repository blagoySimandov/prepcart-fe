import { Video as ExpoVideo, ResizeMode, AVPlaybackStatus } from "expo-av";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { View, Platform } from "react-native";

interface ReloadableVideoProps {
  source: { uri: string };
  style?: any;
  resizeMode?: ResizeMode;
  useNativeControls?: boolean;
  shouldPlay?: boolean;
  onPlaybackStatusUpdate?: (status: AVPlaybackStatus) => void;
  onLoadStart?: () => void;
  onLoad?: () => void;
  onReadyForDisplay?: () => void;
  onError?: () => void;
}

const RELOAD_TIMEOUT = 500;

export const ReloadableVideo = forwardRef<ExpoVideo, ReloadableVideoProps>(
  function ReloadableVideo(
    {
      source,
      style,
      resizeMode = ResizeMode.CONTAIN,
      useNativeControls = false,
      shouldPlay = false,
      onPlaybackStatusUpdate,
      onLoadStart,
      onLoad,
      onReadyForDisplay,
      onError,
      ...props
    },
    ref,
  ) {
    const videoRef = useRef<ExpoVideo>(null);
    const [key, setKey] = useState(0);
    const [hasLoadStarted, setHasLoadStarted] = useState(false);
    const reloadTimeoutRef = useRef<NodeJS.Timeout | number | null>(null);

    useImperativeHandle(ref, () => videoRef.current!, []);

    const forceReload = useCallback(() => {
      setKey((prev) => prev + 1);
      setHasLoadStarted(false);
      if (reloadTimeoutRef.current) {
        clearTimeout(reloadTimeoutRef.current);
      }
    }, []);

    const handleLoadStart = useCallback(() => {
      setHasLoadStarted(true);
      onLoadStart?.();

      if (Platform.OS === "ios") {
        if (reloadTimeoutRef.current) {
          clearTimeout(reloadTimeoutRef.current);
        }
        reloadTimeoutRef.current = setTimeout(() => {
          if (hasLoadStarted) {
            forceReload();
          }
        }, RELOAD_TIMEOUT);
      }
    }, [hasLoadStarted, forceReload, onLoadStart]);

    const handleLoad = useCallback(() => {
      if (reloadTimeoutRef.current) {
        clearTimeout(reloadTimeoutRef.current);
      }
      onLoad?.();
    }, [onLoad]);

    const handleReadyForDisplay = useCallback(() => {
      if (reloadTimeoutRef.current) {
        clearTimeout(reloadTimeoutRef.current);
      }
      onReadyForDisplay?.();
    }, [onReadyForDisplay]);

    const handleError = useCallback(() => {
      if (reloadTimeoutRef.current) {
        clearTimeout(reloadTimeoutRef.current);
      }
      onError?.();
      forceReload();
    }, [onError, forceReload]);

    useEffect(() => {
      return () => {
        if (reloadTimeoutRef.current) {
          clearTimeout(reloadTimeoutRef.current);
        }
      };
    }, []);

    return (
      <View style={style}>
        <ExpoVideo
          key={key}
          ref={videoRef}
          source={source}
          style={{ flex: 1 }}
          resizeMode={resizeMode}
          useNativeControls={useNativeControls}
          shouldPlay={shouldPlay}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onReadyForDisplay={handleReadyForDisplay}
          onError={handleError}
          {...props}
        />
      </View>
    );
  },
);
