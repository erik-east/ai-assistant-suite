import {
  Command as CommandComponent,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { type Meta, type StoryFn } from "@storybook/react";

export default {
  title: "UI/Components/Command",
  component: CommandComponent,
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
} as Meta<typeof CommandComponent>;

const commandItems = ["Option 1", "Option 2", "Option 3"];

const TemplateOpen: StoryFn<typeof CommandComponent> = (args) => (
  <CommandComponent {...args}>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup>
        {commandItems.map((item, index) => (
          <CommandItem
            key={`${index}-${item}`}
            onSelect={(currentValue) => console.log(currentValue)}
          >
            {item}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  </CommandComponent>
);
const TemplateClosed: StoryFn<typeof CommandComponent> = (args) => (
  <CommandComponent {...args}>
    <CommandInput placeholder="Type a command or search..." />
  </CommandComponent>
);

export const CommandTemplateOpen = TemplateOpen.bind({});
export const CommandTemplateClosed = TemplateClosed.bind({});
