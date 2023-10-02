import {
	useSteps,
	Stepper,
	Step,
	StepTitle,
	StepDescription,
	StepSeparator,
	Box,
	Avatar,
	Badge,
	Text,
	VStack,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Textarea,
	useToast,
	Button,
	StepIndicator,
	StepStatus,
	Icon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AiOutlineCheck } from "react-icons/ai";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
	useCreateCommentMutation,
	useIssuesWithCommentsQuery,
} from "generated-graphql";
import Result from "@/components/shared/Result";
import PageLoader from "@/components/shared/PageLoader";
import colorFromStatus from "@/config/color";

dayjs.extend(relativeTime);

interface IssuePreviewProps {
	issueId: number;
}

const IssuePreview = ({ issueId }: IssuePreviewProps) => {
	const toast = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
		reset,
	} = useForm<{
		content: string;
	}>({
		defaultValues: {
			content: "",
		},
		resolver: yupResolver(
			Yup.object().shape({
				content: Yup.string().required(),
			})
		),
	});

	const {
		data,
		loading,
		error: issueWithCommentError,
	} = useIssuesWithCommentsQuery({
		variables: {
			issueId,
		},
	});

	const [createCommentMutation, { loading: createCommentLoading }] =
		useCreateCommentMutation({
			refetchQueries: ["IssuesWithComments"],
			onCompleted: () => {
				toast({
					title: "Comment Created",
					description: "Comment Created",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			},
			onError: (error) => {
				toast({
					title: "Comment Creation Failed",
					description: error.message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			},
		});

	const { activeStep } = useSteps({
		index: data?.issuesWithComments.comments?.length,
		count: data?.issuesWithComments.comments?.length,
	});

	if (loading) {
		return <PageLoader />;
	}

	if (issueWithCommentError) {
		return (
			<Result
				heading={issueWithCommentError.name}
				text={issueWithCommentError.message}
				type="error"
				dump={issueWithCommentError.stack}
			/>
		);
	}

	return (
		<VStack gap={4} alignItems="flex-start">
			<Stepper
				gap="0"
				size="lg"
				colorScheme="primary"
				index={activeStep}
				orientation="vertical"
				height={`${
					100 * ((data?.issuesWithComments.comments?.length ?? 2) + 1) + 100
				}px`}
			>
				<Step
					key={data?.issuesWithComments.subject}
					style={{
						marginTop: "20px",
						marginBottom: "20px",
					}}
				>
					<Avatar
						src={
							data?.issuesWithComments.user.imageUrl ??
							"https://api.dicebear.com/6.x/micah/svg?size=256"
						}
						zIndex={2}
					/>

					<Box>
						<StepTitle>
							{data?.issuesWithComments.user.first_name}{" "}
							{data?.issuesWithComments.user.last_name}{" "}
							<Badge
								colorScheme={colorFromStatus(
									data?.issuesWithComments.status ?? ""
								)}
							>
								{data?.issuesWithComments.user.role.name}
							</Badge>
						</StepTitle>
						<StepDescription>
							{data?.issuesWithComments.content}
							<br />
							<Text fontSize="sm">
								Category: {data?.issuesWithComments.category.name}
							</Text>
						</StepDescription>
					</Box>
				</Step>

				{data?.issuesWithComments.comments?.map((comment) => (
					<Step
						key={comment.id}
						style={{
							marginLeft: "20px",
							marginTop: "-4px",
						}}
					>
						<Avatar
							src={
								data?.issuesWithComments.user.imageUrl ??
								"https://api.dicebear.com/6.x/micah/svg?size=256"
							}
							zIndex={2}
							border="2px solid darkgreen"
						/>
						{/*
						// ! Comment Content is overflowing from the modal
						// TODO: Fixed the overflowing issue
						 */}
						<Box>
							<StepTitle>
								{comment.user.first_name} {comment.user.last_name}{" "}
								<Badge>{comment.user.role.name}</Badge>
							</StepTitle>
							<Text>{comment.content}</Text>
						</Box>

						<StepSeparator />
					</Step>
				))}
				{data?.issuesWithComments.completed_at && (
					<Step
						style={{
							padding: "20px",
						}}
					>
						<StepIndicator>
							<StepStatus
								complete={
									<Icon as={AiOutlineCheck} fontSize="2xl" color="green" />
								}
								incomplete={
									<Icon as={AiOutlineCheck} fontSize="2xl" color="green" />
								}
								active={
									<Icon as={AiOutlineCheck} fontSize="2xl" color="green" />
								}
							/>
						</StepIndicator>

						<Box flexShrink="0" color="green">
							<StepTitle>Issue Resolved</StepTitle>
							<StepDescription>
								Resolved on{" "}
								{dayjs(Number(data.issuesWithComments.completed_at)).format(
									"MMM DD, YYYY"
								)}{" "}
								({dayjs(Number(data.issuesWithComments.completed_at)).fromNow()}
								)
							</StepDescription>
						</Box>

						<StepSeparator />
					</Step>
				)}
			</Stepper>
			{!data?.issuesWithComments.completed_at && (
				<VStack ml={8} my={8}>
					<form
						onSubmit={handleSubmit(async (values) => {
							const res = await createCommentMutation({
								variables: {
									content: values.content,
									issueId,
								},
							});
							if (res.data?.createComment.id) {
								reset();
							}
						})}
					>
						<FormControl
							id="issue-content"
							isInvalid={!!errors?.content && touchedFields.content}
						>
							<HStack justifyContent="space-between">
								<FormLabel>Reply to this Issue</FormLabel>
								<FormErrorMessage>{errors?.content?.message}</FormErrorMessage>
							</HStack>
							<Textarea
								cols={5000}
								{...register("content")}
								placeholder="The more you describe the problem, the more it helps us to solve your issue"
							/>
						</FormControl>
						<Button
							my={2}
							type="submit"
							colorScheme="primary"
							fontSize="md"
							isLoading={createCommentLoading}
						>
							Add Comment
						</Button>
					</form>
				</VStack>
			)}
		</VStack>
	);
};

export default IssuePreview;
