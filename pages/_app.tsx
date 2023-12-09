import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
	/** Put your mantine theme override here */
});

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<MantineProvider theme={theme}>
			<Component {...pageProps} />
		</MantineProvider>
	);
};

export default App;
