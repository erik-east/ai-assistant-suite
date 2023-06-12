import React from "react";

import { Label } from "@radix-ui/react-label";
import { SelectDropdown } from "@/components/ui/Select";

interface DropdownWithLabelProps {
  id: string;
  labelClass: string;
  dropdownClassName: string;
  label: string;
  onSelect: (value: string | undefined) => void;
  options: {
    label: string;
    value: string;
  }[];
  selectedValue: string | undefined;
  placeholder: string;
}

export const DropdownWithLabel: React.FC<DropdownWithLabelProps> = ({
  id,
  dropdownClassName,
  label,
  labelClass,
  onSelect,
  options,
  placeholder,
  selectedValue,
}) => (
  <>
    <Label className={labelClass} htmlFor={id}>
      {label}
    </Label>
    <SelectDropdown
      id={id}
      dropdownClassName={dropdownClassName}
      onSelect={onSelect}
      options={options}
      selectedValue={selectedValue}
      placeholder={placeholder}
    />
  </>
);
