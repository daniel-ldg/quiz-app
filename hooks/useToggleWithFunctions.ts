import { useState, useCallback } from "react";
import { useToggle } from "./useToggle";

export const useToggleWithFunctions = <T>(options: readonly T[]) => {
	const [currentOption, toggle] = useToggle(options);
	const [currentIndex, setCurrentIndex] = useState(0);

	const setNextOption = useCallback(() => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % options.length);
		toggle(options[(currentIndex + 1) % options.length]);
	}, [options, currentIndex, toggle]);

	const setPrevOption = useCallback(() => {
		setCurrentIndex(prevIndex => (prevIndex === 0 ? options.length - 1 : prevIndex - 1));
		toggle(options[currentIndex === 0 ? options.length - 1 : currentIndex - 1]);
	}, [options, currentIndex, toggle]);

	const setOption = useCallback(
		(option: T) => {
			const newIndex = options.indexOf(option);
			if (newIndex !== -1) {
				setCurrentIndex(newIndex);
				toggle(option);
			}
		},
		[options, toggle]
	);

	return {
		option: currentOption,
		setNextOption,
		setPrevOption,
		setOption,
	};
};
