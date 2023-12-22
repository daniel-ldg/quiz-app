import { useState, useCallback, useEffect, useRef } from "react";

interface GetHookOptions {
	url: string;
	autoTrigger?: boolean;
}

interface GetHookReturn<Response> {
	data: Response | null;
	status: number | null;
	isError: boolean;
	isLoading: boolean;
	trigger: () => void;
}

function useGet<Response>({ url, autoTrigger = false }: GetHookOptions): GetHookReturn<Response> {
	const [data, setData] = useState<Response | null>(null);
	const [status, setStatus] = useState<number | null>(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Utiliza useRef para mantener una referencia constante a autoTrigger
	const autoTriggerRef = useRef(autoTrigger);

	const trigger = useCallback(async () => {
		setIsLoading(true);
		setIsError(false);

		try {
			const response = await fetch(url, {
				method: "GET",
			});

			setStatus(response.status);

			if (response.ok) {
				const responseData = await response.json();
				setData(responseData);
			} else {
				setIsError(true);
			}
		} catch (error) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}, [url]);

	// Dispara la solicitud automáticamente al montar, basado en el valor original de autoTrigger
	useEffect(() => {
		if (autoTriggerRef.current) {
			trigger();
		}
	}, [trigger]);

	return { data, status, isError, isLoading, trigger };
}

export default useGet;
