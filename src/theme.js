import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: '#f1302b',
		},
		secondary: {
			main: '#FF2525',
		},
		error: {
			main: red.A400,
		},
	},
});

export default theme;
