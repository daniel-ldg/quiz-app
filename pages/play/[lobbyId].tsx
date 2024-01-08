import WaitingLobby from "@/components/lobby/WaitingLobby";
import { SocketCtxProvider } from "@/context/SocketContext";
import prisma from "@/store/PrismaInstance";
import { Lobby } from "@prisma/client";
import { GetServerSideProps } from "next";
import isMongoId from "validator/lib/isMongoId";
import { z } from "zod";

interface Props {
	lobbyId: Lobby["id"];
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
	try {
		const parsedQuery = queryValidator.parse(query);
		const { lobbyId } = parsedQuery;
		const lobby = await prisma.lobby.findUniqueOrThrow({
			where: { id: lobbyId, gameResult: { isSet: false } },
			select: { id: true },
		});
		return { props: { lobbyId: lobby.id } };
	} catch (_) {
		return { notFound: true };
	}
};

const Game: React.FC<Props> = ({ lobbyId }) => {
	return (
		<SocketCtxProvider lobbyId={lobbyId}>
			<WaitingLobby />
		</SocketCtxProvider>
	);
};

const queryValidator = z.object({ lobbyId: z.string().refine(isMongoId) });

export default Game;
