import { NextApiHandler } from "next";
import prisma from "../../../store/PrismaInstance";
import { Quiz } from "@prisma/client";

export interface GetTodayQuizzesResponse {
	quizzes: Array<Pick<Quiz, "id" | "name" | "description">>;
}

const handler: NextApiHandler<GetTodayQuizzesResponse> = (_, res) => {
	// for now gets all
	prisma.quiz
		.findMany()
		.then(quizzes => quizzes.map(({ id, name, description }) => ({ id, name, description })))
		.then(quizzes => res.json({ quizzes }))
		.catch(() => res.status(500).end());
};

export default handler;
