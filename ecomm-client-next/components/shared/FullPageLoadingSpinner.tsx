import { LoadingSpinner } from "./LoadingSpinner";

const FullPageLoadingSpinner = () => {
	return (
		<div className="grid place-items-center h-screen">
			<LoadingSpinner />
		</div>
	);
};

export default FullPageLoadingSpinner;
