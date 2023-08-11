import { Button, Card, HStack, Stack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { BiMailSend } from "react-icons/bi";
import { useEmailInvoiceMutation } from "@/generated/graphql";
import InputField from "@/components/ui/InputField";

interface FormValues {
	email: string;
}

const EmailInvoiceFormSchema = Yup.object({
	email: Yup.string().email().required("Required"),
});

const EmailInvoice = ({ orderId }: { orderId: string }) => {
	const toast = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields, isSubmitting },
	} = useForm<FormValues>({
		defaultValues: {
			email: "",
		},
		resolver: yupResolver(EmailInvoiceFormSchema),
	});

	const [emailInvoiceMutation, { error }] = useEmailInvoiceMutation();

	return (
		<Card w="full" py="8" px={{ base: "4", md: "10" }} shadow="none">
			<form
				onSubmit={handleSubmit(async (values) => {
					const res = await emailInvoiceMutation({
						variables: {
							email: values.email,
							orderId,
						},
					});

					if (!res.data?.emailInvoice) {
						toast({
							title: "An Error Occured",
							description: error?.message ?? "Please try again later.",
							status: "error",
							duration: 4000,
							isClosable: true,
						});
					} else {
						toast({
							title: "Email sent",
							description: "We've sent you an email with an invoice.",
							status: "success",
							duration: 4000,
							isClosable: true,
						});
					}
				})}
			>
				<Stack spacing="6">
					<InputField
						register={{ ...register("email") }}
						error={errors.email}
						touched={touchedFields.email}
						name="email"
						type="email"
						size="lg"
						autoComplete="email"
						label="Email"
						placeholder="someone@example.com"
					/>
					<HStack w="full" justify="center">
						<Button
							type="submit"
							fontSize="md"
							colorScheme="blue"
							leftIcon={<BiMailSend fontSize={20} />}
							isLoading={isSubmitting}
						>
							Send Invoice
						</Button>
					</HStack>
				</Stack>
			</form>
		</Card>
	);
};

export default EmailInvoice;
