import { ReactNode } from "react";

export interface DetailSectionProps {
  label: string;
  children: ReactNode | ReactNode[];
  strikethrough?: boolean;
}

