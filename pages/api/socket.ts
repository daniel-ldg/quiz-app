import { PlayerUpdateType, ServerDisconnectReason } from "@/sockets/EventTypes";
import { startMatch } from "@/sockets/Match";
import prisma from "@/store/PrismaInstance";
import { Avatar, Color } from "@prisma/client";
import { NextApiHandler } from "next";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import isMongoId from "validator/lib/isMongoId";
import { z } from "zod";
import { GameServer, GameServerSocket } from "../../sockets/ServerTypes";

const handler: NextApiHandler = async (_, res) => {
	if (!(res.socket as any).server.io) {
		console.log("*First use, starting socket.io");

		const io = new Server((res.socket as any).server, {
			path: "/api/socket",
			connectionStateRecovery: {
				// the backup duration of the sessions and the packets
				maxDisconnectionDuration: 2 * 60 * 1000,
				// whether to skip middlewares upon successful recovery
				skipMiddlewares: true,
			},
		}) as GameServer;

		io.on("connection", async socket => {
			console.log(`${socket.id} connected`);

			if (socket.recovered) {
				// socket.io successfully recovered id and data atributes
				socket.join(socket.data.lobbyId);
				emitRoomPlayerUpdate(io, socket, PlayerUpdateType.reconect);
			} else {
				// validate query
				const queryValidated = queryValidation.safeParse(socket.handshake.query);
				if (!queryValidated.success) {
					disconnectSocket(socket, ServerDisconnectReason.unexpectedHandshakeQuery);
					return;
				}
				const query = queryValidated.data;
				// get lobby data
				// gameResult is set on gameEnd so if exists the game has ended
				const lobby = await prisma.lobby.findUnique({
					where: { id: query.lobbyId, gameResult: { isSet: false } },
					select: { hostId: true, inviteCode: true },
				});
				if (!lobby) {
					disconnectSocket(socket, ServerDisconnectReason.lobbyNotFound);
					return;
				}
				// allow only one socket per player on lobby
				const socketsInLobby = await io.in(query.lobbyId).fetchSockets();
				const socketSamePlayerId = socketsInLobby.find(
					socketInLobby => socketInLobby.data.player.id === query.playerId
				);
				if (socketSamePlayerId) {
					disconnectSocket(socket, ServerDisconnectReason.playerIdAlreadyInLobby);
					return;
				}
				// setup socket data atributes
				socket.data.lobbyId = query.lobbyId;
				socket.data.isHost = lobby.hostId === query.playerId;
				socket.data.player = {
					id: query.playerId,
					avatar: query.playerAvatar,
					color: query.playerColor,
					name: query.playerName,
				};
				// new public id used to identify to other players
				socket.data.publicPlayerId = uuidv4();
				socket.join(query.lobbyId);
				emitRoomPlayerUpdate(io, socket, PlayerUpdateType.join);
			}

			socket.on("updateProfile", ({ name, avatar, color }) => {
				socket.data.player.name = name;
				socket.data.player.avatar = avatar;
				socket.data.player.color = color;
				emitRoomPlayerUpdate(io, socket, PlayerUpdateType.updateProfile);
			});

			socket.on("hostStartMatch", () => {
				const { isHost, lobbyId } = socket.data;
				if (isHost) {
					startMatch(io, lobbyId);
				}
			});

			socket.on("getLobbyPlayers", async response => {
				const socketInLobby = await io.in(socket.data.lobbyId).fetchSockets();

				const players = socketInLobby
					.filter(socketInLobby => socketInLobby.id !== socket.id)
					.map(({ data: { publicPlayerId: id, player } }) => ({ ...player, id }));

				response({ players });
			});

			socket.on("disconnecting", () => {
				socket.leave(socket.data.lobbyId);
				emitRoomPlayerUpdate(io, socket, PlayerUpdateType.left);
			});

			socket.on("disconnect", reason => {
				console.log(`${socket.id} disconnected (${reason})`);
			});
		});

		(res.socket as any).server.io = io;
	} else {
		console.log("socket.io already running");
	}
	res.end();
};

const emitRoomPlayerUpdate = async (io: GameServer, emiterSocket: GameServerSocket, type: PlayerUpdateType) => {
	const socketsInRoom = await io.in(emiterSocket.data.lobbyId).fetchSockets();

	socketsInRoom
		.filter(socket => socket.id !== emiterSocket.id)
		.forEach(receiverSocket => {
			const players = socketsInRoom
				.filter(socket => socket.id != receiverSocket.id)
				.map(({ data: { publicPlayerId: id, player } }) => ({ ...player, id }));
			const player = { ...emiterSocket.data.player, id: emiterSocket.data.publicPlayerId };
			receiverSocket.emit("lobbyPlayersUpdate", {
				players,
				update: { player, type },
			});
		});
};

const disconnectSocket = (socket: GameServerSocket, reason: ServerDisconnectReason) => {
	socket.emit("disconnectByGameServer", reason);
	setTimeout(() => {
		socket.disconnect(true);
	}, 1000); // allow disconnectedByServer event to arrive before disconnection
};

export const queryValidation = z.object({
	lobbyId: z.string().refine(isMongoId),
	playerId: z.string().uuid(),
	playerName: z.string(),
	playerColor: z.nativeEnum(Color),
	playerAvatar: z.nativeEnum(Avatar),
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
