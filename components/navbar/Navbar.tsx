import React, { useEffect } from "react";
import { useSessionContext } from "@/context/LocalStorageSession";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { COLOR_CLASS_NAME } from "../../constants/Colors";
import { AVATAR_URL } from "@/constants/Avatars";
import Modal from "../common/Modal";
import ProfileSetup from "../profile/ProfileSetup";
import { useDisclosure } from "@/hooks/useDisclosure";
import { FaReact } from "react-icons/fa";

const Navbar: React.FC = () => {
	const { player, isLoading } = useSessionContext();
	const [isProfileOpen, { close: closeProfile, open: openProfile }] = useDisclosure();

	const avatar = player?.avatar || "placeholder";
	const avatarUrl = AVATAR_URL[avatar];
	const avatarColor = COLOR_CLASS_NAME[player?.color || "gray"];

	useEffect(() => {
		if (!isLoading && !player) {
			openProfile();
		}
	}, [isLoading]);

	return (
		<>
			<div className="p-3 mx-auto max-w-3xl">
				<div className="navbar bg-gradient-to-tr from-green-400 via-blue-500 to-indigo-500 shadow-xl rounded-box">
					<div className="flex-1 z-10 text-white">
						<a className="ml-5 font-semibold text-xl ">MindMatch</a>
						<FaReact className="text-5xl opacity-10 ml-3" />
					</div>
					<div className="flex-none gap-2">
						<div className="dropdown dropdown-hover dropdown-end">
							<div className="flex items-center gap-2">
								{player && <p className="italic font-medium text-white">{player.name}</p>}
								<div role="button" className="btn btn-circle avatar">
									<div className={`relative w-10 rounded-full ${avatarColor}`}>
										<Image
											alt={`avatar ${avatar}`}
											src={avatarUrl}
											fill
											sizes="(max-width: 768px) 10vw, 5vw"
										/>
									</div>
								</div>
							</div>
							<ul className="z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
								<li>
									<a onClick={openProfile}>
										<CgProfile /> Modificar Perfil
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<Modal
				isOpen={isProfileOpen}
				onClose={closeProfile}
				hideClose={!player}
				ignoreBackdrop={!player}
				ignoreEsc={!player}>
				<ProfileSetup onDone={closeProfile} />
			</Modal>
		</>
	);
};

export default Navbar;
