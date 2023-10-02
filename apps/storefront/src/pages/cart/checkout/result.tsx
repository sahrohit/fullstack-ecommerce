import {
	Badge,
	Button,
	HStack,
	Heading,
	IconButton,
	Image,
	SimpleGrid,
	Stack,
	Text,
	Tooltip,
	VStack,
	useClipboard,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { Link } from "@chakra-ui/next-js";
import { useUpdateStatusMutation } from "generated-graphql";
import UnderlineLink from "@/components/ui/UnderlineLink";
import { capitalize } from "@/utils/helpers";
import Result from "@/components/shared/Result";
import PageLoader from "@/components/shared/PageLoader";
import colorFromStatus from "@/config/color";

const SuccessPage = () => {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [updateOrderStatusMutation, { data, loading, error }] =
		useUpdateStatusMutation({
			onCompleted: () => {
				setMounted(true);
			},
			onError: () => {
				setMounted(true);
			},
		});

	const { onCopy, hasCopied } = useClipboard(data?.updateStatus.id as string);

	useEffect(() => {
		if (router.query.pidx && router.query.purchase_order_id) {
			updateOrderStatusMutation({
				variables: {
					pidx: router.query.pidx as string,
					orderId: router.query.purchase_order_id as string,
				},
			});
		} else if (router.query.refId && router.query.oid) {
			updateOrderStatusMutation({
				variables: {
					refId: router.query.refId as string,
					orderId: router.query.oid as string,
				},
			});
		} else if (router.query.orderId) {
			updateOrderStatusMutation({
				variables: {
					orderId: router.query.orderId as string,
				},
			});
		}
	}, [
		router.query.oid,
		router.query.orderId,
		router.query.paymentId,
		router.query.pidx,
		router.query.purchase_order_id,
		router.query.refId,
		updateOrderStatusMutation,
	]);

	const successPayment = data?.updateStatus.paymentdetails?.find(
		(payment) =>
			payment.status === "COMPLETED" || payment.provider === "cashondelivery"
	);

	if (loading || !mounted) {
		return <PageLoader text="Order Status Loading" />;
	}

	if (error) {
		return (
			<Result
				heading={error.name}
				text={error.message}
				type="error"
				dump={error.stack}
			/>
		);
	}

	return (
		<SimpleGrid placeItems="center" minH="100vh">
			<Stack
				p={8}
				gap={{ base: 8, lg: 48 }}
				alignItems="center"
				justifyContent="space-between"
				my={{ base: 8, lg: 16 }}
				direction={["column", "row"]}
			>
				<VStack alignItems="flex-start" gap={6}>
					<VStack alignItems="flex-start" gap={2}>
						<HStack alignItems="flex-start">
							<Tooltip label="Payment Status" closeOnClick={false}>
								<Badge
									fontSize="xl"
									colorScheme={colorFromStatus(data?.updateStatus.status ?? "")}
									px={3}
									py={1}
								>
									PAYMENT {data?.updateStatus.paymentdetails?.[0].status}
								</Badge>
							</Tooltip>
						</HStack>
						<Heading fontSize="5xl" fontWeight="extrabold" lineHeight={1}>
							Thanks for ordering.
						</Heading>
						<Heading fontSize="lg" lineHeight={1}>
							Your Order is{" "}
							<Tooltip label="Order Status" closeOnClick={false}>
								<Text as="span">
									{capitalize(data?.updateStatus.status as string)}.{" "}
								</Text>
							</Tooltip>
							{successPayment?.provider === "cashondelivery" &&
								"You might recieve an phone call to confirm you order."}
						</Heading>
					</VStack>
					<VStack alignItems="flex-start">
						<Text fontSize="lg" fontWeight="semibold">
							Tracking Number
						</Text>
						<HStack>
							<Text>{data?.updateStatus.id}</Text>
							<Tooltip
								label={hasCopied ? "Copied!" : "Copy"}
								closeOnClick={false}
							>
								<IconButton
									aria-label="Copy Tracking Number"
									variant="ghost"
									icon={<MdOutlineContentCopy size={20} />}
									onClick={onCopy}
								/>
							</Tooltip>
						</HStack>
					</VStack>
					<Button as={Link} href={`/order/${data?.updateStatus.id}`}>
						View Order
					</Button>
					<Text w="full" fontSize="lg">
						Have a Problem? Contact our{" "}
						<UnderlineLink href="/account/helpcenter">
							Customer Support{" "}
						</UnderlineLink>
					</Text>
				</VStack>
				<Image
					h="60vh"
					maxW={{ base: "80vw", lg: "30vw" }}
					src={
						successPayment ? "/assets/order-placed.svg" : "/assets/bored.svg"
					}
				/>
			</Stack>
		</SimpleGrid>
	);
};

export default SuccessPage;
