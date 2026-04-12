import { Input, TextArea } from "@heroui/react";
import type React from "react";

interface InputContactProps {
  type: string;
  label: string;
  name: string;
  value?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  className?: string;
}

function InputContact({
  type,
  label,
  name,
  value,
  onChange,
  className,
}: InputContactProps) {
  return (
    <div className={`flex flex-col gap-2 mb-8 ${className}`}>
      {type !== "textarea" ? (
        <Input
          type={type}
          id={name}
          name={name}
          aria-label={label}
          placeholder={label}
          value={value}
          onChange={onChange}
        />
      ) : (
        <TextArea
          id={label.toLowerCase()}
          name={name}
          aria-label={label}
          placeholder={label}
          value={value}
          onChange={onChange}
          rows={4}
        />
      )}
    </div>
  );
}

export default InputContact;
