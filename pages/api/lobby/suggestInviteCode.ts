import { getRandomCode } from "@/utils/StringUtils";
import { NextApiHandler } from "next";
import prisma from "@/store/PrismaInstance";

export interface SuggestInviteCodeResponse {
	code: string;
}

const handler: NextApiHandler<SuggestInviteCodeResponse> = async ({ method }, res) => {
	if (method !== "GET") {
		res.setHeader("Allow", "GET");
		res.status(405).end();
		return;
	}

	let code: string;
	let activeLobbiesWithSameCode: number;
	do {
		code = getRandomCode({ digits: 1 });
		try {
			activeLobbiesWithSameCode = await prisma.lobby.count({
				where: { AND: { gameResult: { isSet: false }, inviteCode: { equals: code } } },
			});
		} catch (_) {
			res.status(500).end();
			return;
		}
	} while (activeLobbiesWithSameCode !== 0);

	return res.json({ code });
};

export default handler;
