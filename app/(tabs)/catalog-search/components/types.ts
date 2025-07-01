import type {
  WebViewErrorEvent,
  WebViewHttpErrorEvent,
} from "react-native-webview/lib/RNCWebViewNativeComponent";

export interface PdfViewerProps {
  source: string;
  initialPage?: number;
  onError?: (error: WebViewErrorEvent | WebViewHttpErrorEvent) => void;
}
