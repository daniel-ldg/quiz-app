import { useState, useCallback } from "react";

interface PostHookOptions {
	url: string;
}

interface PostHookReturn<Body, Response> {
	data: Response | null;
	status: number | null;
	isError: boolean;
	isLoading: boolean;
	trigger: (body: Body) => void;
}

function usePost<Body, Response>({ url }: PostHookOptions): PostHookReturn<Body, Response> {
	const [data, setData] = useState<Response | null>(null);
	const [status, setStatus] = useState<number | null>(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const trigger = useCallback(
		async (body: Body) => {
			setIsLoading(true);
			setData(null);
			setStatus(null);
			setIsError(false);

			try {
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(body),
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
		},
		[url]
	);

	return { data, status, isError, isLoading, trigger };
}

export default usePost;
