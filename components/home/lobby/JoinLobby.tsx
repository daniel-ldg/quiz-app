import SmallCard from "@/components/common/SmallCard";
import { useState } from "react";

const JoinLobby: React.FC = () => {
	const [code, setCode] = useState("");

	const handleJoin = () => {
		// join
	};

	return (
		<SmallCard>
			<h2 className="text-lg font-semibold mb-2">Unirse a Lobby</h2>
			<p className="text-sm text-gray-500 mb-4">Introduce el código invitación para unirte.</p>
			<div className="join">
				<input
					type="text"
					className="join-item input input-bordered input-sm"
					placeholder="Escribe el código aquí"
					value={code}
					onChange={e => setCode(e.target.value)}
				/>
				<button className="btn btn-secondary btn-sm join-item" onClick={handleJoin}>
					Unirse
				</button>
			</div>
		</SmallCard>
	);
};

export default JoinLobby;
