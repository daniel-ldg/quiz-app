import { NextApiHandler } from "next";
import { z } from "zod";
import prisma from "@/store/PrismaInstance";
import { Lobby, Prisma } from "@prisma/client";
import isMongoId from "validator/lib/isMongoId";

export interface CreateLobbyResponse {
	url: string;
}

export type CreateLobbyBody = z.infer<typeof bodyValidation>;

const handler: NextApiHandler<CreateLobbyResponse> = async ({ method, body }, res) => {
	if (method !== "POST") {
		res.setHeader("Allow", "POST");
		res.status(405).end();
		return;
	}

	const validatedBody = bodyValidation.safeParse(body);

	if (!validatedBody.success) {
		res.status(400).end();
		return;
	}

	const { quizId, hostId, inviteCode } = validatedBody.data;

	let createdLobby: Lobby;
	try {
		createdLobby = await prisma.lobby.create({
			data: { quiz: { connect: { id: quizId } }, hostId, inviteCode },
		});
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			// P2002 = Unique constraint failed (inviteCode)
			if (error.code === "P2002") {
				res.status(409).end();
				return;
			}
		}
		res.status(500).end();
		return;
	}

	const url = `/play/${createdLobby.id}`;

	res.status(201);
	return res.json({ url });
};

const bodyValidation = z.object({
	quizId: z.string().refine(isMongoId),
	hostId: z.string().uuid(),
	inviteCode: z.string(),
});

export default handler;
