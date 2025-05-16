import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

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

const InputContact = ({
  type,
  label,
  name,
  value,
  onChange,
  className,
}: InputContactProps) => {
  return (
    <div className={`flex flex-col gap-2 mb-8 ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      {type !== "textarea" ? (
        <Input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Textarea
          id={label.toLowerCase()}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default InputContact;
