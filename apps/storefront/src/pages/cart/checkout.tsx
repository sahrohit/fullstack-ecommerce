/* eslint-disable import/no-cycle */
import AddressForm from "@/components/pages/account/address/AddressForm";
import AddressSelector from "@/components/pages/cart/checkout/AddressSelector";
import OrderSummary from "@/components/pages/cart/checkout/OrderSummary";
import PaymentSelector from "@/components/pages/cart/checkout/PaymentSelector";
import ShippingMethod from "@/components/pages/cart/checkout/ShippingMethod";
import ModalButton from "@/components/ui/ModalButton";
import { Stack, Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import * as Yup from "yup";

export interface CheckoutForm {
	addressId: string;
	shippingMethod: "express" | "standard";
	paymentMethod: "khalti" | "cashondelivery";
}

const CheckutFormSchema = Yup.object({
	addressId: Yup.string().required(),
	shippingMethod: Yup.string().required().oneOf(["express", "standard"]),
	paymentMethod: Yup.string().required().oneOf(["khalti", "cashondelivery"]),
});

const CheckoutPage = () => {
	const {
		handleSubmit,

		control,
	} = useForm<CheckoutForm>({
		defaultValues: {
			addressId: undefined,
			shippingMethod: undefined,
			paymentMethod: "khalti",
		},
		resolver: yupResolver(CheckutFormSchema),
	});

	const modalRef: any = useRef();

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};

	return (
		<form onSubmit={handleSubmit((values) => console.log(values))}>
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
					<AddressSelector control={control} />

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
						control={control}
					/>

					<PaymentSelector />
				</VStack>
				<Box minW={["full", "full", "50%", "40%"]} bg="Background" m={8}>
					<OrderSummary />
				</Box>
			</Stack>
		</form>
	);
};

export default CheckoutPage;
