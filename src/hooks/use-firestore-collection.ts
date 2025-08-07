import {
  FirebaseFirestoreTypes,
  onSnapshot,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

interface UseFirestoreCollectionOptions<T extends FirebaseFirestoreTypes.DocumentData> {
  queryFn: () =>
    | FirebaseFirestoreTypes.Query<T>
    | FirebaseFirestoreTypes.CollectionReference<T>
    | null;
  transform?: (snapshot: FirebaseFirestoreTypes.QuerySnapshot<T>) => T[];
  dependencies?: any[];
}

export function useFirestoreCollection<T extends FirebaseFirestoreTypes.DocumentData>({
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
          const transformedData = transform 
            ? transform(snapshot)
            : snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
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

