import SmallCard from "@/components/common/SmallCard";
import { useState } from "react";

const JoinLobby: React.FC = () => {
	const [code, setCode] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// join
	};

	return (
		<SmallCard>
			<h2 className="text-lg font-semibold mb-2">Unirse a Lobby</h2>
			<p className="text-sm text-gray-500 mb-4">Introduce el código del lobby para unirte.</p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="shadow border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
					placeholder="Código del Lobby"
					value={code}
					onChange={e => setCode(e.target.value)}
				/>
				<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Unirse
				</button>
			</form>
		</SmallCard>
	);
};

export default JoinLobby;
