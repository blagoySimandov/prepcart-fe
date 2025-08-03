import { Video as ExpoVideo, ResizeMode, AVPlaybackStatus } from "expo-av";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { View } from "react-native";

interface StepVideoProps {
  source: { uri: string };
  style?: any;
  resizeMode?: ResizeMode;
  onPlaybackStatusUpdate?: (status: AVPlaybackStatus) => void;
}

export const StepVideo = forwardRef<ExpoVideo, StepVideoProps>(
  function StepVideo({ source, style, resizeMode = ResizeMode.CONTAIN, onPlaybackStatusUpdate }, ref) {
    const videoRef = useRef<ExpoVideo>(null);

    useImperativeHandle(ref, () => videoRef.current!, []);

    return (
      <View style={style}>
        <ExpoVideo
          ref={videoRef}
          source={source}
          style={{ flex: 1 }}
          resizeMode={resizeMode}
          useNativeControls={false}
          shouldPlay={false}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
      </View>
    );
  }
);