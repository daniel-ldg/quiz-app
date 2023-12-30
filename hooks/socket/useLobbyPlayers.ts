import { SocketCtx } from "@/context/SocketContext";
import { PlayerUpdateType, ServerToClientEvents } from "@/sockets/EventTypes";
import { Player } from "@prisma/client";
import { useCallback, useContext, useEffect, useState } from "react";
import { useEffectOnce } from "../useEffectOnce";

interface UseLobbyPlayersCallbacks {
	onPlayerEvent?: (player: Player, type: PlayerUpdateType) => any;
	onPlayerJoin?: (player: Player) => any;
	onPlayerLeft?: (player: Player) => any;
	onPlayerReconnected?: (player: Player) => any;
	onPlayerUpdatedProfile?: (player: Player) => any;
}

export const useLobbyPlayers = (callbacks: UseLobbyPlayersCallbacks = {}) => {
	const { onPlayerEvent, onPlayerJoin, onPlayerLeft, onPlayerReconnected, onPlayerUpdatedProfile } = callbacks;
	const context = useContext(SocketCtx);
	const [lobbyPlayers, setLobbyPlayers] = useState<Array<Player>>([]);

	if (context === null) {
		throw new Error("useLobbyPlayers must be used within a SocketCtxProvider");
	}

	const { socket, isConnected } = context;

	// handle lobby update events
	const lobbyPlayersUpdateHandler: ServerToClientEvents["lobbyPlayersUpdate"] = useCallback(
		({ players, update }) => {
			setLobbyPlayers(players);
			onPlayerEvent && onPlayerEvent(update.player, update.type);
			switch (update.type) {
				case PlayerUpdateType.join:
					onPlayerJoin && onPlayerJoin(update.player);
					break;
				case PlayerUpdateType.left:
					onPlayerLeft && onPlayerLeft(update.player);
					break;
				case PlayerUpdateType.reconect:
					onPlayerReconnected && onPlayerReconnected(update.player);
				case PlayerUpdateType.updateProfile:
					onPlayerUpdatedProfile && onPlayerUpdatedProfile(update.player);
					break;
				default:
					break;
			}
		},
		[onPlayerEvent, onPlayerJoin, onPlayerLeft, onPlayerReconnected, onPlayerUpdatedProfile]
	);

	useEffect(() => {
		if (socket) {
			socket.on("lobbyPlayersUpdate", lobbyPlayersUpdateHandler);
			return () => {
				socket.off("lobbyPlayersUpdate", lobbyPlayersUpdateHandler);
			};
		}
	}, [lobbyPlayersUpdateHandler, socket]);

	// retive lobby players on join
	useEffectOnce(() => {
		socket?.emit("getLobbyPlayers", ({ players }) => {
			setLobbyPlayers(players);
		});
	}, isConnected);

	return { lobbyPlayers };
};
