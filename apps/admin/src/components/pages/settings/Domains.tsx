import {
	Card,
	CardHeader,
	Stack,
	HStack,
	Button,
	useColorModeValue as mode,
	Text,
	VStack,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineReload, AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
	useDetailsQuery,
	useUpdateCustomDomainMutation,
	useUpdateSubDomainMutation,
} from "@/generated/graphql";
import DomainConfiguration, {
	DomainStatusByName,
} from "@/components/ui/Domain";
import Result from "@/components/shared/Result";
import { client } from "@/pages/_app";
import { DOMAIN_NAME } from "../../../../constants";

type DomainFormType = "Sub Domain" | "Custom Domain";

const Domains = () => {
	const { data, loading, error } = useDetailsQuery();

	const [editing, setEditing] = useState<DomainFormType>();

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
		<VStack gap={4}>
			{(["Sub Domain", "Custom Domain"] as DomainFormType[]).map((type) => (
				<Card variant="outline" w="full">
					<CardHeader
						as={Stack}
						justifyContent="space-between"
						direction={["column", "row"]}
						bg={mode("gray.50", "gray.800")}
					>
						<Link
							href={
								type === "Custom Domain"
									? `https://${data?.details.customDomain}`
									: `https://${data?.details.subdomain}.${DOMAIN_NAME}`
							}
						>
							<Text as="span" fontSize="xl">
								{(type === "Custom Domain"
									? data?.details.customDomain
									: `${data?.details.subdomain}.${DOMAIN_NAME}`) || type}
							</Text>
						</Link>
						<HStack>
							<Button
								onClick={async () => {
									// ! Refetching Query is not working!
									// TODO: Refetch every 2-5 seconds
									await client.refetchQueries({
										include: ["VerifyDomain", "Details"],
										optimistic: false,
									});
								}}
								isLoading={loading}
								leftIcon={<AiOutlineReload size="20" />}
							>
								Refresh
							</Button>
							<Button
								onClick={() => {
									if (editing) {
										setEditing(undefined);
									} else if (type === "Custom Domain") {
										setEditing("Custom Domain");
									} else {
										setEditing("Sub Domain");
									}
								}}
								leftIcon={
									editing === type ? <AiOutlineClose /> : <AiOutlineEdit />
								}
							>
								{editing === type ? "Cancel" : "Edit"}
							</Button>
						</HStack>
					</CardHeader>
					{type === "Custom Domain" ? (
						data?.details.customDomain && (
							<DomainConfiguration domain={data.details.customDomain} />
						)
					) : (
						<DomainStatusByName domain={data?.details.subdomain ?? ""} />
					)}
					{(!data?.details.customDomain || type === editing) && (
						<DomainForm
							label={type}
							value={
								(type === "Custom Domain"
									? data?.details.customDomain
									: data?.details.subdomain) ?? undefined
							}
							onSuccess={() => {
								setEditing(undefined);
							}}
						/>
					)}
				</Card>
			))}
		</VStack>
	);
};

export default Domains;

interface DomainFormProps {
	value?: string;
	label: "Sub Domain" | "Custom Domain";
	onSuccess?: () => void;
}

const DomainForm = ({ value, label, onSuccess }: DomainFormProps) => {
	const toast = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields, isDirty },
	} = useForm<{
		domain: string;
	}>({
		defaultValues: {
			domain: value || "",
		},
		resolver: yupResolver(Yup.object().shape({ domain: Yup.string() })),
	});

	const [updateSubdomain] = useUpdateSubDomainMutation({
		refetchQueries: ["Tenants"],
		onCompleted() {
			toast({
				title: "Domain Updated",
				description: "Domain Updated",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		},
		onError(error) {
			toast({
				title: "An Error Occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

	const [updateCustomDomain] = useUpdateCustomDomainMutation({
		refetchQueries: ["Tenants"],
		onCompleted() {
			toast({
				title: "Domain Updated",
				description: "Domain Updated",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		},
		onError(error) {
			toast({
				title: "An Error Occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

	return (
		<form
			onSubmit={handleSubmit(async (values) => {
				let res;
				if (label === "Custom Domain") {
					res = await updateCustomDomain({
						variables: {
							customDomain: values.domain,
						},
					});
				} else {
					res = await updateSubdomain({
						variables: {
							subdomain: values.domain,
						},
					});
				}
				if (!res.errors) {
					if (typeof onSuccess === "function") onSuccess();
				}
			})}
		>
			<VStack maxW="xl" alignItems="flex-start" my={4} mx={3}>
				<FormControl
					id="custom-domain-form"
					isInvalid={!!errors.domain && dirtyFields.domain}
				>
					<HStack justifyContent="space-between">
						<FormLabel>{label}</FormLabel>
						<FormErrorMessage>{errors?.domain?.message}</FormErrorMessage>
					</HStack>
					<InputGroup>
						{label === "Custom Domain" ? (
							<InputLeftAddon>https://</InputLeftAddon>
						) : (
							<InputLeftAddon>https://</InputLeftAddon>
						)}
						<Input autoComplete="domain" required {...register("domain")} />
						{label === "Sub Domain" && (
							<InputRightAddon>.{DOMAIN_NAME}</InputRightAddon>
						)}
					</InputGroup>
				</FormControl>
				<Button type="submit" size="sm" isDisabled={!isDirty}>
					{value ? "Update" : "Add"} Domain
				</Button>
			</VStack>
		</form>
	);
};

DomainForm.defaultProps = {
	value: undefined,
	onSuccess: () => {},
};
