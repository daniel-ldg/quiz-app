import Lottie from "lottie-react";
import bgLeft from "./bg_left.json";
import bgRight from "./bg_right.json";
import JoinLobby from "./lobby/JoinLobby";
import CreateLobby from "./lobby/CreateLobby";

const StartMatch: React.FC = () => {
	return (
		<>
			<Lottie className="absolute h-80 -z-10 -mt-16" animationData={bgLeft} />
			<Lottie className="absolute right-0 h-80 -z-10 -mt-16" animationData={bgRight} />
			<div className="container mx-auto w-fit flex flex-col md:flex-row gap-3 pt-4 md:pt-8">
				<JoinLobby />
				<CreateLobby />
			</div>
		</>
	);
};

export default StartMatch;
