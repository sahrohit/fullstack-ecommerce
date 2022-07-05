import { NextPage } from "next";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import Alert from "@components/ui/Alert";
import { useLogoutMutation, useMeQuery } from "@generated/graphql";
import toast from "react-hot-toast";

const Home: NextPage = () => {
	const { data, loading, error } = useMeQuery();
	const [logout] = useLogoutMutation({
		update: (cache) => cache.evict({ fieldName: "me" }),
	});

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	if (error) {
		return (
			<Alert
				message="An Error Occured"
				title="Couldn't load Current User"
				status="error"
			/>
		);
	}

	return (
		<>
			<p className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</p>
			<button
				type="button"
				className="btn btn-error btn-sm"
				onClick={() => {
					toast.promise(logout(), {
						loading: "Logging out...",
						success: "Logged out Successfully!",
						error: "Something went wrong!",
					});
				}}
			>
				Logout
			</button>
		</>
	);
};

export default Home;
