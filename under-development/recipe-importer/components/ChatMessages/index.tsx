import React from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ChatMessagesProps } from "./types";
import useStyles from "./styles";

export function ChatMessages({ messages }: ChatMessagesProps) {
  const { styles } = useStyles();

  if (messages.length === 0) {
    return (
      <View style={styles.emptyState}>
        <ThemedText style={styles.emptyStateText}>
          👋 Hi! I&apos;m your AI Kitchen Assistant. How can I help you today?
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.messagesContainer}>
      {messages.map((message) => (
        <View
          key={message.id}
          style={[
            styles.messageContainer,
            message.type === "user" ? styles.userMessage : styles.aiMessage,
          ]}>
          <View
            style={[
              styles.messageBubble,
              message.type === "user" ? styles.userBubble : styles.aiBubble,
            ]}>
            <ThemedText
              style={[
                styles.messageText,
                message.type === "user"
                  ? styles.userMessageText
                  : styles.aiMessageText,
              ]}>
              {message.content}
            </ThemedText>
          </View>
          <ThemedText style={styles.messageTime}>
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}
