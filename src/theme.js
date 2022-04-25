import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: '#232323',
			strongRed: "#FF2525",
			lightRed: "#ff9292",
		},
		secondary: {
			main: '#555',
		},
		error: {
			main: red.A400,
		},
	},
});

export default theme;
