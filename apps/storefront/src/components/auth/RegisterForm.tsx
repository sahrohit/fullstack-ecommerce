import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Stack,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import UnderlineLink from "@/components/ui/UnderlineLink";
import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";

type RegisterFormValues = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, dirtyFields },
	} = useForm<RegisterFormValues>({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
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
						isDirty={dirtyFields.firstName}
						name="firstName"
						size="lg"
						autoComplete="firstName"
						label={"First Name"}
						placeholder={""}
					/>
					<InputField
						register={{ ...register("lastName") }}
						error={errors.lastName}
						isDirty={dirtyFields.lastName}
						name="lastName"
						size="lg"
						autoComplete="lastName"
						label={"Last Name"}
						placeholder={""}
					/>
				</HStack>
				<InputField
					register={{ ...register("email") }}
					error={errors.email}
					isDirty={dirtyFields.email}
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
						isDirty={dirtyFields.password}
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
