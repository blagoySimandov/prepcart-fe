import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { PDF_JS_VIEWER_BASE_URL, usePdfViewerStyles } from "./hooks";
import { PdfViewerProps } from "./types";

export function PdfViewer({
  source,
  initialPage = 1,
  onError,
}: PdfViewerProps) {
  const { styles, themeColors } = usePdfViewerStyles();

  const pdfUrl = `${PDF_JS_VIEWER_BASE_URL}?file=${encodeURIComponent(
    source
  )}#page=${initialPage}`;

  return (
    <View style={styles.container}>
      {/* Page indicator at the top */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderText}>
          Brochure Viewer - Page {initialPage}
        </Text>
      </View>

      <WebView
        source={{ uri: pdfUrl }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={themeColors.tint} />
            <Text style={styles.loadingText}>Loading PDF...</Text>
          </View>
        )}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView Error:", nativeEvent);
          onError?.(nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView HTTP Error:", nativeEvent);
          onError?.(nativeEvent);
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mixedContentMode="compatibility"
        originWhitelist={["*"]}
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
      />
    </View>
  );
}
