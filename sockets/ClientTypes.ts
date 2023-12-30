import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "./EventTypes";

export type GameClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
