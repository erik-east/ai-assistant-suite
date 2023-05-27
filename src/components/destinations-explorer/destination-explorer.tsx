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

      return fullDestination.toUpperCase().includes(inputValue.toUpperCase());
    });
  }, [inputValue]);

  const debouncedDestinations = useDebounce(selectedDestinations, 500);
  console.log(
    "🚀 ~ file: destination-explorer.tsx:42 ~ DestinationExplorer ~ debouncedDestinations:",
    debouncedDestinations
  );

  const shouldRenderOptions =
    inputValue && debouncedDestinations && !isSelected;

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
          className="uppercase"
          value={inputValue}
          onValueChange={handleInputChange}
          placeholder="Please type destination..."
        />
        {shouldRenderOptions && (
          <CommandGroup className="max-h-[100px]">
            <CommandEmpty>No results found.</CommandEmpty>
            {debouncedDestinations.map((item) => (
              <CommandItem
                key={item.entityId}
                onSelect={handleSelection}
                value={`${item.name} ${item.iata && `(${item.iata})`}`}
              >
                {item.name.toUpperCase()}{" "}
                {item.iata && `(${item.iata.toUpperCase()})`}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </Command>
    </div>
  );
};
