import React from "react";
import { Image, Text, View } from "react-native";
import useStyles from "../styles";

interface ProfileHeaderProps {
  profile: {
    photoURL?: string;
    displayName?: string;
    email?: string;
    createdAt?: { toDate: () => Date };
  };
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const { styles } = useStyles();

  const formatDate = (date: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
      <Text style={styles.userName}>{profile.displayName}</Text>
      <Text style={styles.userEmail}>{profile.email}</Text>
      <Text style={styles.memberSince}>
        Member since{" "}
        {profile.createdAt ? formatDate(profile.createdAt.toDate()) : ""}
      </Text>
    </View>
  );
}
