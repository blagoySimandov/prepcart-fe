import { ReactNode } from "react";

export interface InstructionProps {
  children: ReactNode;
  isModified?: boolean;
  modificationDetail?: {
    originalInstruction: string;
    reason: string;
  };
}

export interface VideoProps {
  videoLink?: string;
  startTimestamp?: number;
  endTimestamp?: number;
}

export interface TextProps {
  children: ReactNode;
}

export interface TimerProps {
  durationMinutes: number;
}
