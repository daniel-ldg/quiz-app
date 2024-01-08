import React, { forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Player } from "@prisma/client";
import Image from "next/image";
import { AVATAR_URL } from "@/constants/Avatars";
import { COLOR_CLASS_NAME } from "@/constants/Colors";

interface Props {
	players: Array<Player>;
}

const Profiles: React.FC<Props> = ({ players }) => {
	const profiles: Array<{ x: number; y: number; player: Player }> = [];

	//radius can be increased to make the distance bigger
	const radius = 150;
	const cx = 0;
	const cy = 0;

	//First point
	const [player, ...lobby] = players;
	if (player) {
		profiles.push({ x: radius, y: 0, player });
	}

	//Rest of the points
	lobby.forEach((player, i) => {
		//create a new angle like 360/4 -> 90,180,270
		const angle = (360 / players.length) * (i + 1);
		const { x, y } = findPoint({ radius, angle, cx, cy });
		profiles.push({ x, y, player });
	});

	return (
		<AnimatePresence mode="popLayout">
			{profiles.map(({ x, y, player }) => (
				<MotionProfile
					key={player.id}
					player={player}
					transition={{ duration: 1.4 }}
					initial={{ x: 0, y: 0, scale: 0 }}
					animate={{ x, y, scale: 1 }}
					exit={{ x: 0, y: 0, scale: 0 }}
				/>
			))}
		</AnimatePresence>
	);
};

const Profile = forwardRef<HTMLDivElement, { player: Player }>(({ player }, ref) => {
	const avatar = player.avatar || "placeholder";
	const avatarUrl = AVATAR_URL[avatar];
	const avatarColor = COLOR_CLASS_NAME[player.color || "gray"];

	return (
		<div ref={ref} className="absolute avatar tooltip tooltip-open tooltip-bottom" data-tip={player.name}>
			<div className={`relative w-20 rounded-full ${avatarColor}`}>
				<Image alt={`avatar ${avatar}`} src={avatarUrl} fill sizes="(max-width: 768px) 10vw, 5vw" />
			</div>
		</div>
	);
});

Profile.displayName = "Profile";

const MotionProfile = motion(Profile);

type findPointFn = (arg: { radius: number; angle: number; cx: number; cy: number }) => { x: number; y: number };

const findPoint: findPointFn = ({ radius, angle, cx, cy }) => {
	const radians = angle * (Math.PI / 180); // Convert from Degrees to Radians
	const x = Math.ceil(cx + radius * Math.cos(radians));
	const y = Math.ceil(cy + radius * Math.sin(radians));
	return { x, y };
};

export default Profiles;
