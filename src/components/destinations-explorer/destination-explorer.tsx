import React, { useMemo, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
import { destinationsJson } from "@/constants/destinations-json";
import useDebounce from "@/services/hooks/useDebounce";

interface Destinations {
  entityId: string;
  parentId: string;
  name: string;
  type: string;
  iata: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export const DestinationExplorer = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const selectedDestinations: Destinations[] | null = useMemo(() => {
    if (!inputValue) {
      return null;
    }
    return destinationsJson.filter((destination) => {
      const fullDestination = `${destination.name} (${
        destination.iata ? destination.iata : "CITY"
      })`;

      return fullDestination.toLowerCase().includes(inputValue.toLowerCase());
    });
  }, [inputValue]);

  const debouncedVal = useDebounce(selectedDestinations, 500);

  const shouldRenderOptions = inputValue && debouncedVal && !isSelected;

  const handleSelection = (value: string) => {
    console.log(
      "🚀 ~ file: destination-explorer.tsx:46 ~ handleSelection ~ value:",
      value
    );
    setInputValue(value);
    setIsSelected(true);
  };
  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsSelected(false);
  };

  return (
    <div className="container flex flex-row items-center justify-center gap-8 px-4 py-8">
      <Command shouldFilter={false} className="w-80">
        <CommandInput
          value={inputValue}
          onValueChange={handleInputChange}
          placeholder="Please type destination..."
        />
        {shouldRenderOptions && (
          <CommandGroup className="max-h-[100px]">
            <CommandEmpty>No results found.</CommandEmpty>
            {debouncedVal.map((item) => (
              <CommandItem
                key={item.entityId}
                onSelect={(currentValue) => handleSelection(currentValue)}
              >
                {item.name} {item.iata && `(${item.iata})`}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </Command>
    </div>
  );
};
