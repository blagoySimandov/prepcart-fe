import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { TextInput } from "react-native";
import { useStyles } from "../styles";
import { ItemPreview } from "./item-preview";

interface SimpleInputViewProps {
  value: string;
  onValueChange: (value: string) => void;
  onParseAndAdd: (input: string) => void;
}

export interface SimpleInputViewRef {
  handleSubmit: () => void;
}

export const SimpleInputView = forwardRef<
  SimpleInputViewRef,
  SimpleInputViewProps
>(({ value, onValueChange, onParseAndAdd }, ref) => {
  const { styles, colors } = useStyles();
  const inputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    onParseAndAdd(value.trim());
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Item name (e.g., Wine 2 bottles, 500g flour)"
        placeholderTextColor={colors.icon}
        value={value}
        onChangeText={onValueChange}
        autoFocus={true}
        onSubmitEditing={handleSubmit}
      />
      <ItemPreview input={value} />
    </>
  );
});

SimpleInputView.displayName = "SimpleInputView";
