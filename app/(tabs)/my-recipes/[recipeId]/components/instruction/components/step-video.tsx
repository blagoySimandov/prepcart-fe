import { VideoView, useVideoPlayer } from "expo-video";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { View } from "react-native";

interface StepVideoProps {
  source: { uri: string };
  style?: any;
  resizeMode?: "contain" | "cover" | "fill";
  onPlaybackStatusUpdate?: (status: any) => void;
}

export const StepVideo = forwardRef<any, StepVideoProps>(
  function StepVideo({ source, style, resizeMode = "contain", onPlaybackStatusUpdate }, ref) {
    const videoRef = useRef<VideoView>(null);
    
    const player = useVideoPlayer(source.uri, (player) => {
      player.loop = false;
      player.muted = false;
    });

    useImperativeHandle(ref, () => ({
      playAsync: () => player.play(),
      pauseAsync: () => player.pause(),
      setPositionAsync: (positionMillis: number) => {
        player.currentTime = positionMillis / 1000;
      },
      getCurrentPositionAsync: () => Promise.resolve({ positionMillis: player.currentTime * 1000 }),
    }), [player]);

    // Set up status updates
    React.useEffect(() => {
      if (!onPlaybackStatusUpdate) return;

      const interval = setInterval(() => {
        const status = {
          isLoaded: player.status === 'readyToPlay' || player.status === 'loading',
          positionMillis: player.currentTime * 1000,
          didJustFinish: player.status === 'idle' && player.currentTime > 0,
        };
        onPlaybackStatusUpdate(status);
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }, [onPlaybackStatusUpdate, player]);

    return (
      <View style={style}>
        <VideoView
          ref={videoRef}
          player={player}
          style={{ flex: 1 }}
          contentFit={resizeMode}
          allowsFullscreen={false}
          showsTimecodes={false}
        />
      </View>
    );
  }
);