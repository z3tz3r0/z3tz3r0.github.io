import type { ChangeEvent, ReactElement } from "react";
import { Input, TextArea } from "@heroui/react";

const TEXTAREA_ROWS = 4;

interface InputContactProps {
  className?: string;
  label: string;
  name: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  type: string;
  value?: string;
}

const InputContact = ({
  className,
  label,
  name,
  onChange,
  type,
  value,
}: InputContactProps): ReactElement => {
  let inputElement: ReactElement = (
    <Input
      aria-label={label}
      id={name}
      name={name}
      onChange={onChange}
      placeholder={label}
      type={type}
      value={value}
    />
  );
  if (type === "textarea") {
    inputElement = (
      <TextArea
        aria-label={label}
        id={label.toLowerCase()}
        name={name}
        onChange={onChange}
        placeholder={label}
        rows={TEXTAREA_ROWS}
        value={value}
      />
    );
  }

  return (
    <div className={`flex flex-col gap-2 mb-8 ${className ?? ""}`}>
      {inputElement}
    </div>
  );
};

export { InputContact };
