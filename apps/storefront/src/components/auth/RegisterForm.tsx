import { Button, FormControl, HStack, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type RegisterFormValues = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

const RegisterFormSchema = Yup.object({
	firstName: Yup.string().required("Required"),
	lastName: Yup.string().required("Required"),
	email: Yup.string().email().required("Required"),
	password: Yup.string()
		.required("Required")
		.min(8, "Too Short")
		.max(20, "Too Long"),
});

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, touchedFields },
	} = useForm<RegisterFormValues>({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
		resolver: yupResolver(RegisterFormSchema),
	});

	return (
		<form
			onSubmit={handleSubmit((data) => {
				console.log(data);
			})}
		>
			<Stack spacing="4">
				<HStack gap={3}>
					<InputField
						register={{ ...register("firstName") }}
						error={errors.firstName}
						touched={touchedFields.firstName}
						type="text"
						name="firstName"
						size="lg"
						autoComplete="firstName"
						label={"First Name"}
						placeholder={""}
					/>
					<InputField
						register={{ ...register("lastName") }}
						error={errors.lastName}
						touched={touchedFields.lastName}
						name="lastName"
						type="text"
						size="lg"
						autoComplete="lastName"
						label={"Last Name"}
						placeholder={""}
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
					label={"Email"}
					placeholder={""}
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
						label={"Password"}
						placeholder={""}
					/>
				</FormControl>
				<Button type="submit" colorScheme="blue" size="lg" fontSize="md">
					Create my account
				</Button>
			</Stack>
		</form>
	);
};

export default RegisterForm;
