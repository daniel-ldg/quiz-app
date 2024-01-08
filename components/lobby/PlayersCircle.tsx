import { useLobbyPlayers } from "@/hooks/socket/useLobbyPlayers";
import { useMemo } from "react";
import Profiles from "./Profiles";
import { usePlayerSession } from "@/context/PlayerSessionContext";
import Blob from "@/components/common/Blob";

const PlayersCircle: React.FC = () => {
	const { player } = usePlayerSession();
	const { lobbyPlayers } = useLobbyPlayers();

	const players = useMemo(() => {
		if (!player) {
			return [];
		}
		return [player, ...lobbyPlayers];
	}, [player, lobbyPlayers]);

	const blobLabel = players.length === 1 ? "1 jugador" : `${players.length} jugadores`;

	return (
		<div className="relative h-full w-full flex justify-center items-center">
			<Profiles players={players} />
			<div className="relative grid place-content-center w-36 h-36">
				<Blob color="3b82f6" svgProps={{ className: "absolute !w-full !h-full" }} />
				<div className="z-10 pointer-events-none text-white">{blobLabel}</div>
			</div>
		</div>
	);
};

export default PlayersCircle;
