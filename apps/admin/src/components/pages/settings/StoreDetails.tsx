import {
	Card,
	Stack,
	StackDivider,
	HStack,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Select,
	Textarea,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	useDetailsQuery,
	useTenantCategoriesQuery,
	useUpdateTenantMutation,
} from "@/generated/graphql";
import PageLoader from "@/components/shared/PageLoader";
import Result from "@/components/shared/Result";
import InputField from "@/components/ui/InputField";
import FieldGroup from "./FieldGroup";

interface DetailsFormValues {
	name: string;
	desc: string;
	categoryId: number;
	address: string;
}

const DetailsFormSchema = Yup.object({
	name: Yup.string().required(),
	desc: Yup.string().required(),
	categoryId: Yup.number().required(),
	address: Yup.string().required(),
});

const StoreDetails = () => {
	const toast = useToast();
	const {
		register: registerDetails,
		handleSubmit: handleDetailsSubmit,
		formState: {
			errors: detailErrors,
			touchedFields: detailTouchedFields,
			isDirty: detailsIsDirty,
		},
		reset: detailReset,
	} = useForm<DetailsFormValues>({
		defaultValues: {
			name: "",
			desc: "",
			categoryId: 0,
			address: "",
		},

		resolver: yupResolver(DetailsFormSchema),
	});

	const { loading, error } = useDetailsQuery({
		onCompleted: (detailsData) => {
			detailReset({
				name: detailsData?.details.name,
				desc: detailsData?.details.desc ?? "",
				categoryId: detailsData?.details.categoryId,
				address: detailsData?.details.address ?? "",
			});
		},
	});
	const {
		data: categories,
		loading: categoriesLoading,
		error: categoriesError,
	} = useTenantCategoriesQuery();

	const [updateTenant] = useUpdateTenantMutation({
		refetchQueries: ["Tenant"],
		onCompleted: () => {
			toast({
				title: "Store details updated",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		},

		onError: (detailsMutateError) => {
			toast({
				title: "Store details update failed",
				description: detailsMutateError.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

	if (loading) return <PageLoader />;

	if (error || categoriesError) {
		return (
			<Result
				type="error"
				heading={error ? error.name : categoriesError?.name!}
				text={error ? error.message : categoriesError?.message!}
				dump={error ? error.stack : categoriesError?.stack!}
			/>
		);
	}

	return (
		<Card p={4}>
			<Stack divider={<StackDivider />} spacing="6">
				<form
					onSubmit={handleDetailsSubmit((values) => {
						updateTenant({
							variables: values,
						});
					})}
				>
					<FieldGroup
						title="Store Details"
						description="Change your store details here"
					>
						<VStack>
							<HStack w="full">
								<InputField
									register={{ ...registerDetails("name") }}
									error={detailErrors.name}
									touched={detailTouchedFields.name}
									type="text"
									name="name"
									size="lg"
									autoComplete="firstName"
									label="Store Name"
									placeholder=""
									required
								/>
								<FormControl
									id="categoryId"
									isInvalid={
										!!detailErrors.categoryId && detailTouchedFields.categoryId
									}
								>
									<HStack justifyContent="space-between">
										<FormLabel>Business Category</FormLabel>
										<FormErrorMessage>
											{detailErrors.categoryId?.message}
										</FormErrorMessage>
									</HStack>
									<Select size="lg" {...registerDetails("categoryId")}>
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
							</HStack>
							<FormControl
								id="desc"
								isInvalid={!!detailErrors.desc && detailTouchedFields.desc}
							>
								<HStack justifyContent="space-between">
									<FormLabel>Business Category</FormLabel>
									<FormErrorMessage>
										{detailErrors.desc?.message}
									</FormErrorMessage>
								</HStack>
								<Textarea {...registerDetails("desc")} />
							</FormControl>
							<InputField
								register={{ ...registerDetails("address") }}
								error={detailErrors.address}
								touched={detailTouchedFields.address}
								type="text"
								name="address"
								size="lg"
								autoComplete="address"
								label="Store Address"
								placeholder=""
								required
							/>
							<Button
								isDisabled={!detailsIsDirty}
								alignSelf="flex-start"
								size="sm"
								fontWeight="normal"
								colorScheme="primary"
								type="submit"
							>
								Save Changes
							</Button>
						</VStack>
					</FieldGroup>
				</form>
			</Stack>
		</Card>
	);
};

export default StoreDetails;
