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

import useDebounce from "@/services/hooks/useDebounce";

import destinationExplorerHelper from "@/components/destinations-explorer/destination-explorer-helper";

import { destinationsJson } from "@/constants/destinations-json";
import { type Destinations } from "@/components/destinations-explorer/types";

interface DestinationExplorerProps {
  selectedLocation: string;
  setSelectedLocation: Dispatch<SetStateAction<string>>;
}

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  selectedLocation,
  setSelectedLocation,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [open, setOpen] = React.useState(false);

  const filteredLocations: Destinations[] | null = useMemo(
    () => destinationExplorerHelper.getLocations(inputValue, destinationsJson),
    [inputValue]
  );
  const debouncedLocations = useDebounce(filteredLocations, 500);

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
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-auto min-w-80 justify-between"
          >
            {selectedLocation
              ? selectedLocation.toUpperCase()
              : "Please Select Location"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Command shouldFilter={false} className="w-80">
            <CommandInput
              className="uppercase"
              value={inputValue}
              onValueChange={handleInputChange}
              placeholder="Please type destination..."
            />
            <CommandEmpty>Location does not exist...</CommandEmpty>
            {shouldRenderOptions && (
              <CommandGroup>
                {debouncedLocations.map((destination) => (
                  <CommandItem
                    key={destination.entityId}
                    onSelect={handleSelection}
                  >
                    {destinationExplorerHelper.getPlaceFullName(destination)}
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
