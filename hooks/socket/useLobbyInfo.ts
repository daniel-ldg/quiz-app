import { SocketCtx } from "@/context/SocketContext";
import { useContext, useState } from "react";
import { useEffectOnce } from "../useEffectOnce";
import { LobbyInfo } from "@/sockets/EventTypes";

const useLobbyInfo = () => {
	const [lobbyInfo, setLobbyInfo] = useState<LobbyInfo | undefined | null>();
	const context = useContext(SocketCtx);

	if (context === null) {
		throw new Error("useLobbyInfo must be used within a SocketCtxProvider");
	}

	const { socket, isConnected } = context;

	// retive lobby info on socket connection
	useEffectOnce(() => {
		socket?.emit("getLobbyInfo", setLobbyInfo);
	}, isConnected);

	return { lobbyInfo, isWaiting: lobbyInfo === undefined, isError: lobbyInfo === null };
};

export default useLobbyInfo;
