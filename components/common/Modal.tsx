import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props extends PropsWithChildren {
	isOpen: boolean;
	onClose: () => void;
	closeOnEsc?: boolean;
	reRenderOnOpen?: boolean;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, closeOnEsc = false, reRenderOnOpen = false, children }) => {
	const ref = useRef<HTMLDialogElement>(null);
	const [key, setKey] = useState(uuidv4());

	useEffect(() => {
		if (isOpen) {
			ref.current?.showModal();
			if (reRenderOnOpen) {
				setKey(uuidv4());
			}
		} else {
			ref.current?.close();
		}
	}, [isOpen]);

	const handleEsc = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
		if (closeOnEsc) {
			onClose();
		} else {
			e.preventDefault();
		}
	};

	return (
		<dialog ref={ref} className="modal modal-bottom sm:modal-middle" onCancel={handleEsc}>
			<div className="modal-box" key={key}>
				{children}
			</div>
		</dialog>
	);
};

export default Modal;
