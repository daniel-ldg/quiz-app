import { PlayerSessionProvider } from "@/context/PlayerSessionContext";
import type { AppProps } from "next/app";
import "../style/global.css";
import Navbar from "@/components/navbar/Navbar";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<PlayerSessionProvider>
			<Navbar />
			<Component {...pageProps} />
		</PlayerSessionProvider>
	);
};

export default App;
