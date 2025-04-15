import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface InputContactProps {
    type: string;
    label: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const InputContact = ({
    type,
    label,
    value,
    onChange,
    className,
}: InputContactProps) => {
    return (
        <div className={`flex flex-col gap-2 mb-8 ${className}`}>
            <Label htmlFor={label.toLowerCase()}>{label}</Label>
            {type !== "textarea" ? (
                <Input
                    type={type}
                    value={value}
                    onChange={onChange}
                    id={label.toLowerCase()}
                />
            ) : (
                <Textarea value={value} id={label.toLowerCase()} />
            )}
        </div>
    );
};

export default InputContact;
