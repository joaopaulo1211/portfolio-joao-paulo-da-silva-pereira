import { View, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface StatusIndicatorProps {
  status: "online" | "offline" | "connecting";
  label?: string;
}

export function StatusIndicator({ status, label }: StatusIndicatorProps) {
  const colors = useColors();

  const statusConfig = {
    online: {
      color: colors.success,
      label: label || "Conectado",
    },
    offline: {
      color: colors.error,
      label: label || "Desconectado",
    },
    connecting: {
      color: colors.warning,
      label: label || "Conectando...",
    },
  };

  const config = statusConfig[status];

  return (
    <View className="flex-row items-center gap-2">
      <View
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      <Text
        className="text-xs font-medium"
        style={{ color: config.color }}
      >
        {config.label}
      </Text>
    </View>
  );
}
