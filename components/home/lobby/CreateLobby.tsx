import Modal from "@/components/common/Modal";
import SmallCard from "@/components/common/SmallCard";
import { useDisclosure } from "@/hooks/useDisclosure";
import TodayQuizzes from "./TodayQuizzes";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSessionContext } from "@/context/LocalStorageSession";

interface AccessCodeComponentProps {
	accessCode: string | null;
	setAccessCode: (value: string | null) => void;
}

const AccessCodeComponent: React.FC<AccessCodeComponentProps> = ({ accessCode, setAccessCode }) => {
	const [isPrivate, setIsPrivate] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (!isPrivate) {
			setAccessCode("");
		} else if (isPrivate && accessCode === "") {
			setAccessCode(null);
		}
	}, [isPrivate, accessCode, setAccessCode]);

	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-semibold">Agregar código de acceso</h3>
			<div className="join">
				<button
					className={`btn btn-sm join-item ${isPrivate ? "btn-secondary" : ""}`}
					onClick={() => setIsPrivate(!isPrivate)}>
					{isPrivate ? "Privado" : "Público"}
				</button>
				<input
					type={showPassword ? "text" : "password"}
					className={`input input-bordered input-sm join-item flex-1 ${!isPrivate && "input-disabled"}`}
					disabled={!isPrivate}
					value={accessCode || ""}
					onChange={e => setAccessCode(e.target.value)}
					placeholder={isPrivate ? "Escribe el código de acceso aquí" : "Sin código de acceso"}
				/>
				<button
					className="btn btn-square btn-sm join-item"
					onClick={() => setShowPassword(!showPassword)}
					disabled={!isPrivate}>
					{showPassword ? <FaEyeSlash /> : <FaEye />}
				</button>
			</div>
		</div>
	);
};

const LobbySetup: React.FC = () => {
	const { player } = useSessionContext();
	const [name, setName] = useState(`Lobby de ${player?.name || "Jugador"}`);
	const [quizId, setQuizId] = useState<string | undefined>(undefined);
	const [accessCode, setAccessCode] = useState<string | null>("");
	const isValid = !!quizId && accessCode !== null && name !== "";

	const handleCreate = () => {};

	return (
		<div className="flex flex-col gap-3">
			<h3 className="font-semibold">Nombre del Lobby</h3>
			<input
				type="text"
				className="input input-bordered input-sm"
				placeholder="Escribe el nombre aquí"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<TodayQuizzes selected={quizId} onSelect={setQuizId} />
			<AccessCodeComponent {...{ accessCode, setAccessCode }} />
			<button className="btn btn-secondary btn-sm" onClick={handleCreate} disabled={!isValid}>
				Crear
			</button>
		</div>
	);
};

const CreateLobby: React.FC = () => {
	const [isOpen, { open, close }] = useDisclosure();

	return (
		<SmallCard>
			<h2 className="text-lg font-semibold mb-2">Crear Lobby</h2>
			<p className="text-sm text-gray-500 mb-4">Crea un lobby para que tus amigos se unan.</p>
			<button className="btn btn-secondary btn-sm" onClick={open}>
				Crear
			</button>
			<Modal isOpen={isOpen} onClose={close} title="Crear Lobby">
				<LobbySetup />
			</Modal>
		</SmallCard>
	);
};

export default CreateLobby;
