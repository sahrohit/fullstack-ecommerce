import SidebarLayout from "@/components/shared/sidebar";
import { Box } from "@chakra-ui/react";

const TestPage = () => (
	<SidebarLayout>
		<Box ml={{ base: 0, md: 80 }} p={4}>
			<h1>Test Page</h1>
		</Box>
	</SidebarLayout>
);

export default TestPage;
