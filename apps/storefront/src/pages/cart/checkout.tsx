/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-cycle */
import AddressForm from "@/components/pages/account/address/AddressForm";
import AddressSelector from "@/components/pages/cart/checkout/AddressSelector";
import OrderSummary from "@/components/pages/cart/checkout/OrderSummary";
import PaymentSelector from "@/components/pages/cart/checkout/PaymentSelector";
import ShippingMethod from "@/components/pages/cart/checkout/ShippingMethod";
import ModalButton from "@/components/ui/ModalButton";
import { useMeQuery } from "@/generated/graphql";
import {
	Stack,
	Box,
	Heading,
	HStack,
	VStack,
	useToast,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import * as Yup from "yup";

export interface CheckoutForm {
	addressId: string;
	shippingMethod: "express" | "standard";
	paymentMethod: "khalti" | "cashondelivery";
	promoCode: string;
}

const CheckutFormSchema = Yup.object({
	addressId: Yup.string().required("Select Delivery Address"),
	shippingMethod: Yup.string()
		.required("Select Shipping Method")
		.oneOf(["express", "standard"]),
	paymentMethod: Yup.string()
		.required("Select Payment Method")
		.oneOf(["khalti", "cashondelivery"]),
});

const CheckoutPage = () => {
	const { data } = useMeQuery();

	const toast = useToast();
	const bgColor = mode("gray.50", "gray.700");
	const {
		handleSubmit,
		watch,
		control,
		formState: { errors },
		setValue,
	} = useForm<CheckoutForm>({
		defaultValues: {
			addressId: undefined,
			shippingMethod: undefined,
			paymentMethod: "khalti",
			promoCode: "",
		},
		resolver: yupResolver(CheckutFormSchema),
	});
	const modalRef: any = useRef();

	const setPromoCode = (promoCode: string) => {
		setValue("promoCode", promoCode);
	};

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};

	const handleCheckout = async (values: CheckoutForm) => {
		console.log(values);

		const response = await fetch("/api/payment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				amount: 1300,
				purchase_order_id: "test12",
				purchase_order_name: "test",
				customer_info: {
					name: `${data?.me?.first_name} ${data?.me?.last_name}`,
					email: data?.me?.email,
					phone: data?.me?.phone_number ?? 9800000000,
				},
				amount_breakdown: [
					{
						label: "Delivery Charges",
						amount: 1000,
					},
					{
						label: "VAT",
						amount: 300,
					},
				],
				product_details: [
					{
						identity: "1234567890",
						name: "Delivery Charges",
						total_price: 1300,
						quantity: 1,
						unit_price: 1300,
					},
				],
			}),
		});

		const { pidx, payment_url } = await response.json();
		console.log(pidx);
		window.location.assign(payment_url);
	};

	if (errors) {
		if (!toast.isActive(Object.keys(errors)[0]) && Object.keys(errors)[0]) {
			toast({
				title: Object.values(errors)[0]?.message,
				status: "error",
				duration: 2000,
				isClosable: true,
				id: Object.keys(errors)[0],
			});
		}
	}

	return (
		<form onSubmit={handleSubmit(handleCheckout)}>
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

					<PaymentSelector control={control} />
				</VStack>
				<Box
					minW={["full", "full", "44%", "36%"]}
					mx={8}
					p={{ base: 2, md: 16 }}
					bg={bgColor}
				>
					<OrderSummary setFormPromoCode={setPromoCode} watch={watch} />
				</Box>
			</Stack>
		</form>
	);
};

export default CheckoutPage;
