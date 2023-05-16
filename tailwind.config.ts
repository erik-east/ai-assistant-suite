/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

export const content = [
	'./src/app/**/*.{js,ts,jsx,tsx}',
	'./src/pages/**/*.{js,ts,jsx,tsx}',
	'./src/components/**/*.{js,ts,jsx,tsx}',
	'./src/stories/**/*.{js,ts,tsx,jsx}',
];
export const theme = {
	darkMode: ['class', '[data-theme="dark"]'],
	extend: {
		height: {
			"5p": "5%",
			"95p": "95%",
		},
		width: {
			"10": "10%",
			"90": "90%",
		},
		minHeight: {
			"30": "30px",
		},
		colors: {
			'ct-dark-600': '#222',
			'ct-dark-200': '#e5e7eb',
			'ct-dark-100': '#f5f6f7',
			'ct-blue-600': '#2363eb',
			'ct-yellow-600': '#f9d13e',
			'border': 'hsl(var(--border))',
			'input': 'hsl(var(--input))',
			'ring': 'hsl(var(--ring))',
			'background': 'hsl(var(--background))',
			'foreground': 'hsl(var(--foreground))',
			'primary': {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))',
			},
			'secondary': {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))',
			},
			'destructive': {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))',
			},
			'muted': {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))',
			},
			'accent': {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))',
			},
			'popover': {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))',
			},
			'card': {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))',
			},
		},
		fontFamily: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			sans: ['Poppins', defaultTheme.fontFamily.sans],
		},
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'lg': '1125px',
				'xl': '1125px',
				'2xl': '1125px',
			},
		},
	},
};
export const plugins = [require('tailwindcss-animate')];
