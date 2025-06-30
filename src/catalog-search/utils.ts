/**
 * Converts a Firebase Storage gs:// URL to an HTTPS URL
 * @param gsUrl - The gs:// URL from Firebase Storage
 * @returns HTTPS URL for accessing the file
 */
export function convertGsUrlToHttps(gsUrl: string): string {
  if (!gsUrl.startsWith("gs://")) {
    return gsUrl;
  }

  const urlParts = gsUrl.replace("gs://", "").split("/");
  const bucket = urlParts[0];
  const path = urlParts.slice(1).join("/");

  return `https://storage.googleapis.com/${bucket}/${path}`;
}
