import React, { PropsWithChildren } from "react";

interface LoadingContainerProps extends PropsWithChildren<{}> {
	isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingContainerProps> = ({ isLoading, children }) => {
	return (
		<div className="grid place-items-center relative">
			{children}
			{isLoading && (
				<div className="absolute inset-0 bg-gray-200 bg-opacity-50 grid place-items-center">
					<span className="loading loading-ring loading-lg"></span>
				</div>
			)}
		</div>
	);
};

export default LoadingOverlay;
