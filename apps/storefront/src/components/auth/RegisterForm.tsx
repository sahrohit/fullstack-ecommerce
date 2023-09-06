import { useRegisterMutation } from "@/generated/graphql";
import { Button, FormControl, HStack, Stack, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import InputField from "@/components/ui/InputField";

type RegisterFormValues = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
};

const RegisterFormSchema = Yup.object({
	first_name: Yup.string().required("Required"),
	last_name: Yup.string().required("Required"),
	email: Yup.string().email().required("Required"),
	password: Yup.string()
		.required("Required")
		.min(8, "Too Short")
		.max(20, "Too Long"),
});

const RegisterForm = () => {
	const toast = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
		setError,
	} = useForm<RegisterFormValues>({
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
		},
		resolver: yupResolver(RegisterFormSchema),
	});

	const [registerMutation] = useRegisterMutation({
		onCompleted: (data) => {
			const { errors: userErrors, user } = data.register;
			if (userErrors) {
				toast({
					title: "Registration Failed",
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
					title: `Registration successful, ${user?.first_name}`,
					description: `Please verify your email address to continue.`,
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			}
		},
		onError: (error) => {
			toast({
				title: "Registration Failed",
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
			onSubmit={handleSubmit((values) => {
				registerMutation({
					variables: {
						options: values,
					},
				});
			})}
		>
			<Stack spacing="4">
				<HStack gap={3}>
					<InputField
						register={{ ...register("first_name") }}
						error={errors.first_name}
						touched={touchedFields.first_name}
						type="text"
						name="first_name"
						size="lg"
						autoComplete="firstName"
						label="First Name"
						placeholder=""
					/>
					<InputField
						register={{ ...register("last_name") }}
						error={errors.last_name}
						touched={touchedFields.last_name}
						name="last_name"
						type="text"
						size="lg"
						autoComplete="lastName"
						label="Last Name"
						placeholder=""
					/>
				</HStack>
				<InputField
					register={{ ...register("email") }}
					error={errors.email}
					touched={touchedFields.email}
					name="email"
					size="lg"
					type="email"
					autoComplete="email"
					label="Email"
					placeholder=""
				/>

				<FormControl>
					<InputField
						register={{ ...register("password") }}
						error={errors.password}
						touched={touchedFields.password}
						name="password"
						size="lg"
						type="password"
						autoComplete="current-password"
						label="Password"
						placeholder=""
					/>
				</FormControl>
				<Button type="submit" colorScheme="primary" size="lg" fontSize="md">
					Create my account
				</Button>
			</Stack>
		</form>
	);
};

export default RegisterForm;
