import { useLobbyPlayers } from "@/hooks/socket/useLobbyPlayers";
import { HiMiniUserGroup, HiMiniUserPlus } from "react-icons/hi2";
import { GiBoltShield } from "react-icons/gi";
import { useDisclosure } from "@/hooks/useDisclosure";
import InviteModal from "./InviteModal";
import useLobbyInfo from "@/hooks/socket/useLobbyInfo";

const MatchController = () => {
	const { lobbyInfo } = useLobbyInfo();
	const { lobbyPlayers } = useLobbyPlayers();
	const [isInviteOpen, { open: openInvite, close: closeInvite }] = useDisclosure();

	const isHost = !!lobbyInfo && lobbyInfo.isHost;
	const isEmpty = lobbyPlayers.length === 0;

	return (
		<>
			<div role="alert" className="alert mb-4 mx-auto max-w-sm sm:max-w-xl">
				<HiMiniUserGroup />
				{!isHost && <span>Espera que el host inicie la partida</span>}
				{isHost && isEmpty && <span>Invita jugadores para iniciar</span>}
				{isHost && !isEmpty && <span>La partida puede iniciar</span>}
				<div className="flex gap-2">
					<button className="btn btn-sm btn-outline" onClick={openInvite}>
						<HiMiniUserPlus /> Invitar
					</button>
					{isHost && (
						<button className="btn btn-sm btn-secondary" disabled={isEmpty}>
							<GiBoltShield />
							Iniciar
						</button>
					)}
				</div>
			</div>
			<InviteModal isOpen={isInviteOpen} onClose={closeInvite} inviteCode={lobbyInfo?.inviteCode} />
		</>
	);
};

export default MatchController;
