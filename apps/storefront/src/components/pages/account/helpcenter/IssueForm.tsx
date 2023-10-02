/* eslint-disable no-nested-ternary */
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Select,
	Skeleton,
	Stack,
	Textarea,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
	useCreateIssueMutation,
	useIssueCategoriesQuery,
} from "generated-graphql";
import InputField from "@/components/ui/InputField";

type IssueFormValues = {
	subject: string;
	content: string;
	html: string;
	categoryId: number;
};

const IssueFormSchema = Yup.object({
	subject: Yup.string().required("Required"),
	content: Yup.string().required("Required"),
	html: Yup.string(),
	categoryId: Yup.string().required("Required"),
});

const emptyIssueFormValues: IssueFormValues = {
	subject: "",
	content: "",
	html: "",
	categoryId: 0,
};

interface IssueFormProps {
	defaultValues?: IssueFormValues;
	onSubmissionSuccess?: () => void;
}

const IssueForm = ({
	defaultValues,
	onSubmissionSuccess: closeModal,
}: IssueFormProps) => {
	const toast = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
		reset,
	} = useForm<IssueFormValues>({
		defaultValues: defaultValues ?? emptyIssueFormValues,
		resolver: yupResolver(IssueFormSchema),
	});
	const {
		data: categories,
		loading: categoryLoading,
		error: categoryError,
	} = useIssueCategoriesQuery();
	const [createIssueMutation, { loading: createLoading }] =
		useCreateIssueMutation({
			refetchQueries: ["Issues"],
			onError: (error) => {
				toast({
					title: "Issue Creation Failed",
					description: error.message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			},
		});

	return (
		<form
			onSubmit={handleSubmit((values) => {
				createIssueMutation({
					variables: {
						input: {
							...values,
							categoryId: Number(values.categoryId),
						},
					},
				});
				reset();

				if (closeModal) {
					closeModal();
				}
			})}
		>
			<Stack spacing="4">
				<HStack gap={3}>
					{categoryError ? (
						<p>{categoryError.message}</p>
					) : categoryLoading || !categories?.issueCategories ? (
						<Skeleton height="40px" w="full" />
					) : (
						<FormControl
							id="categoryId"
							isInvalid={!!categoryError && touchedFields.categoryId}
						>
							<HStack justifyContent="space-between">
								<FormLabel>Category</FormLabel>
								<FormErrorMessage>
									{errors?.categoryId?.message}
								</FormErrorMessage>
							</HStack>
							<Select
								size="lg"
								placeholder="Select Category"
								{...register("categoryId")}
							>
								{categories.issueCategories.map((category) => (
									<option key={category.identifier} value={category.id}>
										{category.name}
									</option>
								))}
							</Select>
						</FormControl>
					)}
				</HStack>
				<InputField
					register={{ ...register("subject") }}
					error={errors.subject}
					touched={touchedFields.subject}
					type="text"
					name="subject"
					size="lg"
					autoComplete="subject"
					label="Subject"
					placeholder=""
				/>

				<FormControl
					id="issue-content"
					isInvalid={!!categoryError && touchedFields.content}
				>
					<HStack justifyContent="space-between">
						<FormLabel>Describe your Issue</FormLabel>
						<FormErrorMessage>{errors?.content?.message}</FormErrorMessage>
					</HStack>
					<Textarea
						{...register("content")}
						placeholder="The more you are description, the more it helps us to solve your issue"
					/>
				</FormControl>

				<Button
					type="submit"
					colorScheme="primary"
					size="lg"
					fontSize="md"
					isLoading={createLoading}
				>
					Create Issue
				</Button>
			</Stack>
		</form>
	);
};

IssueForm.defaultProps = {
	defaultValues: null,
	onSubmissionSuccess: () => {},
};

export default IssueForm;
