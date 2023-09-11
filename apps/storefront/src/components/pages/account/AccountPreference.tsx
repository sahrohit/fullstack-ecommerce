import {
	Stack,
	StackDivider,
	FormControl,
	FormLabel,
	Select,
	Button,
	Switch,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ApolloError } from "@apollo/client";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	useMeQuery,
	useUpdateLanguagePreferenceMutation,
	useUpdateMarketingPreferenceMutation,
} from "@/generated/graphql";
import Result from "@/components/shared/Result";
import Card from "./Card";
import FieldGroup from "./FieldGroup";

interface LanguageValues {
	language: string;
	currency: string;
}

interface MarketingValues {
	marketing_product_news: boolean;
	marketing_company_news: boolean;
}

const LanguageFormSchema = Yup.object().shape({
	language: Yup.string().required("Language is required"),
	currency: Yup.string().required("Currency is required"),
});

const MarketingFormSchema = Yup.object().shape({
	marketing_product_news: Yup.boolean().required(),
	marketing_company_news: Yup.boolean().required(),
});

const AccountPreference = () => {
	const toast = useToast();
	const { data: me, loading, error: userError } = useMeQuery();
	const [updateLanguageMutation, { loading: updateLanguageLoading }] =
		useUpdateLanguagePreferenceMutation({
			onCompleted: () => {
				toast({
					title: "Successfully Updated",
					description: `Language Preference Updated`,
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			},
			onError: (error) => {
				toast({
					title: "Preference Update Failed",
					description: error.message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			},
			refetchQueries: ["Me"],
		});
	const [updateMarketingMutation, { loading: updateMarketingLoading }] =
		useUpdateMarketingPreferenceMutation({
			onCompleted: () => {
				toast({
					title: "Successfully Updated",
					description: `Marketing Preference Updated`,
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			},
			onError: (error: ApolloError) => {
				toast({
					title: "Preference Update Failed",
					description: error.message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			},
			refetchQueries: ["Me"],
		});

	const {
		register,
		handleSubmit,
		formState: { isDirty },
	} = useForm<LanguageValues>({
		defaultValues: {
			language: me?.me?.language,
			currency: me?.me?.currency,
		},
		resolver: yupResolver(LanguageFormSchema),
	});

	const {
		register: registerMarketing,
		handleSubmit: handleSubmitMarketing,
		formState: { isDirty: isDirtyMarketing },
	} = useForm<MarketingValues>({
		defaultValues: {
			marketing_product_news: me?.me?.marketing_product_news,
			marketing_company_news: me?.me?.marketing_company_news,
		},
		resolver: yupResolver(MarketingFormSchema),
	});

	if (userError) {
		return (
			<Result
				heading={userError.name}
				text={userError.message}
				type="error"
				dump={userError.stack}
			/>
		);
	}

	return (
		<Card>
			<Stack divider={<StackDivider />} spacing="6">
				<FieldGroup
					title="Language"
					description="Change your preferred language and currency"
				>
					<form
						onSubmit={handleSubmit((values) => {
							updateLanguageMutation({
								variables: values,
							});
						})}
					>
						<Stack
							direction={{ base: "column", md: "row" }}
							width="full"
							spacing="4"
						>
							<FormControl id="language">
								<FormLabel fontSize="sm">Language</FormLabel>
								<Select size="sm" maxW="2xs" {...register("language")}>
									<option value="en">English</option>
									<option value="ne">Nepali</option>
									<option value="new">Newari</option>
								</Select>
							</FormControl>

							<FormControl id="currency">
								<FormLabel fontSize="sm">Currency</FormLabel>
								<Select size="sm" maxW="2xs" {...register("currency")}>
									<option value="NPR">NPR (रू)</option>
									<option value="USD">USD ($)</option>
								</Select>
							</FormControl>
						</Stack>
						<Button
							isLoading={loading || updateLanguageLoading}
							isDisabled={!isDirty}
							type="submit"
							mt="5"
							size="sm"
							fontWeight="normal"
						>
							Save Changes
						</Button>
					</form>
				</FieldGroup>

				<FieldGroup
					title="Communications"
					description="Manage your email preference"
				>
					<form
						onSubmit={handleSubmitMarketing((values) => {
							updateMarketingMutation({
								variables: values,
							});
						})}
					>
						<Stack spacing="3">
							<FormControl display="flex" alignItems="center">
								<FormLabel
									htmlFor="email-marketing"
									flex="1"
									fontSize="sm"
									mb="0"
								>
									Product intro, tips, and inspiration
								</FormLabel>
								<Switch
									{...registerMarketing("marketing_product_news")}
									id="email-marketing"
									colorScheme="primary"
								/>
							</FormControl>
							<FormControl display="flex" alignItems="center">
								<FormLabel htmlFor="email-news" flex="1" fontSize="sm" mb="0">
									Updates about company news and features
								</FormLabel>
								<Switch
									{...registerMarketing("marketing_company_news")}
									id="email-news"
									colorScheme="primary"
								/>
							</FormControl>
						</Stack>
						<Button
							isLoading={loading || updateMarketingLoading}
							isDisabled={!isDirtyMarketing}
							mt="5"
							size="sm"
							fontWeight="normal"
							type="submit"
						>
							Save Changes
						</Button>
					</form>
				</FieldGroup>
			</Stack>
		</Card>
	);
};

export default AccountPreference;
