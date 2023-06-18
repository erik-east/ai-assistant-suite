import React, { useMemo, useState } from "react";

import { CommandItem } from "@/components/ui/Command";

import { Label } from "@radix-ui/react-label";

import useDebounce from "@/services/hooks/use-debounce";

import locationExplorerHelper from "@/components/wanderlust-companion/location-explorer/location-explorer-helper";

import { Combobox } from "@/components/ui/Combobox";

import { type Location, locationsJson } from "@/constants/locations-json";

interface LocationExplorerProps {
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  label: string;
}

export const LocationExplorer: React.FC<LocationExplorerProps> = ({
  selectedLocation,
  setSelectedLocation,
  label,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = React.useState(false);

  const filteredLocations = useMemo(
    () =>
      locationExplorerHelper.getFilteredLocations(inputValue, locationsJson),
    [inputValue]
  );
  const debouncedLocations = useDebounce(filteredLocations, 300);

  const handleSelection = (value: string) => {
    setSelectedLocation(value);
    setOpen(false);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const renderDropdownOptions = () =>
    debouncedLocations?.length ? (
      debouncedLocations.map((location, index) => (
        <CommandItem
          className="xsm:w-full md:w-[250px]"
          key={index}
          onSelect={handleSelection}
        >
          {location.fullName}
        </CommandItem>
      ))
    ) : (
      <></>
    );

  return (
    <div className="grid items-center gap-1.5 xsm:w-full md:w-auto">
      <Label
        className="md:text-md px-1 text-left font-bold capitalize text-ct-teal-600 xsm:text-sm"
        htmlFor={label}
      >
        {label}
      </Label>
      <Combobox
        notFoundLabel="Location does not exist..."
        inputValue={inputValue}
        onInputChange={handleInputChange}
        id={label}
        selectedItem={selectedLocation.toUpperCase()}
        placeholder="Please search a location..."
        items={debouncedLocations as Location[]}
        onSelect={handleSelection}
        renderOptions={renderDropdownOptions}
        isDropdownOpen={open}
        setIsDropdownOpen={setOpen}
        comboboxClass="justify-between xsm:w-full md:w-[250px]"
        popoverClass="p-0 xsm:w-screen md:w-[250px]"
      />
    </div>
  );
};
