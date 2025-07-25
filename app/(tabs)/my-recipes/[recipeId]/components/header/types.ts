import { ReactNode } from "react";

export interface HeaderProps {
  children: ReactNode;
}

export interface TitleProps {
  children: ReactNode;
  isModified?: boolean;
}
