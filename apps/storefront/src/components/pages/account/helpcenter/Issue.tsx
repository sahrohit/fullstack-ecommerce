/* eslint-disable no-nested-ternary */
import {
	Box,
	Stack,
	StackDivider,
	useColorModeValue as mode,
	SkeletonCircle,
	Skeleton,
	Img,
	VStack,
	Heading,
	Text,
	Badge,
	useToast,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { BiCheck } from "react-icons/bi";
import { useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IoAdd } from "react-icons/io5";
import {
	Issue as IIssue,
	useIssuesQuery,
	useResolveByCustomerMutation,
} from "generated-graphql";
import ConfirmationModal from "@/components/helpers/ConfirmationModal";
import ModalButton from "@/components/ui/ModalButton";
import colorFromStatus from "@/config/color";
import Result from "@/components/shared/Result";
import IssuePreview from "./IssuePreview";
import IssueForm from "./IssueForm";

dayjs.extend(relativeTime);

const IssueSection = () => {
	const { data, loading, error } = useIssuesQuery();

	const modalRef: any = useRef();

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};

	if (error)
		return (
			<Result
				heading={error.name}
				text={error.message}
				type="error"
				dump={error.stack}
			/>
		);

	return (
		<Box mx="auto" w="full">
			<Box
				rounded="lg"
				bg={mode("white", "gray.700")}
				shadow="base"
				overflow="hidden"
			>
				<Stack spacing="6" divider={<StackDivider />} py="5" px="8">
					{loading ? (
						Array(3)
							.fill("issue")
							.map((issue, index) => (
								<IssueSkeleton key={`${issue}-${index + 1}`} />
							))
					) : !data?.issues?.length ? (
						<VStack py={8} gap={2}>
							<Box textAlign="center">
								<Heading as="h3" fontSize="2xl" lineHeight="1">
									No Issue Found
								</Heading>
								<Text>You dont have any issues yet.</Text>
							</Box>
							<Img
								width="50%"
								placeholder="blur"
								alt="App screenshot"
								src="/assets/bad-gateway.svg"
							/>
							<ModalButton
								ref={modalRef}
								colorScheme="primary"
								leftIcon={<IoAdd />}
								w={{ base: "full", md: "unset" }}
								buttonText="Open Ticket for Issue"
								modalHeader="Open Ticket for Issue"
								modalFooter=" "
								modalSize="3xl"
							>
								<IssueForm onSubmissionSuccess={closeModal} />
							</ModalButton>
						</VStack>
					) : (
						data?.issues?.map((issue) => (
							<Issue key={issue.id} issue={issue as IIssue} />
						))
					)}
				</Stack>
			</Box>
		</Box>
	);
};

export default IssueSection;

interface IssueProps {
	issue: IIssue;
}

export const Issue = ({ issue }: IssueProps) => {
	const toast = useToast();

	const [resolveByCustomerMutation] = useResolveByCustomerMutation({
		refetchQueries: ["Issues"],
		onCompleted() {
			toast({
				title: "Issue Resolved",
				description: "Issue Resolved",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		},

		onError(error) {
			toast({
				title: "Issue Resolving Failed",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

	return (
		<Stack
			direction={{ base: "column", sm: "row" }}
			spacing="5"
			justify="space-between"
			pos="relative"
		>
			<Stack
				direction={{ base: "column", sm: "row" }}
				spacing="4"
				align="flex-start"
				flex="1"
			>
				<Box flex="1">
					<Box as="h4" fontWeight="bold" fontSize="xl" maxW="xl">
						<span>{issue.subject}</span>{" "}
						<Badge colorScheme={colorFromStatus(issue.status)} marginStart="1">
							{issue.status.replaceAll("_", " ")}
						</Badge>
					</Box>
					<Text
						noOfLines={3}
						maxW={{ base: "xs", md: "unset" }}
						color={mode("gray.600", "gray.400")}
						fontSize="md"
					>
						{issue.content}
					</Text>
				</Box>
			</Stack>
			<Stack
				direction={{ base: "row", md: "column" }}
				justifyContent={{ base: "flex-start", md: "center" }}
			>
				<ModalButton
					variant="outline"
					leftIcon={<FiEdit />}
					buttonText="View"
					modalHeader={
						<>
							{issue.subject}
							<Badge colorScheme={colorFromStatus(issue.status)} size="lg">
								{issue.status.replaceAll("_", " ")}
							</Badge>
						</>
					}
					modalFooter=" "
					modalSize="3xl"
				>
					<IssuePreview issueId={issue.id} />
				</ModalButton>

				{issue.completed_at ? (
					<Text>
						Resolved on{" "}
						{dayjs(Number(issue.completed_at)).format("MMM DD, YYYY")}
						<Text textAlign="right">
							({dayjs(Number(issue.completed_at)).fromNow()})
						</Text>
					</Text>
				) : (
					<ConfirmationModal
						colorScheme="green"
						leftIcon={<BiCheck />}
						onSuccess={() => {
							resolveByCustomerMutation({
								variables: {
									issueId: issue.id,
								},
							});
						}}
						bodyText="Are you sure you want to mark this issue as resolved. You can always open another issue?"
						headerText="Mark this Issue as Resolved?"
					>
						Mark as Resolved
					</ConfirmationModal>
				)}
			</Stack>
		</Stack>
	);
};

export const IssueSkeleton = () => (
	<Stack
		direction={{ base: "column", sm: "row" }}
		spacing="5"
		justify="space-between"
		pos="relative"
	>
		<Stack
			direction={{ base: "column", sm: "row" }}
			spacing="4"
			align="flex-start"
			flex="1"
		>
			<Box aria-hidden fontSize="2xl" pt="1" color="gray.500">
				<SkeletonCircle size="10" />
			</Box>
			<Box flex="1">
				<Box as={Skeleton} fontWeight="bold" fontSize="xl" maxW="xs">
					Hello World
				</Box>
				<Box
					maxW={{ base: "xs", md: "unset" }}
					color={mode("gray.600", "gray.400")}
					fontSize="md"
				>
					<Skeleton as="span">House no 6 Surya Colony, Lalipur</Skeleton>
					<br />
					<Skeleton as="span">Bagmati 123123, Nepal</Skeleton>
				</Box>
				<Box
					color={mode("gray.600", "gray.400")}
					fontSize="lg"
					fontWeight="semibold"
				>
					<Skeleton maxW="xs" height="20px" />
				</Box>
			</Box>
		</Stack>
		<Stack
			direction={{ base: "row", md: "column" }}
			justifyContent={{ base: "flex-start", md: "center" }}
		>
			<Skeleton width="100px" height="40px" />
			<Skeleton width="100px" height="40px" />
		</Stack>
	</Stack>
);
