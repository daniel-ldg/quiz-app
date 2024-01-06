import { SocketCtx } from "@/context/SocketContext";
import { useContext, useState } from "react";
import { useEffectOnce } from "../useEffectOnce";

export const useIsHost = () => {
	const [isHost, setIsHost] = useState(false);
	const context = useContext(SocketCtx);

	if (context === null) {
		throw new Error("useIsHost must be used within a SocketCtxProvider");
	}

	const { socket, isConnected } = context;

	// retive player host status on connection
	useEffectOnce(() => {
		socket?.emit("getIsHost", setIsHost);
	}, isConnected);

	return { isHost };
};
