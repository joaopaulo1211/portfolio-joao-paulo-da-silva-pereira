import { Pressable, Text, View } from "react-native";
import { cn } from "@/lib/utils";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

interface PrimaryButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
}

export function PrimaryButton({
  onPress,
  title,
  disabled = false,
  loading = false,
  testID,
}: PrimaryButtonProps) {
  const colors = useColors();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      testID={testID}
      style={({ pressed }) => ({
        opacity: pressed || disabled ? 0.7 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
      })}
    >
      <View
        className={cn(
          "h-14 rounded-xl items-center justify-center",
          disabled ? "opacity-50" : ""
        )}
        style={{ backgroundColor: colors.primary }}
      >
        <Text
          className="text-base font-semibold"
          style={{ color: colors.background }}
        >
          {loading ? "Carregando..." : title}
        </Text>
      </View>
    </Pressable>
  );
}
