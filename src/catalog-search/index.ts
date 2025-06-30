import { getFunctions, httpsCallable } from "@react-native-firebase/functions";
import {
  decodeProductCandidates,
  ProductCandidate,
  ProductCandidateApiResponse,
} from "./types";

export class CatalogService {
  static async search(query: string): Promise<ProductCandidate[]> {
    const functions = getFunctions();
    const r = await httpsCallable(functions, "catalogSearch")({ query });

    const apiResponse = r.data as { results: ProductCandidateApiResponse[] };
    console.log("API response:", apiResponse);
    return decodeProductCandidates(apiResponse.results);
  }
}
