import * as Yup from "yup";
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Icon,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	Select,
	Stack,
	Switch,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiFillShop, AiOutlineUser } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import {
	useAdminRegisterMutation,
	useTenantCategoriesQuery,
} from "generated-graphql";
import { List, ListItem, InputField, Result } from "ui";
import { BRAND_NAME } from "../../../constants";

type RegisterFormValues = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	tenant_name: string;
	tenant_category_id: number;
	subdomain: string;
	alreadyAUser: boolean;
};

const RegisterFormSchema = Yup.object({
	first_name: Yup.string().when("alreadyAUser", {
		is: false,
		then: Yup.string().required("Required"),
	}),
	last_name: Yup.string(),
	email: Yup.string().email().required("Required"),
	password: Yup.string()
		.required("Required")
		.min(8, "Too Short")
		.max(20, "Too Long"),
	tenant_name: Yup.string().required("Required"),
	tenant_category_id: Yup.number().required("Required"),
	subdomain: Yup.string()
		.required("Required")
		.matches(/^[a-z0-9-]{1,63}$/, "Invalid Domain"),
	alreadyAUser: Yup.boolean(),
});

const RegisterForm = () => {
	const toast = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
		setError,
		watch,
		reset,
	} = useForm<RegisterFormValues>({
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			tenant_name: "",
			tenant_category_id: 1,
			subdomain: "",
		},
		resolver: yupResolver(RegisterFormSchema),
	});

	const {
		data: categories,
		loading: categoriesLoading,
		error: categoriesError,
	} = useTenantCategoriesQuery();

	const { alreadyAUser } = watch();

	const [registerMutation] = useAdminRegisterMutation({
		onCompleted: (data) => {
			const { errors: userErrors, user } = data.adminRegister;
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
				reset();
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
		refetchQueries: ["MeStaff"],
	});

	if (categoriesError)
		return (
			<Result
				heading={categoriesError.name}
				text={categoriesError.message}
				type="error"
				dump={categoriesError.stack}
			/>
		);

	return (
		<form
			onSubmit={handleSubmit(async (values) => {
				await registerMutation({
					variables: {
						options: {
							email: values.email,
							password: values.password,
							first_name: values.first_name,
							last_name: values.last_name,
							tenant_name: values.tenant_name,
							tenant_category_id: values.tenant_category_id,
							subdomain: values.subdomain,
						},
					},
				});
			})}
		>
			<Box
				mx="auto"
				maxW="full"
				py="10"
				px={{ base: "6", md: "8" }}
				minH="400px"
			>
				<List spacing="12" w="full">
					<ListItem
						title="Business Details"
						subTitle="Details about your business"
						icon={<Icon as={AiFillShop} boxSize="6" />}
					>
						<VStack w="full">
							<Stack w="full" direction={["column", "row"]}>
								<InputField
									register={{ ...register("tenant_name") }}
									error={errors.tenant_name}
									touched={touchedFields.tenant_name}
									type="text"
									name="tenant_name"
									size="lg"
									autoComplete="firstName"
									label="Business Name"
									placeholder=""
									required
								/>
								<FormControl
									id="tenant_category_id"
									isInvalid={
										!!errors.tenant_category_id &&
										touchedFields.tenant_category_id
									}
								>
									<HStack justifyContent="space-between">
										<FormLabel>Business Category</FormLabel>
										<FormErrorMessage>
											{errors.tenant_category_id?.message}
										</FormErrorMessage>
									</HStack>
									<Select size="lg" {...register("tenant_category_id")}>
										{categoriesLoading
											? ["Loading..."].map(() => (
													<option
														key="tenant-category-option-loading"
														value={1}
													>
														Loading...
													</option>
											  ))
											: categories?.tenantCategories.map((category) => (
													<option key={category.identifier} value={category.id}>
														{category.name}
													</option>
											  ))}
									</Select>
								</FormControl>
							</Stack>
							<FormControl
								id="subdomain"
								isInvalid={!!errors.subdomain && touchedFields.subdomain}
							>
								<HStack justifyContent="space-between">
									<FormLabel>Domain</FormLabel>
									<FormErrorMessage>
										{errors.subdomain?.message}
									</FormErrorMessage>
								</HStack>
								<InputGroup>
									<InputLeftAddon display={["none", "flex", "flex", "flex"]}>
										https://
									</InputLeftAddon>
									<Input {...register("subdomain")} />
									<InputRightAddon>.rudejellyfish.live</InputRightAddon>
								</InputGroup>
							</FormControl>
						</VStack>
					</ListItem>

					<ListItem
						title={`Already a ${BRAND_NAME} User? ${
							alreadyAUser ? "Yes" : "No"
						}`}
						subTitle={`Please check this box, if you already have a ${BRAND_NAME} account. You might have logged into platforms powered by ${BRAND_NAME}.`}
						icon={<Icon as={AiOutlineUser} boxSize="6" />}
					>
						<FormControl display="flex" alignItems="center">
							<FormLabel htmlFor="email-alerts" mb="0">
								Already have an account?
							</FormLabel>
							<Switch id="already-user" {...register("alreadyAUser")} />
						</FormControl>
					</ListItem>

					<ListItem
						title="Credentials"
						subTitle={
							alreadyAUser
								? `Credentials you used, to access other stores powered by ${BRAND_NAME} `
								: "New Credentials for you, to access your account."
						}
						icon={<Icon as={MdPassword} boxSize="6" />}
					>
						<VStack w="full">
							{!alreadyAUser ? (
								<Stack w="full" direction={["column", "row"]}>
									<InputField
										hidden={alreadyAUser}
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
										hidden={alreadyAUser}
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
								</Stack>
							) : null}
							<Stack w="full" direction={["column", "row"]}>
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
								<InputField
									register={{ ...register("password") }}
									error={errors.password}
									touched={touchedFields.password}
									name="password"
									size="lg"
									type="password"
									autoComplete={
										alreadyAUser ? "current-password" : "new-password"
									}
									label={alreadyAUser ? "Password" : "New Password"}
									placeholder=""
								/>
							</Stack>
						</VStack>
					</ListItem>
					<Button type="submit" colorScheme="primary">
						Create New Store
					</Button>
				</List>
			</Box>
		</form>
	);
};

export default RegisterForm;
