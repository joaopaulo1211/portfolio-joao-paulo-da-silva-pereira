import { ScrollView, Text, View, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { PrimaryButton } from "@/components/ui/primary-button";
import { InspectionCodeInput } from "@/components/ui/inspection-code-input";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { useColors } from "@/hooks/use-colors";
import { useVideoConference } from "@/lib/video-conference-context";

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const { startConference } = useVideoConference();
  const [inspectionCode, setInspectionCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStartInspection = () => {
    if (!inspectionCode.trim()) {
      Alert.alert(
        "Código Inválido",
        "Por favor, insira um código de inspeção válido."
      );
      return;
    }

    setIsLoading(true);
    // Iniciar conferência e navegar
    setTimeout(() => {
      startConference(inspectionCode);
      router.push({ pathname: "/conference", params: { code: inspectionCode } });
      setIsLoading(false);
    }, 500);
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-between py-8">
          {/* Header com Logo e Título */}
          <View className="items-center gap-4">
            {/* Logo Placeholder */}
            <View
              className="w-20 h-20 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <Text
                className="text-3xl font-bold"
                style={{ color: colors.background }}
              >
                AI
              </Text>
            </View>

            <View className="items-center gap-2">
              <Text
                className="text-3xl font-bold text-center"
                style={{ color: colors.foreground }}
              >
                InspecionAI
              </Text>
              <Text
                className="text-base text-center"
                style={{ color: colors.muted }}
              >
                Auditoria Remota Inteligente
              </Text>
            </View>

            {/* Status Indicator */}
            <View className="mt-4">
              <StatusIndicator status="online" label="Pronto para usar" />
            </View>
          </View>

          {/* Form Section */}
          <View className="gap-6">
            <View className="gap-4">
              <InspectionCodeInput
                value={inspectionCode}
                onChangeText={setInspectionCode}
                placeholder="Ex: AUDIT-2024-001"
                testID="inspection-code-input"
              />

              <View
                className="p-4 rounded-lg"
                style={{ backgroundColor: colors.surface }}
              >
                <Text
                  className="text-xs text-center"
                  style={{ color: colors.muted }}
                >
                  Insira o código único da inspeção fornecido pelo coordenador
                  para iniciar a videoconferência remota.
                </Text>
              </View>
            </View>

            <PrimaryButton
              onPress={handleStartInspection}
              title="Entrar na Videoconferência"
              loading={isLoading}
              disabled={isLoading}
              testID="start-inspection-button"
            />
          </View>

          {/* Footer */}
          <View className="items-center gap-2">
            <Text
              className="text-xs"
              style={{ color: colors.muted }}
            >
              InspecionAI v1.0.0
            </Text>
            <Text
              className="text-xs"
              style={{ color: colors.muted }}
            >
              Powered by Jitsi Meet
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
