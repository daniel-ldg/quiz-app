import { Player } from "@prisma/client";
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents } from "./EventTypes";

export interface SocketData {
	lobbyId: string;
	player: Player;
	publicPlayerId: string;
	isHost: boolean;
}

export type GameServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

export type GameServerSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
