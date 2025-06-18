import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ChatInputProps } from "./types";
import useStyles from "./styles";

export function ChatInput({
  onSendMessage,
  workflow,
  disabled,
}: ChatInputProps) {
  const { styles, colors } = useStyles();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      Alert.alert("Error", "Please enter a message");
      return;
    }
    onSendMessage(message.trim());
    setMessage("");
  };

  const getPlaceholder = () => {
    switch (workflow) {
      case "recipe-import":
        return "Enter recipe URL or paste recipe text...";
      case "calorie-analysis":
        return "Describe the food or upload an image...";
      default:
        return "Type your message...";
    }
  };

  return (
    <View style={styles.chatInputContainer}>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.chatInput, disabled && styles.disabledInput]}
          placeholder={getPlaceholder()}
          placeholderTextColor={colors.icon}
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={2000}
          editable={!disabled}
        />
        <TouchableOpacity
          style={[styles.sendButton, disabled && styles.disabledButton]}
          onPress={handleSend}
          disabled={disabled || !message.trim()}>
          <ThemedText style={styles.sendButtonText}>
            {disabled ? "..." : "→"}
          </ThemedText>
        </TouchableOpacity>
      </View>
      {workflow === "calorie-analysis" && (
        <TouchableOpacity
          style={[styles.imageButton, disabled && styles.disabledButton]}
          disabled={disabled}>
          <ThemedText style={styles.imageButtonText}>📷 Add Photo</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
}
