import { IconSymbol } from "@/components/ui/IconSymbol";
import { getUserDisplayName, isApplePrivateRelayEmail } from "@/src/utils";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useStyles from "../styles";

interface ProfileHeaderProps {
  profile: {
    photoURL?: string;
    displayName?: string;
    email?: string;
    createdAt?: { toDate: () => Date };
  };
  onUpdateDisplayName?: (displayName: string) => Promise<void>;
}

export function ProfileHeader({
  profile,
  onUpdateDisplayName,
}: ProfileHeaderProps) {
  const { styles, colors } = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const formatDate = (date: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const displayName = getUserDisplayName(profile.displayName);
  const shouldShowEmail =
    profile.email && !isApplePrivateRelayEmail(profile.email);

  const handleEditPress = () => {
    setEditedName(profile.displayName || "");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName("");
  };

  const handleSaveEdit = async () => {
    if (!editedName.trim()) {
      Alert.alert("Invalid Name", "Please enter a valid display name.");
      return;
    }

    if (!onUpdateDisplayName) {
      Alert.alert("Error", "Update function not available.");
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdateDisplayName(editedName.trim());
      setIsEditing(false);
      setEditedName("");
    } catch (error) {
      console.error("Error updating display name:", error);
      Alert.alert("Error", "Failed to update display name. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <View style={styles.profileHeader}>
      {profile.photoURL ? (
        <Image source={{ uri: profile.photoURL }} style={styles.avatar} />
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {profile.displayName
              ?.split(" ")
              .map((n: string) => n[0])
              .join("")}
          </Text>
        </View>
      )}

      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={[styles.editInput, { color: colors.text }]}
            value={editedName}
            onChangeText={setEditedName}
            placeholder="Enter your name"
            placeholderTextColor={colors.icon}
            autoCapitalize="words"
            autoCorrect={false}
            autoFocus
            editable={!isUpdating}
          />
          <View style={styles.editActions}>
            <TouchableOpacity
              style={[styles.editActionButton, styles.cancelButton]}
              onPress={handleCancelEdit}
              disabled={isUpdating}>
              <Text style={[{ color: colors.icon }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editActionButton, styles.saveButton]}
              onPress={handleSaveEdit}
              disabled={isUpdating}>
              <Text style={[{ color: colors.background }]}>
                {isUpdating ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>{displayName}</Text>
          {onUpdateDisplayName && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditPress}>
              <IconSymbol name="pencil" size={18} color={colors.icon} />
            </TouchableOpacity>
          )}
        </View>
      )}

      {shouldShowEmail && <Text style={styles.userEmail}>{profile.email}</Text>}
      <Text style={styles.memberSince}>
        Member since{" "}
        {profile.createdAt ? formatDate(profile.createdAt.toDate()) : ""}
      </Text>
    </View>
  );
}
