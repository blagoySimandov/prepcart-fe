import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { WorkflowSelector } from "../WorkflowSelector";
import { ChatMessages } from "../ChatMessages";
import { ChatInput } from "../ChatInput";
import { AIResponse } from "../AIResponse";
import { RecipeImportPopup } from "../RecipeImportPopup";
import { CalorieAnalysisPopup } from "../CalorieAnalysisPopup";
import { ChatInterfaceProps } from "./types";
import { ChatMessage } from "./types";
import useStyles from "./styles";

export function ChatInterface({
  onRecipeImportUrl,
  onRecipeImportText,
  onCalorieAnalysis,
  loading,
  aiResponse,
}: ChatInterfaceProps) {
  const { styles } = useStyles();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showRecipeImportPopup, setShowRecipeImportPopup] = useState(false);
  const [showCalorieAnalysisPopup, setShowCalorieAnalysisPopup] =
    useState(false);

  const addMessage = (content: string, type: "user" | "ai") => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = (message: string, imageUri?: string) => {
    addMessage(message, "user");
    // For general chat, we can handle text messages and file uploads here
    // TODO: Implement general chat functionality
  };

  const handleRecipeImport = (url: string) => {
    onRecipeImportUrl(url);
    setShowRecipeImportPopup(false);
  };

  const handleCalorieAnalysis = (imageUri: string) => {
    onCalorieAnalysis(imageUri);
    setShowCalorieAnalysisPopup(false);
  };

  useEffect(() => {
    if (aiResponse) {
      addMessage(aiResponse, "ai");
    }
  }, [aiResponse]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            AI Kitchen Assistant
          </ThemedText>
          <ThemedText type="default" style={styles.headerSubtitle}>
            Chat with me or use specialized tools below
          </ThemedText>
        </View>

        <WorkflowSelector
          onRecipeImportPress={() => setShowRecipeImportPopup(true)}
          onCalorieAnalysisPress={() => setShowCalorieAnalysisPopup(true)}
        />

        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
          <ScrollView
            style={styles.chatContainer}
            contentContainerStyle={styles.chatContentContainer}
            showsVerticalScrollIndicator={false}>
            <ChatMessages messages={messages} />
            {loading && <AIResponse loading={true} />}
          </ScrollView>

          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={loading}
            allowFileUpload={true}
          />
        </KeyboardAvoidingView>

        <RecipeImportPopup
          visible={showRecipeImportPopup}
          onClose={() => setShowRecipeImportPopup(false)}
          onImport={handleRecipeImport}
          loading={loading}
        />

        <CalorieAnalysisPopup
          visible={showCalorieAnalysisPopup}
          onClose={() => setShowCalorieAnalysisPopup(false)}
          onAnalyze={handleCalorieAnalysis}
          loading={loading}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

export * from "./types";
