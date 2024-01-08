import { useState, useEffect, useCallback } from "react";

const useTimedToggle = ({ duration = 5, defaultValue = false } = {}) => {
	const [value, setValue] = useState(defaultValue);
	const [timer, setTimer] = useState<NodeJS.Timeout>();

	const toggleValue = useCallback(() => {
		setValue(!defaultValue);

		if (timer) {
			clearTimeout(timer);
		}

		const newTimer = setTimeout(() => {
			setValue(defaultValue);
		}, duration * 1000);

		setTimer(newTimer);
	}, [defaultValue, duration]);

	useEffect(() => {
		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, [timer]);

	return { value, toggleValue };
};

export default useTimedToggle;
