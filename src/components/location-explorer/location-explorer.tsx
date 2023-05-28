import React, {
  type Dispatch,
  useMemo,
  useState,
  type SetStateAction,
} from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
import { ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";
import { Label } from "@radix-ui/react-label";

import useDebounce from "@/services/hooks/useDebounce";

import locationExplorerHelper from "@/components/location-explorer/location-explorer-helper";

import { locationsJson } from "@/constants/locations-json";
import { type Locations } from "@/components/location-explorer/types";

interface LocationExplorerProps {
  selectedLocation: string;
  setSelectedLocation: Dispatch<SetStateAction<string>>;
  label: string;
}

export const LocationExplorer: React.FC<LocationExplorerProps> = ({
  selectedLocation,
  setSelectedLocation,
  label,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [open, setOpen] = React.useState(false);

  const filteredLocations: Locations[] | null = useMemo(
    () => locationExplorerHelper.getLocations(inputValue, locationsJson),
    [inputValue]
  );
  const debouncedLocations = useDebounce(filteredLocations, 1000);

  const shouldRenderOptions = inputValue && debouncedLocations && !isSelected;

  const handleSelection = (value: string) => {
    setSelectedLocation(value);
    setIsSelected(true);
    setOpen(false);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsSelected(false);
  };

  return (
    <div className="grid items-center gap-1.5 xsm:w-full md:w-auto">
      <Label className="px-1 capitalize" htmlFor={label}>
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={label}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between xsm:w-full md:w-[230px]"
          >
            {selectedLocation
              ? selectedLocation.toUpperCase()
              : "Please Select Location"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 xsm:w-screen md:w-[230px]">
          <Command shouldFilter={false}>
            <CommandInput
              className="uppercase"
              value={inputValue}
              onValueChange={handleInputChange}
              placeholder="Please type location..."
            />
            <CommandEmpty>Location does not exist...</CommandEmpty>
            {shouldRenderOptions && (
              <CommandGroup>
                {debouncedLocations.map((location) => (
                  <CommandItem
                    key={location.entityId}
                    onSelect={handleSelection}
                  >
                    {locationExplorerHelper.getPlaceFullName(location)}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
