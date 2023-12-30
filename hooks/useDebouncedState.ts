import { useCallback, useEffect, useRef, useState } from "react";

export const useDebouncedState = <T = any>(defaultValue: T, wait: number) => {
	const [value, setValue] = useState<T>(defaultValue);
	const timeoutRef = useRef<number | null>(null);

	const clearTimeout = () => window.clearTimeout(timeoutRef.current!);
	useEffect(() => clearTimeout, []);

	const debouncedSetValue = useCallback(
		(newValue: T) => {
			clearTimeout();
			timeoutRef.current = window.setTimeout(() => {
				setValue(newValue);
			}, wait);
		},
		[wait]
	);

	return [value, debouncedSetValue] as const;
};
