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
import InputField from "@/components/ui/InputField";

import UnderlineLink from "@/components/ui/UnderlineLink";
import Logo from "@/components/logo";
import withAuthPages from "@/routes/withAuthPages";
import { useChangePasswordMutation } from "@/generated/graphql";
import { useRouter } from "next/router";

const ResetPasswordPage = () => (
	<Box
		bg={useColorModeValue("gray.50", "inherit")}
		minH="100vh"
		py="12"
		px={{ base: "4", lg: "8" }}
	>
		<Box maxW="md" mx="auto">
			<Logo mx="auto" h="8" mb={{ base: "10", md: "20" }} />
			<Heading textAlign="center" size="md" fontWeight="extrabold">
				Update your password
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
				<ResetPasswordForm />
			</Card>
		</Box>
	</Box>
);

interface FormValues {
	password: string;
	confirmpassword: string;
}

const ResetPasswordFormSchema = Yup.object({
	password: Yup.string()
		.required("Required")
		.min(8, "Too Short")
		.max(20, "Too Long"),
	confirmpassword: Yup.string().oneOf(
		[Yup.ref("password"), null],
		"Passwords must match"
	),
});

const ResetPasswordForm = () => {
	const router = useRouter();
	const [forgotPasswordMutation] = useChangePasswordMutation();
	const toast = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields, isSubmitting },
	} = useForm<FormValues>({
		defaultValues: {
			password: "",
			confirmpassword: "",
		},
		resolver: yupResolver(ResetPasswordFormSchema),
	});

	return (
		<form
			onSubmit={handleSubmit(async (values) => {
				const response = await forgotPasswordMutation({
					variables: {
						newPassword: values.password,
						token: router.query.token as string,
					},
				});

				if (response.data?.changePassword.errors) {
					toast({
						title: "An error occurred.",
						description: response.data?.changePassword.errors[0].message,
						status: "error",
						duration: 4000,
						isClosable: true,
					});
				}

				if (response.data?.changePassword.user) {
					toast({
						title: "Your password has been changed.",
						description: "Logging you back in.",
						status: "success",
						duration: 4000,
						isClosable: true,
					});
					setTimeout(() => {
						router.push("/auth/login");
					}, 2000);
				}
			})}
		>
			<Stack spacing="6">
				<InputField
					register={{ ...register("password") }}
					error={errors.password}
					touched={touchedFields.password}
					name="Password"
					type="password"
					size="lg"
					autoComplete="new-password"
					label="Password"
					placeholder=""
				/>
				<InputField
					register={{ ...register("confirmpassword") }}
					error={errors.confirmpassword}
					touched={touchedFields.confirmpassword}
					name="confirmpassword"
					type="password"
					size="lg"
					autoComplete="confirm-password"
					label="Confirm Password"
					placeholder=""
				/>
				<Button
					type="submit"
					colorScheme="blue"
					size="lg"
					fontSize="md"
					isLoading={isSubmitting}
				>
					Change Password
				</Button>
				<Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
					<Text as="span">Not working ?</Text>{" "}
					<UnderlineLink href="/auth/forgot-password">
						Resend Password Reset Email
					</UnderlineLink>
				</Text>
			</Stack>
		</form>
	);
};

export default withAuthPages(ResetPasswordPage);
