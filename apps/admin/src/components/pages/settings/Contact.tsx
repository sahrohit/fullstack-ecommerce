import {
	Card,
	Stack,
	StackDivider,
	HStack,
	Button,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	useTenantContactsQuery,
	useUpdateTenantContactMutation,
} from "@/generated/graphql";
import PageLoader from "@/components/shared/PageLoader";
import Result from "@/components/shared/Result";
import InputField from "@/components/ui/InputField";
import FieldGroup from "./FieldGroup";

interface SupportFormValues {
	primary: string;
	secondary: string;
	ntc: string;
	ncell: string;
	whatsapp: string;
	viber: string;
}

interface SocialFormValues {
	facebook: string;
	instagram: string;
	tiktok: string;
	twitter: string;
}

const SupportFormSchema = Yup.object({
	primary: Yup.string().required("Required"),
	secondary: Yup.string(),
	ntc: Yup.string(),
	ncell: Yup.string(),
	whatsapp: Yup.string(),
	viber: Yup.string(),
});

const SocialFormSchema = Yup.object({
	facebook: Yup.string().url(),
	instagram: Yup.string().url(),
	tiktok: Yup.string().url(),
	twitter: Yup.string().url(),
});

const StoreContacts = () => {
	const toast = useToast();
	const {
		register: registerSupport,
		handleSubmit: handleSupportSubmit,
		formState: {
			errors: supportErrors,
			touchedFields: supportTouchedFields,
			isDirty: supportIsDirty,
		},
		reset: supportReset,
	} = useForm<SupportFormValues>({
		defaultValues: {
			primary: "",
			secondary: "",
			ntc: "",
			ncell: "",
			whatsapp: "",
			viber: "",
		},
		resolver: yupResolver(SupportFormSchema),
	});

	const {
		register: registerSocial,
		handleSubmit: handleSocialSubmit,
		formState: {
			errors: socialErrors,
			touchedFields: socialTouchedFields,
			isDirty: socialIsDirty,
		},
		reset: socialReset,
	} = useForm<SocialFormValues>({
		defaultValues: {
			facebook: "",
			instagram: "",
			tiktok: "",
			twitter: "",
		},
		resolver: yupResolver(SocialFormSchema),
	});

	const { data, loading, error } = useTenantContactsQuery({
		onCompleted: (supportsData) => {
			supportReset({
				primary: supportsData?.tenantContacts?.primary,
				secondary: supportsData?.tenantContacts?.secondary ?? "",
				ntc: supportsData?.tenantContacts?.ntc ?? "",
				ncell: supportsData?.tenantContacts?.ncell ?? "",
				whatsapp: supportsData?.tenantContacts?.whatsapp ?? "",
				viber: supportsData?.tenantContacts?.viber ?? "",
			});
			socialReset({
				facebook: supportsData?.tenantContacts?.facebook ?? "",
				instagram: supportsData?.tenantContacts?.instagram ?? "",
				tiktok: supportsData?.tenantContacts?.tiktok ?? "",
				twitter: supportsData?.tenantContacts?.twitter ?? "",
			});
		},
	});

	const [updateTenantContact] = useUpdateTenantContactMutation({
		refetchQueries: ["Tenant"],
		onCompleted: () => {
			toast({
				title: "Tenant Contacts updated",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		},

		onError: (supportsMutateError) => {
			toast({
				title: "Tenant Contact update failed",
				description: supportsMutateError.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

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

	return (
		<Card p={4}>
			<Stack divider={<StackDivider />} spacing="6">
				<FieldGroup
					title="Customer Support"
					description="List of your helplines, ready to help"
				>
					<form
						onSubmit={handleSupportSubmit((values) => {
							updateTenantContact({
								variables: {
									option: {
										primary: values.primary,
										secondary: values.secondary,
										ntc: values.ntc,
										ncell: values.ncell,
										whatsapp: values.whatsapp,
										viber: values.viber,
										facebook: data?.tenantContacts.facebook,
										instagram: data?.tenantContacts.instagram,
										tiktok: data?.tenantContacts.tiktok,
										twitter: data?.tenantContacts.twitter,
									},
								},
							});
						})}
					>
						<VStack gap={3}>
							<HStack w="full" flexDirection={{ base: "column", lg: "row" }}>
								<InputField
									register={{ ...registerSupport("primary") }}
									error={supportErrors.primary}
									touched={supportTouchedFields.primary}
									type="text"
									name="primary"
									size="lg"
									autoComplete="phone_number"
									label="Primary Contact Number"
									placeholder=""
									required
								/>
								<InputField
									register={{ ...registerSupport("secondary") }}
									error={supportErrors.secondary}
									touched={supportTouchedFields.secondary}
									type="text"
									name="secondary"
									size="lg"
									autoComplete="phone_number"
									label="Secondary Contact Number"
									placeholder=""
								/>
							</HStack>
							<HStack w="full" flexDirection={{ base: "column", lg: "row" }}>
								<InputField
									register={{ ...registerSupport("ntc") }}
									error={supportErrors.ntc}
									touched={supportTouchedFields.ntc}
									type="text"
									name="ntc"
									size="lg"
									autoComplete="phone_number"
									label="NTC Contact Number"
									placeholder=""
								/>
								<InputField
									register={{ ...registerSupport("ncell") }}
									error={supportErrors.ncell}
									touched={supportTouchedFields.ncell}
									type="text"
									name="ncell"
									size="lg"
									autoComplete="phone_number"
									label="Ncell Contact Number"
									placeholder=""
								/>
							</HStack>
							<HStack w="full" flexDirection={{ base: "column", lg: "row" }}>
								<InputField
									register={{ ...registerSupport("whatsapp") }}
									error={supportErrors.whatsapp}
									touched={supportTouchedFields.whatsapp}
									type="text"
									name="whatsapp"
									size="lg"
									autoComplete="phone_number"
									label="WhatsApp Contact Number"
									placeholder=""
								/>
								<InputField
									register={{ ...registerSupport("viber") }}
									error={supportErrors.viber}
									touched={supportTouchedFields.viber}
									type="text"
									name="viber"
									size="lg"
									autoComplete="viber"
									label="Viber Contact Number"
									placeholder=""
								/>
							</HStack>
							<Button
								isDisabled={!supportIsDirty}
								alignSelf="flex-start"
								size="sm"
								fontWeight="normal"
								colorScheme="primary"
								type="submit"
							>
								Save Changes
							</Button>
						</VStack>
					</form>
				</FieldGroup>
				<FieldGroup
					title="Social Media"
					description="Engraved paths to your social media accounts"
				>
					<form
						onSubmit={handleSocialSubmit((values) => {
							updateTenantContact({
								variables: {
									option: {
										primary: data?.tenantContacts.primary!,
										secondary: data?.tenantContacts.secondary,
										ntc: data?.tenantContacts.ntc,
										ncell: data?.tenantContacts.ncell,
										whatsapp: data?.tenantContacts.whatsapp,
										viber: data?.tenantContacts.viber,
										facebook: values.facebook,
										instagram: values.instagram,
										tiktok: values.tiktok,
										twitter: values.twitter,
									},
								},
							});
						})}
					>
						<VStack gap={3}>
							<HStack w="full" flexDirection={{ base: "column", lg: "row" }}>
								<InputField
									register={{ ...registerSocial("facebook") }}
									error={socialErrors.facebook}
									touched={socialTouchedFields.facebook}
									type="text"
									name="facebook"
									size="lg"
									autoComplete="facebook"
									label="Facebook"
									placeholder=""
								/>
								<InputField
									register={{ ...registerSocial("instagram") }}
									error={socialErrors.instagram}
									touched={socialTouchedFields.instagram}
									type="text"
									name="instagram"
									size="lg"
									autoComplete="phone_number"
									label="Instragram"
									placeholder=""
								/>
							</HStack>
							<HStack w="full" flexDirection={{ base: "column", lg: "row" }}>
								<InputField
									register={{ ...registerSocial("tiktok") }}
									error={socialErrors.tiktok}
									touched={socialTouchedFields.tiktok}
									type="text"
									name="tiktok"
									size="lg"
									autoComplete="tiktok"
									label="Tiktok"
									placeholder=""
								/>
								<InputField
									register={{ ...registerSocial("twitter") }}
									error={socialErrors.twitter}
									touched={socialTouchedFields.twitter}
									type="text"
									name="twitter"
									size="lg"
									autoComplete="twitter"
									label="Twitter"
									placeholder=""
								/>
							</HStack>
							<Button
								isDisabled={!socialIsDirty}
								alignSelf="flex-start"
								size="sm"
								fontWeight="normal"
								colorScheme="primary"
								type="submit"
							>
								Save Changes
							</Button>
						</VStack>
					</form>
				</FieldGroup>
			</Stack>
		</Card>
	);
};

export default StoreContacts;
