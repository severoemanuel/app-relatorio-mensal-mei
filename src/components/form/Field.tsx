import { addSeparatorsToNumberString, masks } from "@/helpers";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";
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
  const bgColor = useThemeColor(
    { dark: "#212121", light: "#eee4" },
    "background"
  );
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
        <ThemedText className="pt-4 pb-2 block">{label}</ThemedText>
      ) : null}

      <TextInput
        {...props}
        {...field}
        onChangeText={handleChange}
        style={{ backgroundColor: bgColor }}
        placeholderTextColor={color}
        className="form-field"
      />

      {error?.message ? (
        <ThemedText className="message-error">{error.message}</ThemedText>
      ) : null}
    </ThemedView>
  );
};
