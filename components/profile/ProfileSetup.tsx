import { useSessionContext } from "@/context/LocalStorageSession";
import AvatarSelector from "./AvatarSelector";
import { Avatar, Color } from "@prisma/client";
import { useEffect, useState } from "react";
import { useToggleWithFunctions } from "@/hooks/useToggleWithFunctions";

interface Props {
	onDone: () => void;
}

const ProfileSetup: React.FC<Props> = ({ onDone }) => {
	const { player, setPlayer } = useSessionContext();
	const [name, setName] = useState("");

	const {
		option: avatar,
		setNextOption: onNextAvatar,
		setPrevOption: onPrevAvatar,
		setOption: setAvatar,
	} = useToggleWithFunctions<Avatar>(Object.values(Avatar).filter(avatar => avatar != "placeholder"));

	const {
		option: color,
		setNextOption: onNextColor,
		setPrevOption: onPrevColor,
		setOption: setColor,
	} = useToggleWithFunctions<Color>(Object.values(Color).filter(color => color != "gray"));

	useEffect(() => {
		if (player) {
			setAvatar(player.avatar);
			setColor(player.color);
			setName(player.name);
		}
	}, []);

	const handleSave = () => {
		setPlayer({ avatar, color, name });
		onDone();
	};

	return (
		<div className="flex flex-col gap-3">
			<h3 className="font-bold text-lg">{`${!player ? "Configura" : "Modifica"} tu perfil`}</h3>
			<AvatarSelector {...{ avatar, color, onNextAvatar, onPrevAvatar, onNextColor, onPrevColor }} />
			<label className="form-control">
				<div className="label">
					<span className="label-text">¿Cual es tu nombre?</span>
				</div>
				<input
					type="text"
					placeholder="Escribe aqui"
					className="input input-bordered"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</label>
			<a className="btn btn-secondary" onClick={handleSave}>
				Guardar
			</a>
		</div>
	);
};

export default ProfileSetup;
