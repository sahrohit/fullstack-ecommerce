import { useRouter } from "next/router";
import {
	HStack,
	Button,
	Heading,
	SimpleGrid,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useTrackByIdQuery } from "@/generated/graphql";
import PageLoader from "@/components/shared/PageLoader";
import TrackingTimeline from "@/components/pages/account/order/TrackingTimelines";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/Footer";
import UnderlineLink from "@/components/ui/UnderlineLink";
import { OrderNotFound, orderPageTextFromStatus } from "../order/[id]";

const OrderPage = () => {
	const router = useRouter();

	const { data, loading, error } = useTrackByIdQuery({
		variables: {
			orderId: router.query.id as string,
		},
	});

	if (loading) {
		return <PageLoader text="Order Detail Loading" />;
	}

	if (!data?.trackById || error) {
		return <OrderNotFound />;
	}

	return (
		<>
			<Navbar />
			<SimpleGrid placeItems="center" m={4}>
				<Stack
					gap={{ base: 4, lg: 48 }}
					alignItems="center"
					justifyContent="space-between"
					direction={["column-reverse", "row"]}
				>
					<TrackingTimeline status={data.trackById.status} top={0} />
					<VStack alignItems="flex-start" gap={6}>
						<VStack alignItems="flex-start" gap={2}>
							<Heading fontSize="5xl" fontWeight="extrabold" lineHeight={1}>
								{orderPageTextFromStatus(data.trackById.status).header}
							</Heading>
						</VStack>
						<Heading fontSize="2xl" lineHeight={1}>
							{data.trackById.id}
						</Heading>
						<VStack alignItems="flex-start" gap={0}>
							<Text>{data.trackById.address.address}</Text>
							<Text>
								{data.trackById.address.state} {data.trackById.address.zip},{" "}
								{data.trackById.address.city}, {data.trackById.address.country}
							</Text>
						</VStack>
						<HStack gap="4">
							<Button colorScheme="primary" as={Link} href="/">
								Continue Shopping
							</Button>
						</HStack>
						<Text w="full" fontSize="lg">
							Have a Problem? Contact our{" "}
							<UnderlineLink href="/account/helpcenter">
								Customer Support{" "}
							</UnderlineLink>
						</Text>
					</VStack>
				</Stack>
			</SimpleGrid>
			<Footer />
		</>
	);
};

export default OrderPage;
