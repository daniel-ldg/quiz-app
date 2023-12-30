import prisma from "@/store/PrismaInstance";
import { Lobby } from "@prisma/client";
import { NextApiHandler } from "next";
import { z } from "zod";

export interface JoinLobbyResponse {
	url: string;
}

export type CreateLobbyQuery = z.infer<typeof joinLobbyQuery>;

const handler: NextApiHandler<JoinLobbyResponse> = async ({ method, query }, res) => {
	if (method !== "GET") {
		res.setHeader("Allow", "GET");
		res.status(405).end();
		return;
	}

	const validatedQuery = joinLobbyQuery.safeParse(query);

	if (!validatedQuery.success) {
		res.status(400).end();
		return;
	}

	const { inviteCode } = validatedQuery.data;

	let lobby: Pick<Lobby, "id">;
	try {
		lobby = await prisma.lobby.findFirstOrThrow({
			where: { AND: { inviteCode: { equals: inviteCode }, gameResult: { isSet: false } } },
			select: { id: true },
		});
	} catch (_) {
		res.status(404).end();
		return;
	}

	const url = `/play/${lobby.id}`;

	res.status(200);
	return res.json({ url });
};

const joinLobbyQuery = z.object({
	inviteCode: z.string(),
});

export default handler;
