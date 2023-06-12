import React from "react";

import { Label } from "@radix-ui/react-label";
import Select from "react-select";
import { type StateManagerProps } from "react-select/dist/declarations/src/stateManager";

interface SelectWithLabelProps extends StateManagerProps {
  id?: string;
  labelClass: string;
  selectClass?: string;
  label: string;
}

export const SelectWithLabel: React.FC<SelectWithLabelProps> = ({
  id,
  label,
  labelClass,
  selectClass,
  ...selectProps
}) => (
  <>
    <Label className={labelClass} htmlFor={id}>
      {label}
    </Label>
    <Select id={id} className={selectClass} {...selectProps} />
  </>
);
