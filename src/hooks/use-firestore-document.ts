import { useState, useEffect } from "react";
import { 
  DocumentReference,
  onSnapshot,
  DocumentSnapshot,
  DocumentData 
} from "@react-native-firebase/firestore";

interface UseFirestoreDocumentOptions<T> {
  // Function to create the document reference
  docRefFn: () => DocumentReference<DocumentData> | null;
  // Function to transform Firestore document to your type
  transform: (doc: DocumentSnapshot<DocumentData>) => T | null;
  // Dependencies that should trigger re-subscription
  dependencies?: any[];
}

export function useFirestoreDocument<T>({
  docRefFn,
  transform,
  dependencies = []
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
          const transformedData = transform(doc);
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
      }
    );

    return () => unsubscribe();
  }, dependencies);

  return { data, isLoading, error };
}