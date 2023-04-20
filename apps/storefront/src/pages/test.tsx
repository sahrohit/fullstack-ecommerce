import { useMeQuery } from "@/generated/graphql";
import { Box } from "@chakra-ui/react";

const TestPage = () => {
	const { data, loading } = useMeQuery();

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Box p={4}>
			<h1>Test Page</h1>
			{JSON.stringify(data, null, 2)}
		</Box>
	);
};
export default TestPage;
