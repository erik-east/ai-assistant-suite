/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type StoryFn, type Meta } from '@storybook/react';
import { Select as SelectComponent } from '@/components/ui/Select';
import { SelectContent } from '@/components/ui/Select';
import { SelectItem } from '@/components/ui/Select';
import { SelectGroup } from '@/components/ui/Select';
import { SelectLabel } from '@/components/ui/Select';
import { SelectSeparator } from '@/components/ui/Select';
import { SelectTrigger } from '@/components/ui/Select';
import { SelectValue } from '@/components/ui/Select';

export default {
	title: 'UI/Components/Select',
	component: SelectComponent,
	argTypes: {
		open: {
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Disabled state of the input field',
			type: { name: 'boolean', required: false },
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		required: {
			control: { type: 'boolean' },
			description: 'Required state of the select field',
			type: { name: 'boolean', required: false },
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		position: {
			control: { type: 'radio' },
			description: 'How to position the menu in relation to the trigger',
			options: ['item-aligned', 'popper'],
			type: { name: 'string', required: false },
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'item-aligned' },
			},
		},
		side: {
			control: { type: 'select' },
			description:
				'Where to position the menu in relation to the trigger. Only works when `position` is set to `popper`',
			options: ['top', 'right', 'bottom', 'left'],
			type: { name: 'string', required: false },
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'bottom' },
			},
		},
		onValueChange: {
			control: { type: 'function' },
			description:
				'Callback method when the user picks a new value. Gets passed the `value`',
			table: {
				type: { summary: 'function' },
				defaultValue: { summary: '(value) => void' },
			},
		},
		value: {
			name: 'value',
			control: { type: 'text' },
			description: 'The value of the select field',
			type: { name: 'string', required: false },
			table: {
				type: { summary: 'text' },
				defaultValue: { summary: '' },
			},
		},
	},
} as Meta<typeof SelectComponent>;

const Template: StoryFn<typeof SelectComponent> = (args) => (
	<SelectComponent {...args}>
		<SelectTrigger className="w-[180px]">
			<SelectValue placeholder="Select a Fruit" />
		</SelectTrigger>
		<SelectContent>
			<SelectItem value="apple">Apple</SelectItem>
			<SelectItem value="orange">Orange</SelectItem>
			<SelectItem value="donkey">Donkey</SelectItem>
		</SelectContent>
	</SelectComponent>
);

export const WithoutGroups = Template.bind({});

const TemplateGrouping: StoryFn<typeof SelectComponent> = (args) => (
	<SelectComponent {...args}>
		<SelectTrigger className="w-[180px]">
			<SelectValue placeholder="Select a Fruit" />
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<SelectLabel>Stone Fruit</SelectLabel>
				<SelectItem value="peach">Peach</SelectItem>
				<SelectItem value="nectarine">Nectarine</SelectItem>
			</SelectGroup>
			<SelectSeparator />
			<SelectGroup>
				<SelectLabel>Citrus</SelectLabel>
				<SelectItem value="orange">Orange</SelectItem>
				<SelectItem value="lemon">Lemon</SelectItem>
			</SelectGroup>
		</SelectContent>
	</SelectComponent>
);

export const WithGroups = TemplateGrouping.bind({});
