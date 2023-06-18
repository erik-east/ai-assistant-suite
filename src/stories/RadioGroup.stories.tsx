import { type Meta, type StoryFn } from "@storybook/react";

import {
  RadioGroup as RadioGroupComponent,
  RadioGroupItem,
} from "@/components/ui/RadioGroup";
import { Label } from "@radix-ui/react-label";

export default {
  title: "UI/Components/RadioGroupComponent",
  component: RadioGroupComponent,
  argTypes: {
    variant: {
      name: "variant",
      control: { type: "select" },
      description: "Variation of the button",
      options: ["default", "destructive", "outline", "subtle", "ghost", "link"],
      type: { name: "string", required: false },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      name: "size",
      control: { type: "radio" },
      description: "Size of the button",
      options: ["default", "sm", "lg"],
      type: { name: "string", required: false },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
  },
} as Meta<typeof RadioGroupComponent>;

const Template: StoryFn<typeof RadioGroupComponent> = () => (
  <RadioGroupComponent className="flex" defaultValue="option-one">
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="option-one" id="option-one" />
      <Label htmlFor="option-one">Option One</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="option-two" id="option-two" />
      <Label htmlFor="option-two">Option Two</Label>
    </div>
  </RadioGroupComponent>
);

export const RadioGroupStory = Template.bind({});
