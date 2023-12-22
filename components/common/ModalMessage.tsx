import Modal, { Size } from "./Modal";
import React from "react";
import { FaTimes, FaCheck, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

export enum MessageType {
	ERROR = "error",
	SUCCESS = "success",
	WARNING = "warning",
	INFO = "info",
}

interface Props {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	message: string;
	type?: MessageType;
}

const ModalMessage: React.FC<Props> = ({ isOpen, onClose, title = "Mensaje", message, type = MessageType.INFO }) => {
	const Icon = () => {
		const iconClass = "text-3xl mx-auto"; // Clase para hacer el icono más grande y centrado
		switch (type) {
			case MessageType.ERROR:
				return <FaTimes className={`text-red-500 ${iconClass}`} />;
			case MessageType.SUCCESS:
				return <FaCheck className={`text-green-500 ${iconClass}`} />;
			case MessageType.WARNING:
				return <FaExclamationTriangle className={`text-yellow-500 ${iconClass}`} />;
			case MessageType.INFO:
				return <FaInfoCircle className={`text-blue-500 ${iconClass}`} />;
			default:
				return null;
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={title} size={Size.XS}>
			<div className="flex flex-col items-center">
				<Icon />
				<span className="text-left mt-2">{message}</span>
			</div>
			<button
				onClick={onClose}
				className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block">
				Cerrar
			</button>
		</Modal>
	);
};

export default ModalMessage;
