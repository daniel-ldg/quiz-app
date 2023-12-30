import { usePrevious } from "@/hooks/usePrevious";
import { GameClientSocket } from "@/sockets/ClientTypes";
import React, { PropsWithChildren, useEffect, useState } from "react";
import io from "socket.io-client";
import { usePlayerSession } from "./PlayerSessionContext";
import { z } from "zod";
import { queryValidation } from "@/pages/api/socket";
import { useDelayedToggle } from "@/hooks/useDelayedToggle";

const GAME_SOCKET_SERVER_URL = "/api/socket";

export interface SocketContext {
	socket?: GameClientSocket;
	isConnected: boolean;
}

export const SocketCtx = React.createContext<SocketContext | null>(null);

export interface SocketCtxOptions extends PropsWithChildren {
	lobbyId: string;
}

export const SocketCtxProvider: React.FC<SocketCtxOptions> = ({ lobbyId, children }) => {
	const { player, isLoading } = usePlayerSession();
	const prevStatePlayer = usePrevious(player);
	const [socket, setSocket] = useState<GameClientSocket>();
	const {
		value: isConnected,
		setTrue: onConnect,
		setFalse: onDisconnect,
	} = useDelayedToggle({ initialState: false, delayFalse: 0, delayTrue: 200 });

	// Conexión Inicial
	useEffect(() => {
		if (isLoading || !player) {
			return;
		}
		const query: z.infer<typeof queryValidation> = {
			lobbyId,
			playerId: player.id,
			playerAvatar: player.avatar,
			playerColor: player.color,
			playerName: player.name,
		};
		const newSocket: GameClientSocket = io({ path: GAME_SOCKET_SERVER_URL, query, autoConnect: false });

		newSocket.on("connect", onConnect);
		newSocket.on("disconnect", onDisconnect);

		newSocket.connect();

		setSocket(newSocket);

		return () => {
			newSocket.off("connect", onConnect);
			newSocket.off("disconnect", onDisconnect);
			newSocket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	// send player profile changes on change
	useEffect(() => {
		if (socket) {
			if (prevStatePlayer && player) {
				const { avatar: prevAvatar, color: prevColor, name: prevName } = prevStatePlayer;
				const { avatar, color, name } = player;
				if (prevAvatar !== avatar || prevColor !== color || prevName !== name) {
					socket.emit("updateProfile", { avatar, color, name });
				}
			}
		}
	}, [socket, player, prevStatePlayer]);

	return <SocketCtx.Provider value={{ socket, isConnected }}>{children}</SocketCtx.Provider>;
};
