import HeadingGroup from "@/components/pages/account/HeadingGroup";
import OrderCard from "@/components/pages/account/order/OrderCard";
import ORDERS from "@/data/order";
import withProtected from "@/routes/withProtected";
import { SimpleGrid, Stack } from "@chakra-ui/react";

const OrdersPage = () => (
	<Stack gap={4}>
		<HeadingGroup
			title="Orders"
			description="Here are your orders, you can track them here"
		/>
		<SimpleGrid columns={[1, 1, 1, 1, 2]} gap={4} w="full">
			{ORDERS.map((order) => (
				<OrderCard key={order.id} />
			))}
		</SimpleGrid>
	</Stack>
);

export default withProtected(OrdersPage);
