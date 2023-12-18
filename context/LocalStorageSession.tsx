import { Player } from "@prisma/client";
import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_SESSION_KEY = "session";

interface SessionContextType {
	player?: Player;
	isLoading: boolean;
	setPlayer: (player: Omit<Player, "id">) => void;
}

export const SessionContext = React.createContext<SessionContextType | null>(null);

export const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [loadedPlayer, setLoadedPlayer] = useState<SessionContextType["player"]>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const foundPlayer = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);

		try {
			const playerObject: SessionContextType["player"] = JSON.parse(foundPlayer!);
			setLoadedPlayer(playerObject);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const setPlayer: SessionContextType["setPlayer"] = player => {
		const id = loadedPlayer?.id || uuidv4();
		const newPlayer = { id, ...player };
		setLoadedPlayer(newPlayer);
		localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(newPlayer));
	};

	return (
		<SessionContext.Provider value={{ player: loadedPlayer, isLoading, setPlayer }}>
			{children}
		</SessionContext.Provider>
	);
};

export const useSessionContext = () => {
	const context = useContext(SessionContext);

	if (!context) {
		throw new Error("usePlayerContext must be used inside the SessionProvider");
	}

	return context;
};
