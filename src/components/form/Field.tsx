import { addSeparatorsToNumberString, masks } from "@/helpers";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Text, TextInput, TextInputProps } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface Props extends TextInputProps {
  children?: React.ReactNode;
  name: string;
  mask?: keyof typeof masks;
  number?: boolean;
  label?: string;
}

export const Field: React.FC<Props> = ({
  name,
  defaultValue = "",
  editable,
  onChangeText,
  number,
  mask,
  label,
  ...props
}) => {
  const color = useThemeColor({ dark: "#eee", light: "#111" }, "text");
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, defaultValue, disabled: editable });

  const handleChange = useCallback(
    (value: string) => {
      if (value && mask) value = masks[mask](value);

      if (number) {
        value = addSeparatorsToNumberString(value, ["."]);

        value = value.replace(/[^-0-9.]|(?<=.)-/g, "");
      }

      onChangeText?.(value);
      field?.onChange?.(value);
    },
    [onChangeText, field, mask, number]
  );

  return (
    <ThemedView>
      {!!label ? (
        <Text className="!text-white pt-4 pb-2 block">{label}</Text>
      ) : null}

      <TextInput
        {...props}
        {...field}
        onChangeText={handleChange}
        placeholderTextColor={color}
        className="form-field"
      />

      {error?.message ? (
        <ThemedText className="message-error">{error.message}</ThemedText>
      ) : null}
    </ThemedView>
  );
};
