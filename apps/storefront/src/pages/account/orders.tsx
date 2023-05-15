import HeadingGroup from "@/components/pages/account/HeadingGroup";
import OrderCard from "@/components/pages/account/order/OrderCard";
import PageLoader from "@/components/shared/PageLoader";
import Result from "@/components/shared/Result";
import { OrderDetail, useOrdersQuery } from "@/generated/graphql";
import withProtected from "@/routes/withProtected";
import {
	Heading,
	Img,
	SimpleGrid,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";

const OrdersPage = () => {
	const { data, loading, error } = useOrdersQuery();

	if (loading) {
		return <PageLoader />;
	}

	if (error) {
		return (
			<Result
				heading={error.name}
				type="error"
				text={error.message}
				dump={error.stack}
			/>
		);
	}

	if (!data?.orders?.length) {
		return (
			<SimpleGrid h="90vh" placeItems="center">
				<VStack w="full" gap={4}>
					<VStack textAlign="center">
						<Heading as="h3" fontSize="2xl" lineHeight="1">
							Haven&apos;t ordered anything yet ?
						</Heading>
						<Text>This page is ready to be filled by your orders.</Text>
					</VStack>
					<Img
						width="50%"
						placeholder="blur"
						alt="App screenshot"
						src="/assets/no-comments.svg"
					/>
				</VStack>
			</SimpleGrid>
		);
	}

	return (
		<Stack gap={4}>
			<HeadingGroup
				title="Orders"
				description="Check the status of recent orders, manage returns, and download invoices."
			/>
			<VStack gap={4} w="full">
				{data?.orders?.map((order) => (
					<OrderCard orderItem={order as OrderDetail} key={order.id} />
				))}
			</VStack>
		</Stack>
	);
};

export default withProtected(OrdersPage);
