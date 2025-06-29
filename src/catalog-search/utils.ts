/**
 * Converts a Firebase Storage gs:// URL to an HTTPS URL
 * @param gsUrl - The gs:// URL from Firebase Storage
 * @returns HTTPS URL for accessing the file
 */
export function convertGsUrlToHttps(gsUrl: string): string {
  if (!gsUrl.startsWith("gs://")) {
    return gsUrl; // Return as-is if it's already an HTTPS URL
  }

  // Extract bucket and path from gs://bucket/path
  const urlParts = gsUrl.replace("gs://", "").split("/");
  const bucket = urlParts[0];
  const path = urlParts.slice(1).join("/");

  // Convert to Firebase Storage direct URL format
  return `https://storage.googleapis.com/${bucket}/${path}`;
}
