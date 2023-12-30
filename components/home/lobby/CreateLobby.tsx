import Modal from "@/components/common/Modal";
import SmallCard from "@/components/common/SmallCard";
import { useDisclosure } from "@/hooks/useDisclosure";
import TodayQuizzes from "./TodayQuizzes";
import { useEffect, useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import { usePlayerSession } from "@/context/PlayerSessionContext";
import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";
import { CreateLobbyBody, CreateLobbyResponse } from "@/pages/api/lobby/create";
import { SuggestInviteCodeResponse } from "@/pages/api/lobby/suggestInviteCode";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import { useRouter } from "next/router";
import ModalMessage, { MessageType } from "@/components/common/ModalMessage";

const GET_SUGGETED_INVITE_CODE_URL = "/api/lobby/suggestInviteCode";
const CREATE_LOBBY_URL = "/api/lobby/create";

interface InviteCodeProps {
	inviteCode: string;
	setInviteCode: (value: string) => void;
}

const InviteCode: React.FC<InviteCodeProps> = ({ inviteCode, setInviteCode }) => {
	const { data, isLoading, trigger } = useGet<SuggestInviteCodeResponse>({
		url: GET_SUGGETED_INVITE_CODE_URL,
		autoTrigger: true,
	});

	useEffect(() => {
		if (data) {
			setInviteCode(data.code);
		}
	}, [data, setInviteCode]);

	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-semibold">Código de invitacion</h3>
			<div className="join">
				<input
					type="text"
					className="input input-bordered input-sm join-item flex-1"
					value={inviteCode}
					onChange={e => setInviteCode(e.target.value)}
					disabled={isLoading}
					placeholder="Escribe el código de invitación aquí"
				/>
				<button className="btn btn-square btn-sm join-item" onClick={trigger} disabled={isLoading}>
					{isLoading ? <span className="loading loading-spinner"></span> : <LuRefreshCcw />}
				</button>
			</div>
		</div>
	);
};

const LobbySetup: React.FC = () => {
	const { player } = usePlayerSession();
	const [quizId, setQuizId] = useState<string | undefined>(undefined);
	const [inviteCode, setInviteCode] = useState<string>("");
	const isValid = quizId !== undefined && inviteCode !== "";
	const [isMessageOpen, { open: openMessage, close: closeMessage }] = useDisclosure();
	const [errorMessage, setErrorMessage] = useState("");

	const router = useRouter();

	const { data, status, isError, isLoading, trigger } = usePost<CreateLobbyBody, CreateLobbyResponse>({
		url: CREATE_LOBBY_URL,
	});

	const handleCreate = () => {
		if (isValid && !!player) {
			trigger({ quizId, inviteCode, hostId: player.id });
		}
	};

	useEffect(() => {
		if (data) {
			router.push(data.url);
		}
		if (isError) {
			if (status === 409) {
				setErrorMessage("Código de invitacion no disponible. Debes cambiarlo.");
			} else {
				setErrorMessage("Ocurrió un error al crear el lobby. Por favor, intenta de nuevo.");
			}
			openMessage();
		}
	}, [data, isError, openMessage, router, status]);

	return (
		<>
			<LoadingOverlay {...{ isLoading }}>
				<div className="flex flex-col gap-3 w-full">
					<TodayQuizzes selected={quizId} onSelect={setQuizId} />
					<InviteCode {...{ inviteCode, setInviteCode }} />
					<button
						className="btn btn-secondary btn-sm"
						onClick={handleCreate}
						disabled={!isValid || isLoading}>
						{isLoading ? <span className="loading loading-spinner"></span> : "Crear"}
					</button>
				</div>
			</LoadingOverlay>
			<ModalMessage
				isOpen={isMessageOpen}
				onClose={closeMessage}
				title="Error"
				message={errorMessage}
				type={MessageType.ERROR}
			/>
		</>
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
