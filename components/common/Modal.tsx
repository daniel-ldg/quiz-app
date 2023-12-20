import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

interface Props extends PropsWithChildren {
	isOpen: boolean;
	onClose: () => void;
	hideClose?: boolean;
	ignoreEsc?: boolean;
	ignoreBackdrop?: boolean;
	keepChildMounted?: boolean;
}

const Modal: React.FC<Props> = ({
	isOpen,
	onClose,
	hideClose = false,
	ignoreEsc = false,
	ignoreBackdrop = false,
	keepChildMounted = false,
	children,
}) => {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (isOpen) {
			ref.current?.showModal();
		} else {
			ref.current?.close();
		}
	}, [isOpen]);

	const handleEsc = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
		if (!ignoreEsc) {
			onClose();
		} else {
			e.preventDefault();
		}
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
		if (!ignoreBackdrop && e.target === ref.current) {
			onClose();
		}
	};

	return (
		<dialog
			ref={ref}
			className="modal modal-bottom sm:modal-middle"
			onClick={handleBackdropClick}
			onCancel={handleEsc}>
			<div className="modal-box relative" onClick={e => e.stopPropagation()}>
				{!hideClose && (
					<button
						className="absolute top-3 right-3 bg-transparent border-none text-black cursor-pointer"
						onClick={onClose}
						aria-label="Close">
						<IoClose size={24} />
					</button>
				)}
				{(isOpen || keepChildMounted) && children}
			</div>
		</dialog>
	);
};

export default Modal;
