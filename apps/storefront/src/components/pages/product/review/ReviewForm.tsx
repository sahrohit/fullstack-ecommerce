import { Button, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {
	useAddReviewMutation,
	useUpdateReviewMutation,
} from "@/generated/graphql";
import InputField from "@/components/ui/InputField";
import { RatingButton } from "@/components/shared/product/Rating";

type ReviewFormValues = {
	rating: number;
	review: string;
	desc: string;
	isAnonymous: boolean;
};

const ReviewFormSchema = Yup.object({
	review: Yup.string().required("Required"),
	rating: Yup.number().required("Required"),
	desc: Yup.string().required("Required"),
	isAnonymous: Yup.boolean().required("Required"),
});

const emptyReviewFormValues: ReviewFormValues = {
	rating: 0,
	review: "",
	desc: "",
	isAnonymous: false,
};

interface ReviewFormProps {
	id?: number;
	defaultValues?: ReviewFormValues;
	onSubmissionSuccess?: () => void;
	productId: number;
}

const ReviewForm = ({
	id,
	defaultValues,
	onSubmissionSuccess: closeModal,
	productId,
}: ReviewFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
		reset,
		control,
	} = useForm<ReviewFormValues>({
		defaultValues: defaultValues ?? emptyReviewFormValues,
		resolver: yupResolver(ReviewFormSchema),
	});
	const [addReviewMutation, { loading: addLoading }] = useAddReviewMutation({
		refetchQueries: ["AllReviews", "ReviewSummary"],
	});

	const [updateReviewMutation, { loading: updateLoading }] =
		useUpdateReviewMutation({
			refetchQueries: ["AllReviews", "ReviewSummary"],
		});

	return (
		<form
			onSubmit={handleSubmit((values) => {
				if (id && defaultValues) {
					updateReviewMutation({
						variables: {
							...values,
							productId,
						},
					});
				} else {
					addReviewMutation({
						variables: {
							...values,
							productId,
						},
					});
				}
				reset();

				if (closeModal) {
					closeModal();
				}
			})}
		>
			<Stack spacing="4">
				<RatingButton control={control} size="5xl" />

				<InputField
					register={{ ...register("review") }}
					error={errors.review}
					touched={touchedFields.review}
					type="text"
					name="review"
					size="lg"
					autoComplete="title"
					label="Review Title"
					placeholder=""
				/>

				<InputField
					register={{ ...register("desc") }}
					error={errors.desc}
					touched={touchedFields.desc}
					name="desc"
					type="text"
					size="lg"
					autoComplete="description"
					label="Description"
					placeholder=""
				/>

				<Button
					type="submit"
					colorScheme="primary"
					size="lg"
					fontSize="md"
					isLoading={addLoading || updateLoading}
				>
					{defaultValues ? "Update Review" : "Create Review"}
				</Button>
			</Stack>
		</form>
	);
};

ReviewForm.defaultProps = {
	id: null,
	defaultValues: null,
	onSubmissionSuccess: () => {},
};

export default ReviewForm;
