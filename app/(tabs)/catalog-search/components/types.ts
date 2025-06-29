export interface PdfViewerProps {
  source: string;
  initialPage?: number;
  onError?: (error: any) => void;
}
