import { NextApiHandler } from "next";
import prisma from "../../../store/PrismaInstance";
import { Quiz } from "@prisma/client";

export interface GetTodayQuizzesResponse {
	quizzes: Array<Pick<Quiz, "id" | "name" | "description">>;
}

const handler: NextApiHandler<GetTodayQuizzesResponse> = async ({ method }, res) => {
	if (method !== "GET") {
		res.setHeader("Allow", "GET");
		res.status(405).end("Method not allowed.");
		return;
	}
	// for now gets all
	const quizzes = (await prisma.quiz.findMany()).map(({ id, name, description }) => ({ id, name, description }));

	return res.json({ quizzes });
};

export default handler;
