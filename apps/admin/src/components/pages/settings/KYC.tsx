/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
import {
	Card,
	Stack,
	StackDivider,
	HStack,
	Button,
	VStack,
	useToast,
	Alert,
	AlertIcon,
	Box,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	useRequestKycVerficationMutation,
	useTenantKycQuery,
} from "generated-graphql";
import PageLoader from "@/components/shared/PageLoader";
import { Result, InputField, capitalize, ConfirmationModal } from "ui";
import FileUploadInputField from "@/components/ui/FileUploadInputField";
import FieldGroup from "./FieldGroup";
import { BRAND_NAME } from "../../../../constants";

interface KYCFormValues {
	name: string;
	address: string;
	phone_number: string;
	pan_number: string;
	bank_name: string;
	bank_branch: string;
	account_number: string;
	account_name: string;
	registration_document: string;
	pan_document: string;
}

const KYCFormSchema = Yup.object({
	name: Yup.string().required("Required"),
	address: Yup.string().required("Required"),
	phone_number: Yup.string().required("Required"),
	pan_number: Yup.string().required("Required"),
	bank_name: Yup.string().required("Required"),
	bank_branch: Yup.string().required("Required"),
	account_number: Yup.string().required("Required"),
	account_name: Yup.string().required("Required"),
	registration_document: Yup.string().url().required("Required"),
	pan_document: Yup.string().url().required("Required"),
});

const TenantKYC = () => {
	const toast = useToast();
	const {
		register: registerKYC,
		handleSubmit: handleKYCSubmit,
		formState: { errors: kycErrors, touchedFields: kycTouchedFields },
		reset: kycReset,
		setValue: kycSetValue,
		watch,
	} = useForm<KYCFormValues>({
		defaultValues: {
			name: "",
			address: "",
			phone_number: "",
			pan_number: "",
			bank_name: "",
			bank_branch: "",
			account_number: "",
			account_name: "",
			registration_document: "",
			pan_document: "",
		},
		resolver: yupResolver(KYCFormSchema),
	});

	const { data, loading, error } = useTenantKycQuery({
		onCompleted: (kycData) => {
			kycReset({
				name: kycData?.tenantKYC?.name ?? "",
				address: kycData?.tenantKYC?.address ?? "",
				phone_number: kycData?.tenantKYC?.phone_number ?? "",
				pan_number: kycData?.tenantKYC?.pan_number ?? "",
				bank_name: kycData?.tenantKYC?.bank_name ?? "",
				bank_branch: kycData?.tenantKYC?.bank_branch ?? "",
				account_number: kycData?.tenantKYC?.account_number ?? "",
				account_name: kycData?.tenantKYC?.account_name ?? "",
				registration_document: kycData?.tenantKYC?.registration_document ?? "",
				pan_document: kycData?.tenantKYC?.pan_document ?? "",
			});
		},
	});

	const [requestKYCVerification] = useRequestKycVerficationMutation({
		refetchQueries: ["TenantKYC"],
		onCompleted: () => {
			toast({
				title: "KYC Verification Rquested",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		},
		onError: (kycMutateError) => {
			toast({
				title: "KYC Verification Request Failed",
				description: kycMutateError.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

	const { registration_document, pan_document } = watch();

	if (loading) return <PageLoader />;

	if (error) {
		return (
			<Result
				type="error"
				heading={error.name}
				text={error.message}
				dump={error.stack}
			/>
		);
	}

	const { status, text, canSubmitDirectly } = kycStatusToText(
		data?.tenantKYC?.status ?? "NOT_SUBMITTED"
	);

	return (
		<Card p={4}>
			<Stack divider={<StackDivider />} spacing="6">
				<FieldGroup
					title="KYC Verification Form"
					description="This verfication will open even more opportunities for you"
				>
					<form
						id="kyc-verification-form"
						onSubmit={handleKYCSubmit((values) => {
							requestKYCVerification({
								variables: {
									options: values,
								},
							});
						})}
					>
						<VStack gap={3}>
							<Alert status={status}>
								<AlertIcon boxSize="32px" />
								<Box>
									<AlertTitle fontSize="xl">
										{capitalize(
											(data?.tenantKYC?.status ?? "NOT_SUBMITTED").replace(
												"_",
												" "
											)
										)}
									</AlertTitle>
									<AlertDescription>{text}</AlertDescription>
								</Box>
							</Alert>

							<HStack w="full" flexDirection={{ base: "column", lg: "row" }}>
								<InputField
									register={{ ...registerKYC("name") }}
									error={kycErrors.name}
									touched={kycTouchedFields.name}
									type="text"
									name="name"
									size="lg"
									autoComplete="name"
									label="Business Name"
									placeholder={`${BRAND_NAME} Pvt. Ltd.`}
								/>
								<InputField
									register={{ ...registerKYC("pan_number") }}
									error={kycErrors.pan_number}
									touched={kycTouchedFields.pan_number}
									type="text"
									name="pan_number"
									size="lg"
									autoComplete="pan_number"
									label="Business PAN Number"
									placeholder="1234567890"
								/>
							</HStack>
							<InputField
								register={{ ...registerKYC("address") }}
								error={kycErrors.address}
								touched={kycTouchedFields.address}
								type="text"
								name="address"
								size="lg"
								autoComplete="address"
								label="Business Address"
								placeholder="Tikathali, Lalitpur"
							/>
							<HStack w="full" flexDirection={{ base: "column", lg: "row" }}>
								<InputField
									register={{ ...registerKYC("phone_number") }}
									error={kycErrors.phone_number}
									touched={kycTouchedFields.phone_number}
									type="text"
									name="phone_number"
									size="lg"
									autoComplete="phone_number"
									label="Business Phone Number"
									placeholder="98000000000"
								/>
							</HStack>
							<HStack w="full" flexDirection={{ base: "column", lg: "row" }}>
								<InputField
									register={{ ...registerKYC("bank_name") }}
									error={kycErrors.bank_name}
									touched={kycTouchedFields.bank_name}
									type="text"
									name="bank_name"
									size="lg"
									autoComplete="bank_name"
									label="Business Bank Name"
									placeholder="NIC ASIA Bank"
								/>
								<InputField
									register={{ ...registerKYC("bank_branch") }}
									error={kycErrors.bank_branch}
									touched={kycTouchedFields.bank_branch}
									type="text"
									name="bank_branch"
									size="lg"
									autoComplete="bank_branch"
									label="Business Bank Branch"
									placeholder="Balkot Branch"
								/>
							</HStack>
							<HStack w="full" flexDirection={{ base: "column", lg: "row" }}>
								<InputField
									register={{ ...registerKYC("account_name") }}
									error={kycErrors.account_name}
									touched={kycTouchedFields.account_name}
									type="text"
									name="account_name"
									size="lg"
									autoComplete="account_name"
									label="Business Account Name"
									placeholder={`${BRAND_NAME} Pvt. Ltd.`}
								/>
								<InputField
									register={{ ...registerKYC("account_number") }}
									error={kycErrors.account_number}
									touched={kycTouchedFields.account_number}
									type="text"
									name="account_number"
									size="lg"
									autoComplete="account_number"
									label="Business Account Number"
									placeholder="12345678901234567890"
								/>
							</HStack>
							<HStack
								w="full"
								alignItems="flex-start"
								flexDirection={{ base: "column", lg: "row" }}
							>
								<FileUploadInputField
									error={kycErrors.registration_document}
									label="Registration Document"
									name="registration_document"
									onResetField={() => {
										kycSetValue("registration_document", "");
									}}
									onUploadComplete={(res) => {
										kycSetValue("registration_document", res?.[0].url ?? "");
									}}
									value={registration_document}
								/>
								<FileUploadInputField
									error={kycErrors.pan_document}
									label="Pan/VAT Document"
									name="pan_document"
									onResetField={() => {
										kycSetValue("pan_document", "");
									}}
									onUploadComplete={(res) => {
										kycSetValue("pan_document", res?.[0].url ?? "");
									}}
									value={pan_document}
								/>
							</HStack>
							{canSubmitDirectly ? (
								<Button
									size="sm"
									alignSelf="flex-start"
									fontWeight="normal"
									colorScheme="primary"
									type="submit"
								>
									Request KYC Verification
								</Button>
							) : (
								<ConfirmationModal
									size="sm"
									alignSelf="flex-start"
									fontWeight="normal"
									colorScheme="primary"
									confirmButtonProps={{
										type: "submit",
										colorScheme: "primary",
										form: "kyc-verification-form",
									}}
									onSuccess={() => {}}
									headerText="KYC Verification Re-Request"
									bodyText={`Your KYC is already verified. Are you sure you want to re-request it? ⚠️ You'll lose the verified status`}
								>
									Re-request KYC Verification
								</ConfirmationModal>
							)}
						</VStack>
					</form>
				</FieldGroup>
			</Stack>
		</Card>
	);
};

export default TenantKYC;

const kycStatusToText = (
	status: string
): {
	canSubmitDirectly: boolean;
	status: "info" | "warning" | "success" | "error" | "loading" | undefined;
	text: string;
} => {
	switch (status) {
		case "VERIFIED":
			return {
				canSubmitDirectly: false,
				status: "success",
				text: "KYC is successfully verified. You have access to all the perks. Resubmitting this form will remove your verified status.",
			};
		case "IN_PROGRESS":
			return {
				canSubmitDirectly: false,
				status: "warning",
				text: "We are verifying your KYC. You will get the green tick in no time. Resubmitting this form will push your request to the back of the queue.",
			};
		case "FAILED":
			return {
				canSubmitDirectly: true,
				status: "error",
				text: "There was an issue with you verification request. Please retry submitting.",
			};
		default:
			return {
				canSubmitDirectly: true,
				status: "info",
				text: "Submit you KYC Verification Request to get verified and get access to all the perks.",
			};
	}
};
