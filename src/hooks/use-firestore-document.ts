import { useState, useEffect } from "react";
import {
  onSnapshot,
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

interface UseFirestoreDocumentOptions<T extends FirebaseFirestoreTypes.DocumentData> {
  docRefFn: () => FirebaseFirestoreTypes.DocumentReference<T> | null;
  transform?: (doc: FirebaseFirestoreTypes.DocumentSnapshot<T>) => T | null;
  dependencies?: any[];
}

export function useFirestoreDocument<T extends FirebaseFirestoreTypes.DocumentData>({
  docRefFn,
  transform,
  dependencies = [],
}: UseFirestoreDocumentOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const docRef = docRefFn();

    if (!docRef) {
      setData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        try {
          if (!doc.exists) {
            setData(null);
            setIsLoading(false);
            return;
          }

          const docData = doc.data();
          const transformedData = transform ? transform(doc) : (docData as T);
          setData(transformedData);
          setIsLoading(false);
        } catch (err) {
          console.error("Error transforming Firestore document:", err);
          setError(err instanceof Error ? err : new Error("Transform error"));
          setIsLoading(false);
        }
      },
      (err) => {
        console.error("Error listening to Firestore document:", err);
        setError(err);
        setData(null);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, dependencies);

  return { data, isLoading, error };
}
