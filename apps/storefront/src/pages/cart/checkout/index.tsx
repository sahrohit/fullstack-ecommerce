/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-cycle */
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
import { useRouter } from "next/router";
import {
	useCreateOrderMutation,
	useCreatePaymentMutation,
} from "@/generated/graphql";
import ModalButton from "@/components/ui/ModalButton";
import AddressForm from "@/components/pages/account/address/AddressForm";
import AddressSelector from "@/components/pages/cart/checkout/AddressSelector";
import OrderSummary from "@/components/pages/cart/checkout/OrderSummary";
import PaymentSelector from "@/components/pages/cart/checkout/PaymentSelector";
import ShippingMethod from "@/components/pages/cart/checkout/ShippingMethod";

export interface CheckoutForm {
	addressId: string;
	shippingId: string;
	paymentMethod: "khalti" | "cashondelivery" | "esewa";
	promoCode: string;
}

const CheckutFormSchema = Yup.object({
	addressId: Yup.string().required("Select Delivery Address"),
	shippingId: Yup.string().required("Select Shipping Method"),
	paymentMethod: Yup.string()
		.required("Select Payment Method")
		.oneOf(["khalti", "cashondelivery", "esewa"]),
});

const CheckoutPage = () => {
	const router = useRouter();
	const [createOrderMutation] = useCreateOrderMutation();
	const [createPaymentMutation] = useCreatePaymentMutation();

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
			shippingId: undefined,
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
		const { data: createOrder } = await createOrderMutation({
			variables: {
				options: {
					addressId: Number(values.addressId),
					promoCode: values.promoCode,
					shippingId: Number(values.shippingId),
				},
			},
		});

		if (!createOrder?.createOrder) {
			toast({
				title: "Something went wrong",
				status: "error",
				duration: 2000,
			});
			return;
		}

		if (values.paymentMethod === "khalti") {
			const { data: createPayment } = await createPaymentMutation({
				variables: {
					orderId: createOrder.createOrder.id,
					provider: "khalti",
				},
			});

			if (!createPayment?.createPayment.paymentUrl) {
				toast({
					title: "Khalti Payment Failed",
					status: "error",
					duration: 2000,
				});
				return;
			}

			window.location.assign(createPayment?.createPayment.paymentUrl);
		} else if (values.paymentMethod === "esewa") {
			const { data: createPayment } = await createPaymentMutation({
				variables: {
					orderId: createOrder.createOrder.id,
					provider: "esewa",
				},
			});

			if (
				!createPayment?.createPayment.amt ||
				!createPayment?.createPayment.tAmt ||
				!createPayment?.createPayment.pid ||
				!createPayment?.createPayment.scd
			) {
				toast({
					title: "ESewa Payment Failed",
					status: "error",
					duration: 2000,
				});
				return;
			}

			const params = {
				amt: createPayment.createPayment.amt,
				psc: createPayment.createPayment.psc,
				pdc: createPayment.createPayment.pdc,
				txAmt: createPayment.createPayment.txAmt,
				tAmt: createPayment.createPayment.tAmt,
				pid: createPayment.createPayment.pid,
				scd: createPayment.createPayment.scd,
				su: `${process.env.CLIENT_URL}/cart/checkout/result`,
				fu: `${process.env.CLIENT_URL}/cart/checkout/result?orderId=${createOrder.createOrder.id}`,
			};

			const form = document.createElement("form");
			form.setAttribute("method", "POST");
			form.setAttribute("action", "https://uat.esewa.com.np/epay/main");

			Object.keys(params).forEach((key) => {
				const hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);
				hiddenField.setAttribute(
					"value",
					params[key as keyof typeof params] as string
				);
				form.appendChild(hiddenField);
			});

			document.body.appendChild(form);
			form.submit();
		} else if (values.paymentMethod === "cashondelivery") {
			const { data: createPayment } = await createPaymentMutation({
				variables: {
					orderId: createOrder.createOrder.id,
					provider: "cashondelivery",
				},
			});

			router.replace({
				pathname: `/cart/checkout/result`,
				query: {
					orderId: createOrder.createOrder.id,
					paymentId: createPayment?.createPayment.paymentId,
				},
			});
		}
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
		<form onSubmit={handleSubmit(handleCheckout)} id="checkout-form">
			<Stack w="full" direction={["column", "column", "row", "row", "row"]}>
				<VStack flexGrow={1} mx={{ base: 4, lg: 16 }} gap={4}>
					<Heading fontSize="2xl">Shipping Information</Heading>
					<HStack justifyContent="space-between" w="full">
						<Heading fontSize="xl" fontWeight="bold" lineHeight="1.2">
							Select Delivery Address
						</Heading>
						<ModalButton
							ref={modalRef}
							colorScheme="primary"
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

					<ShippingMethod control={control} />

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
