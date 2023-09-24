/* eslint-disable no-nested-ternary */
import {
	Alert,
	AlertIcon,
	Box,
	Card,
	CardBody,
	Flex,
	Spinner,
	Tab,
	TabList,
	Tabs,
	Tag,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useVerifyDomainQuery } from "@/generated/graphql";
import Result from "../shared/Result";

export const getSubdomain = (name: string, apexName: string) => {
	if (name === apexName) return null;
	return name.slice(0, name.length - apexName.length - 1);
};

const DomainConfiguration = ({ domain }: { domain: string }) => {
	const [recordType, setRecordType] = useState<"A" | "CNAME">("A");

	const { data, loading, error } = useVerifyDomainQuery({
		variables: {
			domain,
		},
	});

	if (loading) return <DomainLoading />;

	if (error)
		return (
			<Result
				type="error"
				heading={error.name}
				text={error.message}
				dump={error.stack}
			/>
		);

	if (!data?.verifyDomain.status || !data.verifyDomain.domainJson) return null;

	if (data.verifyDomain.status === "Valid Configuration") {
		return <DomainStatus status={data.verifyDomain.status} />;
	}

	const subdomain = getSubdomain(
		data.verifyDomain.domainJson.name ?? "",
		data.verifyDomain.domainJson.apexName ?? ""
	);

	const txtVerification =
		(data.verifyDomain.status === "Pending Verification" &&
			data.verifyDomain.domainJson.verification?.find(
				(x: any) => x.type === "TXT"
			)) ||
		null;

	return (
		<VStack w="full" justifyContent="flex-start">
			<DomainStatus status={data.verifyDomain.status} />
			{txtVerification ? (
				<Box w="full" textAlign="left" my={3} px={4}>
					<Text my={2} fontSize="sm">
						Please set the following TXT record on{" "}
						<Tag>{data.verifyDomain.domainJson.apexName}</Tag> to prove
						ownership of <Tag>{data.verifyDomain.domainJson.name}</Tag>:
					</Text>
					<Card>
						<CardBody p={2}>
							<Flex
								alignItems="center"
								justifyContent="flex-start"
								gap={6}
								rounded="md"
								p={2}
							>
								<DomainInformationBlock
									heading="Type"
									content={txtVerification.type}
								/>

								<DomainInformationBlock
									heading="Name"
									content={txtVerification.domain.slice(
										0,
										txtVerification.domain.length -
											data.verifyDomain.domainJson.apexName!.length -
											1
									)}
								/>
								<DomainInformationBlock
									heading="Value"
									content={txtVerification.value}
								/>
							</Flex>
						</CardBody>
					</Card>

					<Text mt={5} fontSize="sm">
						Warning: if you are using this domain for another site, setting this
						TXT record will transfer domain ownership away from that site and
						break it. Please exercise caution when setting this record.
					</Text>
				</Box>
			) : data.verifyDomain.status === "Unknown Error" ? (
				<Text mb={5} fontSize="sm">
					{data.verifyDomain.domainJson.error?.message}
				</Text>
			) : (
				<>
					<Flex justifyContent="flex-start" w="full" gap={4} px={4}>
						<Tabs
							onChange={(index) => {
								if (index === 0) setRecordType("A");
								if (index === 1) setRecordType("CNAME");
							}}
						>
							<TabList>
								<Tab>A Record{!subdomain && " (recommended)"}</Tab>
								<Tab>CNAME Record{subdomain && " (recommended)"}</Tab>
							</TabList>
						</Tabs>
					</Flex>
					<Box w="full" textAlign="left" my={3} px={4}>
						<Text my={2} fontSize="sm">
							To configure your{" "}
							{recordType === "A" ? "apex domain" : "subdomain"} (
							<Tag>
								{recordType === "A"
									? data.verifyDomain.domainJson.apexName
									: data.verifyDomain.domainJson.name}
							</Tag>
							), set the following {recordType} record on your DNS provider to
							continue:
						</Text>
						<Card>
							<CardBody p={2}>
								<Flex
									alignItems="center"
									justifyContent="flex-start"
									gap={6}
									rounded="md"
									p={2}
								>
									<DomainInformationBlock heading="Type" content={recordType} />
									<DomainInformationBlock
										heading="Name"
										content={recordType === "A" ? "@" : subdomain ?? "www"}
									/>
									<DomainInformationBlock
										heading="Value"
										content={
											recordType === "A"
												? `76.76.21.21`
												: `cname.NEXT_PUBLIC_ROOT_DOMAIN`
										}
									/>
									<DomainInformationBlock heading="TTL" content="86400" />
								</Flex>
							</CardBody>
						</Card>

						<Text mt={5} fontSize="sm">
							Note: for TTL, if <Tag>86400</Tag> is not available, set the
							highest value possible. Also, domain propagation can take up to an
							hour.
						</Text>
					</Box>
				</>
			)}
		</VStack>
	);
};
export default DomainConfiguration;

const DomainInformationBlock = ({
	heading,
	content,
}: {
	heading: string;
	content: any;
}) => (
	<VStack alignItems="flex-start">
		<Text fontSize="sm" fontWeight="bold">
			{heading}
		</Text>
		<Text fontSize="sm" mt={2}>
			{content}
		</Text>
	</VStack>
);

export const DomainStatus = ({ status }: { status: string }) => (
	<Alert
		status={
			status === "Valid Configuration"
				? "success"
				: status === "Pending Verification"
				? "warning"
				: "error"
		}
	>
		<AlertIcon />
		{status}
	</Alert>
);

export const DomainLoading = () => (
	<Alert status="info">
		<Spinner size="sm" />
		<Text ml={2}>Fetching Domain Data</Text>
	</Alert>
);

export const DomainStatusByName = ({ domain }: { domain: string }) => {
	const { data, loading, error } = useVerifyDomainQuery({
		variables: {
			domain,
		},
	});

	if (loading) {
		return <DomainLoading />;
	}

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

	return <DomainStatus status={data?.verifyDomain.status ?? ""} />;
};
