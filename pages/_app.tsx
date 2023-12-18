import { SessionProvider } from "@/context/LocalStorageSession";
import type { AppProps } from "next/app";
import "../style/global.css";

const App = ({ Component, pageProps }: AppProps) => {
		<SessionProvider>
			<Component {...pageProps} />
		</SessionProvider>
	);
};

export default App;
