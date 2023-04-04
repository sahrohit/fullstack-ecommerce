import {
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Input,
	LightMode,
	Stack,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { Link, type LinkProps } from "@chakra-ui/next-js";
import InputField from "../ui/InputField";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
	email: string;
	password: string;
}

const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, dirtyFields },
	} = useForm<FormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing="-px">
				<InputField
					register={{ ...register("email") }}
					error={errors.email}
					isDirty={dirtyFields.email}
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
					isDirty={dirtyFields.password}
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

export const UnderlineLink = (props: LinkProps) => {
	return (
		<Link
			as="a"
			pos="relative"
			display="inline-block"
			transition="opacity 0.2s"
			_hover={{ opacity: 0.8 }}
			_after={{
				content: `""`,
				display: "block",
				w: "full",
				h: "2px",
				bottom: 0,
				bg: "blue.500",
				insetX: 0,
				insetY: 0,
			}}
			{...props}
		/>
	);
};
