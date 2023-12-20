import { PropsWithChildren } from "react";

const SmallCard: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="card bg-white rounded-2xl p-4 max-w-sm shadow-lg border border-indigo-500/30">{children}</div>
	);
};

export default SmallCard;
