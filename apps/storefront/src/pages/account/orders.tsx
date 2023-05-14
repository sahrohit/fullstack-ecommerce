import HeadingGroup from "@/components/pages/account/HeadingGroup";
import OrderCard from "@/components/pages/account/order/OrderCard";
import Result from "@/components/shared/Result";
import { OrderDetail, useOrdersQuery } from "@/generated/graphql";
import withProtected from "@/routes/withProtected";
import { Stack, VStack } from "@chakra-ui/react";

const OrdersPage = () => {
	const { data, loading, error } = useOrdersQuery();

	if (loading) {
		return <p>Loading...</p>;
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
