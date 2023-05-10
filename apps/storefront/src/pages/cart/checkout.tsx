import AddressForm from "@/components/pages/account/address/AddressForm";
import AddressSelector from "@/components/pages/cart/checkout/AddressSelector";
import PaymentSelector from "@/components/pages/cart/checkout/PaymentSelector";
import ShippingMethod from "@/components/pages/cart/checkout/ShippingMethod";
import ModalButton from "@/components/ui/ModalButton";
import { Stack, Button, Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { IoAdd } from "react-icons/io5";

const CheckoutPage = () => {
	const router = useRouter();
	const modalRef: any = useRef();

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};

	return (
		<Stack w="full" direction={["column", "column", "row", "row", "row"]}>
			<VStack flexGrow={1} mx={{ base: 4, lg: 16 }} gap={4}>
				<Heading fontSize="2xl">Shipping Information</Heading>
				<HStack justifyContent="space-between" w="full">
					<Heading fontSize="xl" fontWeight="bold" lineHeight="1.2">
						Select Delivery Address
					</Heading>
					<ModalButton
						ref={modalRef}
						colorScheme="blue"
						leftIcon={<IoAdd />}
						buttonText="Add Address"
						modalHeader="Add Address"
						modalFooter=" "
						size="sm"
					>
						<AddressForm onSubmissionSuccess={closeModal} />
					</ModalButton>
				</HStack>
				<AddressSelector />

				<ShippingMethod
					options={[
						{
							title: "Standard $4.99",
							desc: "Dispatched in 1-2 days",
							value: "standard",
						},
						{
							title: "Express $14.99",
							desc: "Dispatched in 24 hours",
							value: "express",
						},
					]}
					onChange={(val) => console.log(val)}
				/>

				<PaymentSelector />
			</VStack>
			<Box minW={["full", "full", "50%", "40%"]} bg="Background" m={8}>
				<Button onClick={() => router.push("/cart")}>Go to cart</Button>
			</Box>
		</Stack>
	);
};

export default CheckoutPage;
