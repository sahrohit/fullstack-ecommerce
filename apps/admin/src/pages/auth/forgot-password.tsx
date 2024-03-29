import {
	Button,
	Card,
	Stack,
	Box,
	Heading,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { BiMailSend } from "react-icons/bi";
import { useEffect } from "react";
import { useForgotPasswordMutation } from "generated-graphql";
import { InputField, UnderlineLink, useLocalStorage } from "ui";

import Logo from "@/components/logo";
import withAuthPages from "@/routes/withAuthPages";
import { PROD } from "../../../constants";

const ForgotPasswordPage = () => (
	<Box
		bg={useColorModeValue("gray.50", "inherit")}
		minH="100vh"
		py="12"
		px={{ base: "4", lg: "8" }}
	>
		<Box maxW="md" mx="auto">
			<Logo mx="auto" h="8" mb={{ base: "10", md: "20" }} />
			<Heading textAlign="center" size="md" fontWeight="extrabold">
				Recover your account
			</Heading>
			<Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
				<Text as="span">Don&apos;t need a reset?</Text>{" "}
				<UnderlineLink href="/auth/login">Login</UnderlineLink>
			</Text>
			<Card
				py="8"
				px={{ base: "4", md: "10" }}
				shadow="base"
				rounded={{ sm: "lg" }}
			>
				<ForgotPasswordForm />
			</Card>
		</Box>
	</Box>
);

interface FormValues {
	email: string;
}

const ForgotPasswordFormSchema = Yup.object({
	email: Yup.string().email().required("Required"),
});

const ForgotPasswordForm = () => {
	const [timeOut, setTimeOut] = useLocalStorage("timeOut", 0);
	const [forgotPasswordMutation] = useForgotPasswordMutation();
	const toast = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields, isSubmitting },
	} = useForm<FormValues>({
		defaultValues: {
			email: "",
		},
		resolver: yupResolver(ForgotPasswordFormSchema),
	});

	useEffect(() => {
		const interval = setInterval(() => {
			if (timeOut >= 0) {
				setTimeOut(timeOut - 1);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [timeOut, setTimeOut]);

	return (
		<form
			onSubmit={handleSubmit(async (values) => {
				await forgotPasswordMutation({
					variables: {
						email: values.email,
					},
				});
				toast({
					title: "Email sent",
					description:
						"We've sent you an email with a link to reset your password.",
					status: "success",
					duration: 4000,
					isClosable: true,
				});

				setTimeOut(PROD ? 120 : 10);
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
				<Button
					type="submit"
					colorScheme="primary"
					size="lg"
					fontSize="md"
					leftIcon={<BiMailSend fontSize={20} />}
					isDisabled={timeOut > 1}
					isLoading={isSubmitting}
				>
					{timeOut > 0 ? `Resend again in ${timeOut}s` : "Send Email"}
				</Button>
			</Stack>
		</form>
	);
};

export default withAuthPages(ForgotPasswordPage);
