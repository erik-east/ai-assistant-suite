import React from "react";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

import { ChevronsUpDown } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Items = any[];

interface ComboboxProps {
  id: string;
  items: Items;
  comboboxClass: string;
  popoverClass: string;
  selectedItem: string;
  inputValue: string;
  isDropdownOpen: boolean;
  notFoundLabel?: string;
  placeholder?: string;
  setIsDropdownOpen: (value: boolean) => void;
  onSelect?: (value: string) => void;
  onInputChange?: (search: string) => void;
  renderOptions?: (items: Items) => JSX.Element[] | JSX.Element;
}

export const Combobox: React.FC<ComboboxProps> = ({
  id,
  items,
  comboboxClass,
  popoverClass,
  selectedItem,
  inputValue,
  isDropdownOpen,
  notFoundLabel,
  placeholder,
  setIsDropdownOpen,
  onSelect,
  onInputChange,
  renderOptions,
}) => {
  const defaultRenderOptions = (items: Items) =>
    items.map((item, index) => (
      <CommandItem key={index} onSelect={onSelect}>
        {item}
      </CommandItem>
    ));

  return (
    <Popover open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={isDropdownOpen}
          className={comboboxClass}
        >
          {selectedItem ? selectedItem : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={popoverClass}>
        <Command shouldFilter={false}>
          <CommandInput
            className="uppercase"
            value={inputValue}
            onValueChange={onInputChange}
            placeholder={placeholder ? placeholder : "Please type to search."}
          />
          <CommandEmpty>
            {notFoundLabel ? notFoundLabel : "Item not found."}
          </CommandEmpty>
          {renderOptions ? renderOptions(items) : defaultRenderOptions(items)}
        </Command>
      </PopoverContent>
    </Popover>
  );
};
