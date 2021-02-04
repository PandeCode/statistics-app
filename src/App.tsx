import React from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Home } from "./components/Home";

interface AppProps {}

const theme = createMuiTheme({
	palette: {
		type: "dark",
	},
});

function App({}: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Home />
		</ThemeProvider>
	);
}

export default App;
