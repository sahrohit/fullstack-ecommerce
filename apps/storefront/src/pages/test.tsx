import SidebarLayout from "@/components/shared/sidebar";
import { useMeQuery } from "@/generated/graphql";
import { Box } from "@chakra-ui/react";

const TestPage = () => {
	const { data, loading } = useMeQuery();

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<SidebarLayout>
			<Box ml={{ base: 0, md: 80 }} p={4}>
				<h1>Test Page</h1>
				{JSON.stringify(data, null, 2)}
			</Box>
		</SidebarLayout>
	);
};
export default TestPage;
