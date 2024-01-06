import { useState, useCallback } from "react";

const useBooleanToggle = (
	initialValue: boolean = false
): { value: boolean; setTrue: () => void; setFalse: () => void } => {
	const [value, setValue] = useState<boolean>(initialValue);

	const setTrue = useCallback(() => {
		setValue(true);
	}, []);

	const setFalse = useCallback(() => {
		setValue(false);
	}, []);

	return { value, setTrue, setFalse };
};

export default useBooleanToggle;
