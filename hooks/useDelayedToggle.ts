import { useCallback, useEffect, useRef, useState } from "react";

interface UseDelayedToggleOptions {
	initialState?: boolean;
	delayTrue?: number;
	delayFalse?: number;
}

export const useDelayedToggle = ({
	initialState = false,
	delayTrue = 1000,
	delayFalse = 1000,
}: UseDelayedToggleOptions = {}) => {
	const [value, setValue] = useState<boolean>(initialState);
	const timeoutRef = useRef<number | null>(null);

	const clearTimeout = () => {
		if (timeoutRef.current !== null) {
			window.clearTimeout(timeoutRef.current);
		}
	};

	useEffect(() => {
		return clearTimeout;
	}, []);

	const setTrue = useCallback(() => {
		clearTimeout();
		timeoutRef.current = window.setTimeout(() => {
			setValue(true);
		}, delayTrue);
	}, [delayTrue]);

	const setFalse = useCallback(() => {
		clearTimeout();
		timeoutRef.current = window.setTimeout(() => {
			setValue(false);
		}, delayFalse);
	}, [delayFalse]);

	return { value, setTrue, setFalse };
};
