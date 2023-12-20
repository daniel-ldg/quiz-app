import Modal from "@/components/common/Modal";
import SmallCard from "@/components/common/SmallCard";
import { useDisclosure } from "@/hooks/useDisclosure";
import TodayQuizzes from "./TodayQuizzes";
import { useState } from "react";

const LobbySetup: React.FC = () => {
	const [idQuiz, setIdQuiz] = useState<string | undefined>(undefined);
	const handleCreate = () => {};

	return (
		<div className="flex flex-col gap-3">
			<h3 className="font-bold text-lg">Crear Lobby</h3>
			<TodayQuizzes selected={idQuiz} onSelect={setIdQuiz} />
			<button className="btn btn-secondary" onClick={handleCreate} disabled={!idQuiz}>
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
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={open}>
				Crear
			</button>
			<Modal isOpen={isOpen} onClose={close}>
				<LobbySetup />
			</Modal>
		</SmallCard>
	);
};

export default CreateLobby;
