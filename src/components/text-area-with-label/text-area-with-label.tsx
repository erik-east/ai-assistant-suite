import { TextArea } from "@/components/ui/TextArea";
import { Label } from "@radix-ui/react-label";
import React from "react";

interface TextareaWithLabelProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  labelClass?: string;
  textAreaClass?: string;
}

export const TextareaWithLabel: React.FC<TextareaWithLabelProps> = ({
  label,
  id,
  labelClass,
  textAreaClass,
  ...args
}) => (
  <div className="grid w-full gap-1.5">
    <Label className={labelClass} htmlFor={id}>
      {label}
    </Label>
    <TextArea className={textAreaClass} id={id} {...args} />
  </div>
);
