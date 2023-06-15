import React from "react";

import { Label } from "@radix-ui/react-label";
import Select, { StylesConfig } from "react-select";
import { type StateManagerProps } from "react-select/dist/declarations/src/stateManager";

interface SelectWithLabelProps extends StateManagerProps {
  id?: string;
  labelClass: string;
  selectClass?: string;
  label: string;
}

const colorStyles: StylesConfig = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isFocused
        ? "#ebf2f5"
        : undefined,
      color: isDisabled
        ? '#aaa'
        : "black",
      cursor: isDisabled ? 'not-allowed' : isFocused ? "pointer" : 'default',
      fontSize: "14px",
      padding: "4px"
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "#feefff",
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#946a9b",
    fontWeight: "bold"
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "#a9a9a9",
    ':hover': {
      backgroundColor: "#f5bcea",
      color: '#dc7c7c',
    },
  }),
};

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
    <Select
      id={id}
      className={selectClass}
      styles={colorStyles}
      {...selectProps} />
  </>
);
