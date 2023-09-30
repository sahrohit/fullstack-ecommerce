import { Box } from "@chakra-ui/react";
import { CounterButton } from "ui";
import { log } from "logger";
import { useMeQuery } from "generated-graphql";

const TestPage = () => {
	log("This if loging from Admin Aside");

	const { data, loading, error } = useMeQuery();

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<Box>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<CounterButton />
		</Box>
	);
};

export default TestPage;
