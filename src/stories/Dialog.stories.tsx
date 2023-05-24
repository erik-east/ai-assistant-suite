import {
  Dialog as DialogComponent,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { type Meta, type StoryFn } from "@storybook/react";

export default {
  title: "UI/Components/Dialog",
  component: DialogComponent,
  argTypes: {
    variant: {
      name: "variant",
      control: { type: "select" },
      description: "Variation of the Dialog",
      options: ["default"],
      type: { name: "string", required: false },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      name: "size",
      control: { type: "radio" },
      description: "Size of the Dialog",
      options: ["default"],
      type: { name: "string", required: false },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
  },
} as Meta<typeof DialogComponent>;

const Template: StoryFn<typeof DialogComponent> = () => (
  <Dialog>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

export const Dialog = Template.bind({});
