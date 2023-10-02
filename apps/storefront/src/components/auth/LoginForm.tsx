import {
	Button,
	Checkbox,
	Flex,
	LightMode,
	Stack,
	useColorModeValue as mode,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLoginMutation } from "generated-graphql";
import UnderlineLink from "@/components/ui/UnderlineLink";
import InputField from "../ui/InputField";

interface FormValues {
	email: string;
	password: string;
}

const LoginFormSchema = Yup.object({
	email: Yup.string().email().required("Required"),
	password: Yup.string()
		.required("Required")
		.min(8, "Too Short")
		.max(20, "Too Long"),
});

const LoginForm = () => {
	const toast = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
		setError,
	} = useForm<FormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(LoginFormSchema),
	});
	const [loginMutation, { loading }] = useLoginMutation({
		onCompleted: (data) => {
			const { errors: userErrors, user } = data.login;
			if (userErrors) {
				toast({
					title: "Login Failed",
					description: userErrors[0].message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
				setError(userErrors[0].field as "email" | "password", {
					type: "manual",
					message: userErrors[0].message,
				});
			} else {
				toast({
					title: "Login successful",
					description: `Welcome back, ${user?.first_name}!`,
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			}
		},
		onError: (error) => {
			toast({
				title: "Login Failed",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
		refetchQueries: ["Me"],
	});

	return (
		<form
			onSubmit={handleSubmit((values) =>
				loginMutation({
					variables: {
						email: values.email,
						password: values.password,
					},
				})
			)}
		>
			<Stack spacing="-px">
				<InputField
					register={{ ...register("email") }}
					error={errors.email}
					touched={dirtyFields.email}
					showErrorMessage={false}
					showLabel={false}
					required
					name="email"
					type="email"
					label="Email address"
					autoComplete="email"
					placeholder="Email address"
					size="lg"
					bg={mode("white", "gray.700")}
					fontSize="md"
					roundedBottom="0"
				/>
				<InputField
					register={{ ...register("password") }}
					error={errors.password}
					touched={dirtyFields.password}
					showErrorMessage={false}
					showLabel={false}
					label="Password"
					name="password"
					type="password"
					autoComplete="current-password"
					required
					size="lg"
					bg={mode("white", "gray.700")}
					fontSize="md"
					roundedTop="0"
					placeholder="Password"
				/>
			</Stack>
			<Flex align="center" justify="space-between" mt="8">
				<LightMode>
					<Checkbox
						size="lg"
						colorScheme="primary"
						sx={{
							".chakra-checkbox__control": {
								"&:not([data-checked])": { bg: mode("white", "gray.700") },
								rounded: "base",
								borderWidth: "1px",
							},
							".chakra-checkbox__label": { fontSize: "sm" },
						}}
					>
						Remember me
					</Checkbox>
				</LightMode>
				<UnderlineLink href="/auth/forgot-password" fontSize="sm">
					Forgot Password?
				</UnderlineLink>
			</Flex>
			<LightMode>
				<Button
					isLoading={loading}
					size="lg"
					type="submit"
					mt="8"
					w="full"
					colorScheme="primary"
					fontSize="md"
					fontWeight="bold"
				>
					Sign in
				</Button>
			</LightMode>
		</form>
	);
};

export default LoginForm;
