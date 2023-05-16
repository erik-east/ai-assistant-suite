import { type Meta, type StoryFn } from '@storybook/react';

import { Button as ButtonComponent } from '../components/ui/Button';

export default {
	title: 'UI/Components/Button',
	component: ButtonComponent,
	argTypes: {
		variant: {
			name: 'variant',
			control: { type: 'select' },
			description: 'Variation of the button',
			options: [
				'default',
				'destructive',
				'outline',
				'subtle',
				'ghost',
				'link',
			],
			type: { name: 'string', required: false },
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'default' },
			},
		},
		size: {
			name: 'size',
			control: { type: 'radio' },
			description: 'Size of the button',
			options: ['default', 'sm', 'lg'],
			type: { name: 'string', required: false },
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'default' },
			},
		},
	},
} as Meta<typeof ButtonComponent>;

const Template: StoryFn<typeof ButtonComponent> = (args) => (
	<ButtonComponent {...args}>Button</ButtonComponent>
);

export const Button = Template.bind({});
Button.args = {
	variant: 'default',
};
