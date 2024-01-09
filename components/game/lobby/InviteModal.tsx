import Modal, { ModalProps } from "@/components/common/Modal";
import useCurrentUrl from "@/hooks/useCurrentUrl";
import QRCode from "react-qr-code";
import useTimedToggle from "@/hooks/useTimedToggle";
import useClipboard from "@/hooks/useClipboard";
import { LuClipboard, LuClipboardCheck, LuClipboardX } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";

interface Props extends Pick<ModalProps, "isOpen" | "onClose"> {
	inviteCode: string | undefined;
}

const InviteModal: React.FC<Props> = ({ inviteCode, ...modalProps }) => {
	const { url, hostname } = useCurrentUrl();
	const { value: isCopySuccess, toggleValue: onCopySuccess } = useTimedToggle();
	const { value: isCopyFail, toggleValue: onCopyFail } = useTimedToggle();
	const { copyToClipboard } = useClipboard({ onSuccess: onCopySuccess, onFail: onCopyFail });
	return (
		<Modal {...modalProps} title="Invitar jugadores">
			<div className="tabs tabs-boxed bg-white grid-cols-12 p-0">
				<input
					type="radio"
					name="opt"
					className="tab col-span-3 !rounded-none !rounded-l-lg checked:!bg-blue-500 checked:!text-white bg-gray-100 hover:bg-gray-200"
					aria-label="QR"
					defaultChecked
				/>
				<div className="tab-content h-72">
					<div className="flex flex-col items-center justify-end gap-3 h-full">
						<QRCode value={url} size={230} className="mx-auto" />
						<span>El invitado escanea el código QR</span>
					</div>
				</div>

				<input
					type="radio"
					name="opt"
					className="tab col-span-6 !rounded-none checked:!bg-blue-500 checked:!text-white bg-gray-100 hover:bg-gray-200"
					aria-label="Código de invitación"
				/>
				<div className="tab-content h-72">
					<div className="flex flex-col items-center justify-end gap-3 h-full">
						<ul className="steps steps-vertical h-full">
							<li className="step">
								<div className="flex flex-col items-start gap-2">
									<span>El invitado visita</span>
									<span className="text-2xl text-left">{hostname}</span>
								</div>
							</li>
							<li className="step">
								<div className="flex flex-col items-start gap-2">
									<span>Escribe el código de invitación</span>
									<span className="text-3xl tracking-widest font-mono">
										{inviteCode || "Código no disponible"}
									</span>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<input
					type="radio"
					name="opt"
					className="tab col-span-3 !rounded-none !rounded-r-lg checked:!bg-blue-500 checked:!text-white bg-gray-100 hover:bg-gray-200"
					aria-label="Link"
				/>
				<div className="tab-content h-72">
					<div className="flex flex-col items-center justify-center h-full gap-8">
						<span>Comparte este link para invitar</span>
						<span className="font-mono text-wrap break-words text-center max-w-xs">{url}</span>
						<div className="flex gap-3">
							<button
								className="btn btn-sm btn-outline"
								onClick={() => copyToClipboard(url)}
								disabled={isCopySuccess || isCopyFail}>
								{isCopySuccess && <LuClipboardCheck className="text-success" />}
								{isCopyFail && <LuClipboardX className="text-error" />}
								{!isCopySuccess && !isCopyFail && <LuClipboard />}
								Copiar
							</button>
							<a
								className="btn btn-sm btn-outline"
								href={`https://wa.me/?text=Te%20invito%20a%20jugar%20en%20${encodeURIComponent(url)}`}
								target="_blank">
								<FaWhatsapp />
								WhatsApp
							</a>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default InviteModal;
