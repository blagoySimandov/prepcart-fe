interface TikTokImportRequest {
  url: string;
  userId: string;
}

// TODO: Define proper type for status field
export interface TikTokImportResponse {
  updateTime: string;
  status: Record<string, unknown>;
  videoLink: string;
  description: string;
  thumbnail: string;
  dynamicCover: string;
  id: string;
}

const WEBHOOK_URL = "http://localhost:5678/webhook-test/afc0575e-e6aa-4259-9508-1e7b86bbb9d4";

export async function importTikTokRecipe(
  tiktokUrl: string,
  userId: string
): Promise<TikTokImportResponse> {
  const request: TikTokImportRequest = {
    url: tiktokUrl,
    userId: userId,
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to import TikTok recipe: ${response.statusText}`);
    }

    const data: TikTokImportResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error importing TikTok recipe:", error);
    throw error;
  }
}