import SmallCard from "@/components/common/SmallCard";
import useGet from "@/hooks/useGet";
import { JoinLobbyResponse } from "@/pages/api/lobby/join";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const JOIN_LOBBY_API_URL = "/api/lobby/join";

const JoinLobby: React.FC = () => {
	const [code, setCode] = useState("");
	const { data, trigger, isLoading } = useGet<JoinLobbyResponse>({ url: `${JOIN_LOBBY_API_URL}?inviteCode=${code}` });
	const router = useRouter();

	useEffect(() => {
		if (data) {
			router.push(data.url);
		}
		// todo: handle errors
	}, [data, router]);

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
				<button className="btn btn-secondary btn-sm join-item" onClick={trigger} disabled={isLoading}>
					{isLoading ? <span className="loading loading-spinner"></span> : "Unirse"}
				</button>
			</div>
		</SmallCard>
	);
};

export default JoinLobby;
