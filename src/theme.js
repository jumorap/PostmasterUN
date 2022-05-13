import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: '#232323',
			strongRed: 'var(--redPrimary)',
			lightRed: 'var(--redTransparent)',
			gray: "#808080",
			color: 'white',
			white: "#fff",

		},
		secondary: {
			main: '#555',
		},
		error: {
			main: red.A400,
		},
		breakpoints: {
			values: {
			  xs: 0,
			  sm: 600,
			  md: 700,
			  lg: 1200,
			  xl: 1536,
			},
		},
	},
});

export default theme;
