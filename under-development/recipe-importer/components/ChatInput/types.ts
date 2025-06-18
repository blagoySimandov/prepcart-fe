import { Workflow } from "../ChatInterface/types";

export interface ChatInputProps {
  onSendMessage: (message: string, imageUri?: string) => void;
  workflow: Workflow;
  disabled: boolean;
}
