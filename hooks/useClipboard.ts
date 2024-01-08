import { useCallback } from "react";

interface CallBacks {
	onSuccess?: () => any;
	onFail?: () => any;
}

const useClipboard = ({ onSuccess, onFail }: CallBacks = {}) => {
	const copyToClipboard = useCallback(
		(text: string) =>
			new Promise<boolean>(resolve => {
				navigator.clipboard
					.writeText(text)
					.then(() => {
						if (onSuccess) {
							onSuccess();
						}
						resolve(true);
					})
					.catch(() => {
						if (onFail) {
							onFail();
						}
						resolve(false);
					});
			}),
		[onSuccess, onFail]
	);

	return { copyToClipboard };
};

export default useClipboard;
