import { ReactNode } from "react";

export interface DetailModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}