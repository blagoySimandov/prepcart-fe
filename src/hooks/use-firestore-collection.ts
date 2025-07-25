import {
  FirebaseFirestoreTypes,
  onSnapshot,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

interface UseFirestoreCollectionOptions<T> {
  // Function to create the query/collection reference
  queryFn: () =>
    | FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>
    | FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>
    | null;
  // Function to transform Firestore documents to your type
  transform: (
    snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => T[];
  // Dependencies that should trigger re-subscription
  dependencies?: any[];
}

export function useFirestoreCollection<T>({
  queryFn,
  transform,
  dependencies = [],
}: UseFirestoreCollectionOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const query = queryFn();

    if (!query) {
      setData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        try {
          const transformedData = transform(snapshot);
          setData(transformedData);
          setIsLoading(false);
        } catch (err) {
          console.error("Error transforming Firestore data:", err);
          setError(err instanceof Error ? err : new Error("Transform error"));
          setIsLoading(false);
        }
      },
      (err) => {
        console.error("Error listening to Firestore:", err);
        setError(err);
        setData([]);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, dependencies);

  return { data, isLoading, error };
}

