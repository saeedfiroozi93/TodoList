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
          border: "2px solid #AAAAAA80",
          backgroundColor: "#F0F1F3",
          textAlign: "right",
          ":focus": {
            border: "2px solid #134E4A",
          },
          height: "50px",
          "::placeholder" : {
            textAlign: 'right',
            color: '#616161'
          }
        },
      })}
      {...otherProps}
      placeholder={placeholder}
      icon={icon}
    />
  );
};

export default TextInput;
