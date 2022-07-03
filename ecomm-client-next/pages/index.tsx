import { NextPage } from "next";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import Alert from "@components/ui/Alert";
import { useMeQuery } from "@generated/graphql";

const Home: NextPage = () => {
	const { data, loading, error } = useMeQuery();

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

	return <p className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</p>;
};

export default Home;
