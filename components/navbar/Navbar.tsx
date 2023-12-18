import React, { useEffect } from "react";
import { useSessionContext } from "@/context/LocalStorageSession";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { COLOR_CLASS_NAME } from "../../constants/Colors";
import { AVATAR_URL } from "@/constants/Avatars";
import Modal from "../common/Modal";
import ProfileSetup from "../profile/ProfileSetup";
import { useDisclosure } from "@/hooks/useDisclosure";

const Navbar: React.FC = () => {
	const { player, isLoading } = useSessionContext();
	const [isProfileOpen, { close: closeProfile, open: openProfile }] = useDisclosure();

	const avatarUrl = AVATAR_URL[player?.avatar || "placeholder"];
	const avatarColor = COLOR_CLASS_NAME[player?.color || "gray"];

	useEffect(() => {
		if (!isLoading && !player) {
			openProfile();
		}
	}, [isLoading]);

	return (
		<>
			<div className="p-3">
				<div className="navbar bg-base-200 shadow-xl rounded-box">
					<div className="flex-1">
						<a className="ml-5 font-semibold text-xl">MindMatch</a>
					</div>
					<div className="flex-none gap-2">
						<div className="dropdown dropdown-hover dropdown-end">
							<div className="flex items-center gap-2">
								{player && <p className="italic font-medium">{player.name}</p>}
								<div role="button" className="btn btn-circle avatar">
									<div className={`w-10 rounded-full ${avatarColor}`}>
										<Image alt="" style={{ padding: "0.3em" }} src={avatarUrl} fill />
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
			<Modal isOpen={isProfileOpen} onClose={closeProfile} reRenderOnOpen>
				<ProfileSetup onDone={closeProfile} />
			</Modal>
		</>
	);
};

export default Navbar;
