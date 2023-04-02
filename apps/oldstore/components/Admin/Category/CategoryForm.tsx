/* eslint-disable no-mixed-spaces-and-tabs */
import InputField from "@components/ui/InputField";
import TextArea from "@components/ui/TextArea";
import { encodeURL } from "@components/utils/encodeURL";
import {
	useAddCategoryMutation,
	useUpdateCategoryMutation,
} from "@generated/graphql";
import { Field, FieldProps, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

const CategorySchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	identifier: Yup.string().required("Required"),
	desc: Yup.string().required("Required"),
});

interface CategoryFormProps {
	categoryId?: number;
	name?: string;
	desc?: string;
	identifier?: string;
}

const CategoryForm = ({
	categoryId,
	name,
	desc,
	identifier,
}: CategoryFormProps) => {
	const [updateCategoryMutation] = useUpdateCategoryMutation();
	const [addCategoryMutation] = useAddCategoryMutation();

	return (
		<Formik
			validateOnBlur
			initialValues={
				categoryId && name && desc && identifier
					? {
							name: name,
							identifier: identifier,
							desc: desc,
					  }
					: { name: "", identifier: "", desc: "" }
			}
			validationSchema={CategorySchema}
			onSubmit={async (values, actions) => {
				if (categoryId) {
					toast.promise(
						updateCategoryMutation({
							variables: {
								options: values,
								updateCategoryId: categoryId,
							},
							update: (cache) =>
								cache.evict({ fieldName: "categoriesSummary" }),
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
				} else {
					toast.promise(
						addCategoryMutation({
							variables: {
								name: values.name,
								identifier: encodeURL(values.identifier),
								desc: values.desc,
							},
							update: (cache) =>
								cache.evict({ fieldName: "categoriesSummary" }),
						}),
						{
							loading: "Adding...",
							success: "Category Added",
							error: "An Error Occured",
						}
					);
					(
						document.getElementById(`add-category-modal`) as HTMLInputElement
					).checked = false;
					actions.resetForm();
				}
				actions.setSubmitting(false);
			}}
		>
			{({ isSubmitting, values }) => (
				<Form>
					<div className="flex flex-col md:space-x-4 md:flex-row">
						<Field name="name">
							{({ field, form }: FieldProps) => (
								<div className="w-full">
									<label htmlFor={field.name} className={"label"}>
										<span className="label-text">Identifier</span>
										{form.errors.name && form.touched.name && (
											<span className="label-text-alt text-red-600">
												{form.errors.name as string}
											</span>
										)}
									</label>
									<input
										{...field}
										value={values.name}
										type="text"
										autoComplete="name"
										placeholder="Name"
										className={`input input-md input-bordered w-full ${
											form.errors.identifer &&
											form.touched.identifer &&
											"input-error"
										}`}
										onChange={(e) => {
											form.setFieldValue("name", e.currentTarget.value);
											form.setFieldValue(
												"identifier",
												encodeURL(e.currentTarget.value)
											);
										}}
									/>
								</div>
							)}
						</Field>
						<InputField
							name="identifier"
							label="Identifier"
							placeholder="Identifier"
							type="text"
							autoComplete="id"
							disabled
						/>
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
							{isSubmitting ? "Loading" : categoryId ? "Update" : "Add"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default CategoryForm;
