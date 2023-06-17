import { TextArea as TextAreaComponent } from "@/components/ui/TextArea";
import { type Meta, type StoryFn } from "@storybook/react";

export default {
  title: "UI/Components/TextAreaComponent",
  argTypes: {
    placeholder: { control: "text" },
  },
} as Meta<typeof TextAreaComponent>;

const Template: StoryFn<typeof TextAreaComponent> = (args) => (
  <TextAreaComponent placeholder="Type your message here." />
);

export const TextArea = Template.bind({});
