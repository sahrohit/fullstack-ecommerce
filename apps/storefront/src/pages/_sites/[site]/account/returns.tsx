import { SimpleGrid, VStack, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import withProtected from "@/routes/withProtected";
import tasks from "../../../../../public/assets/tasks.svg";

const ReturnsPage = () => (
	<SimpleGrid h="90vh" placeItems="center">
		<VStack w="full" gap={4}>
			<VStack textAlign="center">
				<Heading as="h3" fontSize="2xl" lineHeight="1">
					No returns yet ?
				</Heading>
				<Text>Our return policy is also very fair.</Text>
			</VStack>
			<Image width={300} alt="Empty Order" src={tasks} />
		</VStack>
	</SimpleGrid>
);

export default withProtected(ReturnsPage);
