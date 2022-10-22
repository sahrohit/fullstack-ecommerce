import InputField from "@components/ui/InputField";
import TextArea from "@components/ui/TextArea";
import { encodeURL } from "@components/utils/encodeURL";
import { useUpdateCategoryMutation } from "@generated/graphql";
import { Field, FieldProps, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

const UpdateCategorySchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	identifier: Yup.string().required("Required"),
	desc: Yup.string().required("Required"),
});

interface UpdateCategoryFormProps {
	categoryId: number;
	name: string;
	desc: string;
	identifier: string;
}

const UpdateCategoryForm = ({
	categoryId,
	name,
	desc,
	identifier,
}: UpdateCategoryFormProps) => {
	const [updateCategoryMutation] = useUpdateCategoryMutation();

	return (
		<Formik
			validateOnBlur
			initialValues={{
				name: name,
				identifier: identifier,
				desc: desc,
			}}
			validationSchema={UpdateCategorySchema}
			onSubmit={async (values, actions) => {
				toast.promise(
					updateCategoryMutation({
						variables: {
							options: values,
							updateCategoryId: categoryId,
						},
						update: (cache) => cache.evict({ fieldName: "categoriesSummary" }),
					}),
					{
						loading: "Updating...",
						success: "Category Updated",
						error: "An Error Occured",
					}
				);
				(
					document.getElementById(
						`category-details-${categoryId}`
					) as HTMLInputElement
				).checked = false;
				actions.setSubmitting(false);
			}}
		>
			{({ isSubmitting, values }) => (
				<Form>
					<div className="flex flex-col md:space-x-4 md:flex-row">
						<InputField
							name="name"
							label="Name"
							placeholder="Name"
							type="text"
							autoComplete="name"
						/>
						<Field name="identifier">
							{({ field, form }: FieldProps) => (
								<div className="w-full">
									<label htmlFor={field.name} className={"label"}>
										<span className="label-text">Identifier</span>
										{form.errors.identifier && form.touched.identifier && (
											<span className="label-text-alt text-red-600">
												{form.errors.identifier as string}
											</span>
										)}
									</label>
									<input
										disabled
										{...field}
										value={encodeURL(values.name)}
										type="text"
										autoComplete="id"
										placeholder="Identifier"
										className={`input input-md input-bordered w-full ${
											form.errors.identifer &&
											form.touched.identifer &&
											"input-error"
										}`}
									/>
								</div>
							)}
						</Field>
					</div>

					<TextArea
						className="w-1/2 grow"
						name="desc"
						label="Description"
						placeholder="Description"
						autoComplete="desc"
					/>

					<div className="flex justify-end mt-4 space-x-4">
						<label
							className={`btn btn-secondary btn-sm btn-error btn-outline gap-2 rounded-md`}
							htmlFor={`category-details-${categoryId}`}
						>
							Cancel
						</label>
						<button
							className={`btn btn-secondary btn-sm gap-2 rounded-md ${
								isSubmitting && "loading"
							}`}
							type="submit"
						>
							{isSubmitting ? "Loading" : "Update"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default UpdateCategoryForm;
