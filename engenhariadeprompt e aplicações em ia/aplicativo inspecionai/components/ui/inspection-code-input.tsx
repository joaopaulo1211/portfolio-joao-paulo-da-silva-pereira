import { TextInput, View, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface InspectionCodeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  testID?: string;
}

export function InspectionCodeInput({
  value,
  onChangeText,
  placeholder = "Ex: AUDIT-2024-001",
  testID,
}: InspectionCodeInputProps) {
  const colors = useColors();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="gap-2">
      <Text
        className="text-sm font-medium"
        style={{ color: colors.foreground }}
      >
        Código de Inspeção
      </Text>
      <TextInput
        testID={testID}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: isFocused ? colors.primary : colors.border,
          backgroundColor: colors.background,
          color: colors.foreground,
          fontSize: 16,
          fontFamily: "System",
        }}
        returnKeyType="done"
      />
    </View>
  );
}
