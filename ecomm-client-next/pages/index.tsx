import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import Alert from "@components/ui/Alert";
import { useProductsQuery } from "@generated/graphql";
import { NextPage } from "next";

const Home: NextPage = () => {
	const { data, loading, error } = useProductsQuery();

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
			<p>Hello World</p>

			{/* <p className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</p> */}
		</>
	);
};

export default Home;
