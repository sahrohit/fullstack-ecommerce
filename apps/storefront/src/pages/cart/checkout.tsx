import AddressForm from "@/components/pages/account/address/AddressForm";
import AddressSelection from "@/components/pages/cart/checkout/AddressSelection";
import ModalButton from "@/components/ui/ModalButton";
import { Stack, Button, Box, Heading, HStack } from "@chakra-ui/react";
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
			<Box flexGrow={1} mx={{ base: 4, lg: 16 }}>
				<Heading fontSize="2xl">Shipping Information</Heading>
				<HStack justifyContent="space-between" w="full">
					<Heading fontSize="xl">Select Delivery Address</Heading>
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
				<AddressSelection />
			</Box>
			<Box minW={["full", "full", "50%", "40%"]} bg="Background" m={8}>
				<Button onClick={() => router.push("/cart")}>Go to cart</Button>
			</Box>
		</Stack>
	);
};

export default CheckoutPage;
