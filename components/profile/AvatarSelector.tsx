import { AVATAR_URL } from "@/constants/Avatars";
import { COLOR_CLASS_NAME } from "@/constants/Colors";
import { Avatar, Color } from "@prisma/client";
import Image from "next/image";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface Props {
	color: Color;
	avatar: Avatar;
	onNextColor: () => void;
	onPrevColor: () => void;
	onNextAvatar: () => void;
	onPrevAvatar: () => void;
}

const Selector: React.FC<{ label: string; onNext: () => void; onPrev: () => void }> = ({ label, onNext, onPrev }) => {
	return (
		<div className="grid grid-cols-3 gap-4 justify-items-center mt-2">
			<a className="btn btn-xs justify-self-end" onClick={onPrev}>
				<GrFormPrevious />
			</a>
			<p className="capitalize">{label}</p>
			<a className="btn btn-xs justify-self-start" onClick={onNext}>
				<GrFormNext />
			</a>
		</div>
	);
};

const AvatarSelector: React.FC<Props> = ({ avatar, color, onNextAvatar, onNextColor, onPrevAvatar, onPrevColor }) => {
	return (
		<div className="flex flex-col items-center">
			<div className="avatar">
				<div className={`relative w-32 rounded-full ${COLOR_CLASS_NAME[color]}`}>
					<Image
						alt={`Avatar ${avatar}`}
						src={AVATAR_URL[avatar]}
						fill
						sizes="(max-width: 768px) 25vw, 15vw"
					/>
				</div>
			</div>
			<div className="w-full">
				<Selector label={avatar} onNext={onNextAvatar} onPrev={onPrevAvatar} />
				<Selector label={color} onNext={onNextColor} onPrev={onPrevColor} />
			</div>
		</div>
	);
};

export default AvatarSelector;
