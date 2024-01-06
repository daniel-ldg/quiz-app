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
	const [undelayedValue, setUndelayedValue] = useState<boolean>(initialState); // Estado adicional para el valor sin retraso
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
		setUndelayedValue(true); // Actualizar el valor sin retraso inmediatamente
		timeoutRef.current = window.setTimeout(() => {
			setValue(true);
		}, delayTrue);
	}, [delayTrue]);

	const setFalse = useCallback(() => {
		clearTimeout();
		setUndelayedValue(false); // Actualizar el valor sin retraso inmediatamente
		timeoutRef.current = window.setTimeout(() => {
			setValue(false);
		}, delayFalse);
	}, [delayFalse]);

	return { value, undelayedValue, setTrue, setFalse };
};
