import { PropsWithChildren } from "react";
import Portal from "@rc-component/portal";
import { IoClose } from "react-icons/io5";

export enum Size {
	XS = "max-w-xs",
	SM = "max-w-sm",
	MD = "max-w-md",
	LG = "max-w-lg",
}

interface Props extends PropsWithChildren {
	isOpen: boolean;
	onClose: () => void;
	canClose?: boolean;
	title?: string;
	size?: Size;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, canClose = true, title = "", size = Size.LG, children }) => {
	const handleBackdropClick = () => {
		if (canClose) {
			onClose();
		}
	};
	return (
		<Portal open={isOpen}>
			<div
				className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center"
				onClick={handleBackdropClick}>
				<div
					className={`bg-white rounded-lg shadow-lg overflow-hidden w-full ${size} m-4`}
					onClick={e => e.stopPropagation()}>
					<div className="flex justify-between items-center border-b p-4">
						<h3 className="text-lg font-semibold">{title}</h3>
						{canClose && (
							<button onClick={onClose} className="text-gray-700">
								<IoClose size={24} />
							</button>
						)}
					</div>
					<div className="p-4 max-h-[80vh] overflow-y-auto">{children}</div>
				</div>
			</div>
		</Portal>
	);
};

export default Modal;
