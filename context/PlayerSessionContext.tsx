import { Player } from "@prisma/client";
import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const PLAYER_PROFILE_KEY = "session";

interface PlayerSessionContext {
	player?: Player;
	isLoading: boolean;
	setPlayer: (player: Omit<Player, "id">) => void;
}

export const PlayerSession = React.createContext<PlayerSessionContext | null>(null);

export const PlayerSessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [playerState, setPlayerState] = useState<PlayerSessionContext["player"]>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const foundPlayer = localStorage.getItem(PLAYER_PROFILE_KEY);

		try {
			const playerObject: PlayerSessionContext["player"] = JSON.parse(foundPlayer!);
			setPlayerState(playerObject);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const setPlayer: PlayerSessionContext["setPlayer"] = player => {
		const id = playerState?.id || uuidv4();
		const newPlayer = { id, ...player };
		setPlayerState(newPlayer);
		localStorage.setItem(PLAYER_PROFILE_KEY, JSON.stringify(newPlayer));
	};

	return (
		<PlayerSession.Provider value={{ player: playerState, isLoading, setPlayer }}>
			{children}
		</PlayerSession.Provider>
	);
};

export const usePlayerSession = () => {
	const context = useContext(PlayerSession);

	if (!context) {
		throw new Error("usePlayerSession must be used inside the PlayerSessionProvider");
	}

	return context;
};
