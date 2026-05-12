import { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { JitsiMeetView } from "@/components/jitsi-meet-view";
import { useVideoConference } from "@/lib/video-conference-context";

export default function ConferenceScreen() {
  const router = useRouter();
  const { code } = useLocalSearchParams<{ code: string }>();
  const { endConference } = useVideoConference();

  const handleLeaveConference = () => {
    endConference();
    router.back();
  };

  if (!code) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text>Erro: Código de inspeção não fornecido</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <JitsiMeetView
        roomName={code}
        onLeave={handleLeaveConference}
        userDisplayName="Auditor"
      />
    </View>
  );
}
