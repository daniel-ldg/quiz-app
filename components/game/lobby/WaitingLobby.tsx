import BlurBackground from "../../common/BlurBackground";
import PlayersCircle from "./PlayersCircle";
import MatchController from "./MatchController";

const WaitingLobby = () => {
	return (
		<>
			<div className="flex flex-col h-full">
				<div className="grow">
					<div className="grid place-content-center justify-items-center h-full">
						<PlayersCircle />
					</div>
				</div>
				<div className="flex-0">
					<MatchController />
				</div>
			</div>
			<BlurBackground />
		</>
	);
};

export default WaitingLobby;
