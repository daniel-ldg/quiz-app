import { SessionProvider } from "@/context/LocalStorageSession";
import type { AppProps } from "next/app";
import "../style/global.css";
import Navbar from "@/components/navbar/Navbar";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<SessionProvider>
			<Navbar />
			<Component {...pageProps} />
		</SessionProvider>
	);
};

export default App;
