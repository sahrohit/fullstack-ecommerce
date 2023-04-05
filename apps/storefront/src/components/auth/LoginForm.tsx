import {
	Button,
	Checkbox,
	Flex,
	LightMode,
	Stack,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import InputField from "../ui/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import UnderlineLink from "@/components/ui/UnderlineLink";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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

const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
	} = useForm<FormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(LoginFormSchema),
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
						colorScheme="blue"
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
					Forgot Password
				</UnderlineLink>
			</Flex>
			<LightMode>
				<Button
					size="lg"
					type="submit"
					mt="8"
					w="full"
					colorScheme="blue"
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
