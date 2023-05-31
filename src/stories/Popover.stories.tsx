import {
  Popover as PopoverComponent,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { type Meta, type StoryFn } from "@storybook/react";

export default {
  title: "UI/Components/Popover",
  component: PopoverComponent,
  argTypes: {
    open: {
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disabled state of the input field",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onValueChange: { control: { type: "function" } },
    onSelect: {
      control: { type: "function" },
      description:
        "Callback method when the user picks a new value. Gets passed the `value`",
      table: {
        type: { summary: "function" },
        defaultValue: { summary: "(value) => void" },
      },
    },
  },
} as Meta<typeof PopoverComponent>;

const TemplateOpen: StoryFn<typeof PopoverComponent> = (args) => (
  <PopoverComponent {...args}>
    <PopoverTrigger>Open</PopoverTrigger>
    <PopoverContent>Place content for the popover here.</PopoverContent>
  </PopoverComponent>
);

export const CommandTemplateOpen = TemplateOpen.bind({});
