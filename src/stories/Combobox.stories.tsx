import { Combobox as ComboboxComponent } from "@/components/ui/Combobox";
import { type Meta, type StoryFn } from "@storybook/react";
import { useMemo, useState } from "react";

export default {
  title: "UI/Components/Combobox",
  component: ComboboxComponent,
  argTypes: {
    open: {
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
} as Meta<typeof ComboboxComponent>;

const comboboxItems = ["Option 1", "Option 2", "Option 3"];

const TemplateOpen: StoryFn<typeof ComboboxComponent> = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [open, setOpen] = useState(false);

  const filteredItems = useMemo(() => {
    return comboboxItems.filter((item) =>
      item.toUpperCase().includes(inputValue.toUpperCase())
    );
  }, [inputValue]);

  const handleSelection = (value: string) => {
    setSelectedItem(value);
    setOpen(false);
  };

  return (
    <ComboboxComponent
      id="combobox"
      notFoundLabel="Element does not exist"
      inputValue={inputValue}
      comboboxClass="justify-between xsm:w-full md:w-[300px]"
      popoverClass="p-0 xsm:w-screen md:w-[300px]"
      isDropdownOpen={open}
      items={filteredItems}
      onInputChange={setInputValue}
      placeholder="Please type input to search"
      onSelect={handleSelection}
      selectedItem={selectedItem}
      setIsDropdownOpen={setOpen}
    />
  );
};

export const ComboboxTemplateOpen = TemplateOpen.bind({});
