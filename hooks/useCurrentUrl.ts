import { useState } from "react";
import { useEffectOnce } from "./useEffectOnce";

const useCurrentUrl = () => {
	const [urlData, setUrlData] = useState({ url: "", hostname: "" });

	useEffectOnce(() => {
		const url = window.location.href;
		const hostname = window.location.host; // host incluye el nombre del host y el puerto

		setUrlData({ url, hostname });
	});

	return urlData;
};

export default useCurrentUrl;
