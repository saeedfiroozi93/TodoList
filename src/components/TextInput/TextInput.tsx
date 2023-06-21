import { TextInput as MantineTextInput } from "@mantine/core";
import { TextInputProps as MantineTextInputProps } from "@mantine/core";

const TextInput = ({
  placeholder,
  icon,
  ...otherProps
}: MantineTextInputProps) => {
  return (
    <MantineTextInput
      styles={() => ({
        input: {
          fontSize: "16px",
          border: "1px solid #AAAAAA80",
          backgroundColor: "#F0F1F3",
          textAlign: "right",
          ":focus": {
            border: "1px solid #AAAAAAff",
          },
          height: "50px",
        },
      })}
      {...otherProps}
      placeholder={placeholder}
      icon={icon}
    />
  );
};

export default TextInput;
