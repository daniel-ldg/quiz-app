import { EffectCallback, useEffect } from "react";

export const useEffectOnce = (effect: EffectCallback, precondition: boolean = true) => {
	useEffect(() => {
		if (precondition) {
			effect();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [precondition]);
};
