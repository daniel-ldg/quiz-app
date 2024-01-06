import { PlayerSessionProvider } from "@/context/PlayerSessionContext";
import type { AppProps } from "next/app";
import "../style/global.css";
import Navbar from "@/components/navbar/Navbar";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<PlayerSessionProvider>
			<div className="flex flex-col h-full">
				<div>
					<Navbar />
				</div>
				<div className="grow">
					<Component {...pageProps} />
				</div>
			</div>
		</PlayerSessionProvider>
	);
};

export default App;
