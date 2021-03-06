import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import InputField from "@components/ui/InputField";
import SelectField from "@components/ui/Select";
import TextArea from "@components/ui/TextArea";
import { useAddProductMutation, useCategoriesQuery } from "@generated/graphql";
import { Field, FieldArray, FieldProps, Form, Formik } from "formik";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import * as Yup from "yup";

import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const AddProductFormValidation = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	desc: Yup.string().required("Description is required"),
	categoryId: Yup.number().required("Category is required"),
	variants: Yup.array()
		.of(
			Yup.object().shape({
				price: Yup.number()
					.required("Price is required")
					.min(0, "Price must be greater than 0"),
				quantity: Yup.number()
					.min(0, "Quantity must be greater than 0")
					.required("Quantity is required"),
				variant: Yup.string().required("Variant Name is required"),
			})
		)
		.required("At least one variant is required"),
	images: Yup.array()
		.of(
			Yup.object().shape({
				imageURL: Yup.string()
					.url("Invalid URL")
					.required("Image URL is required"),
			})
		)
		.required("At least one ImageURL is required"),
});

const encodeURL = (url: string) => {
	return encodeURI(
		url
			.toLowerCase()

			.replace(/ /g, "-")
			.replace(/[!"#$%&'()*+,./:;<=>?@[\]^_`’{|}~]/g, "")
	);
};

const AddProductForm = () => {
	const { data, loading } = useCategoriesQuery();
	const [addProduct] = useAddProductMutation();

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	return (
		<Formik
			validateOnBlur
			validationSchema={AddProductFormValidation}
			initialValues={{
				name: "",
				desc: "",
				categoryId: "",
				identifier: "",
				variants: [
					{
						price: 0,
						quantity: 0,
						variant: "",
					},
				],
				images: [
					{
						imageURL: "",
					},
				],
			}}
			onSubmit={async (values, actions) => {
				toast.promise(
					addProduct({
						variables: {
							options: {
								...values,
								identifier: encodeURL(values.name),
								categoryId: parseInt(values.categoryId),
							},
						},
						update: (cache) => cache.evict({ fieldName: "products" }),
					}),
					{
						loading: "Adding Product...",
						success: "Product Added Successfully",
						error: (error) => error.message,
					}
				);

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
					<div className="flex flex-col space-x-4 md:flex-row">
						<TextArea
							className="w-1/2"
							name="desc"
							label="Description"
							placeholder="Description"
							autoComplete="desc"
						/>
						<div className="w-1/2">
							<label className={"label"}>
								<span className="label-text">Preview</span>
							</label>
							<ReactMarkdown
								className="p-4"
								remarkPlugins={[remarkGfm]}
								rehypePlugins={[rehypeRaw]}
								skipHtml={false}
							>
								{values.desc}
							</ReactMarkdown>
						</div>
					</div>
					<SelectField
						label="Category"
						name="categoryId"
						options={data?.categories?.map((category) => ({
							option: category.name,
							value: category.id.toString(),
						}))}
						placeholder="Category"
					/>

					<FieldArray name="variants">
						{({ remove, push }) => (
							<div className="my-4">
								<div className="flex flex-row items-center">
									<h1 className="">Variants</h1>
									<div className="dropdown">
										<label
											tabIndex={0}
											className="btn btn-circle btn-ghost btn-xs"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												className="w-4 h-4 stroke-current"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												></path>
											</svg>
										</label>
										<div
											tabIndex={0}
											className="card compact dropdown-content shadow bg-base-100 rounded-box w-64"
										>
											<div className="card-body">
												<h2 className="card-title">Variants</h2>
												<p>Specifies the varaint of the products.</p>
												<p>
													For eg: 128GB, 256GB & 512GB can be the variants of a
													SSD.
												</p>
												<p>
													If variants doesn&apos;t exist, just create a single
													variant with &quot;default&quot; as the variant
													identifer.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col space-y-4">
									{values.variants.length > 0 &&
										values.variants.map((friend, index) => (
											<div key={index}>
												<div className="flex flex-row justify-end items-end">
													<button
														type="button"
														className="btn btn-xs btn-error"
														onClick={() => remove(index)}
													>
														Delete Variant {index + 1}
													</button>
												</div>
												<div className="flex flex-col sm:space-x-4 sm:flex-row">
													<InputField
														name={`variants.${index}.variant`}
														label={`Variant Identifer for Variant ${index + 1}`}
														placeholder="Variant"
														type="text"
														autoComplete="variant"
													/>
													<InputField
														name={`variants.${index}.price`}
														label={`Price for Variant ${index + 1}`}
														placeholder="Price"
														type="number"
														autoComplete="price"
													/>
													<InputField
														name={`variants.${index}.quantity`}
														label={`Quantity for Variant ${index + 1}`}
														placeholder="Quantity"
														type="number"
														autoComplete="quantity"
													/>
												</div>
												<div className="col"></div>
											</div>
										))}
								</div>
								<div className="w-full flex my-4">
									<button
										type="button"
										className="btn btn-success btn-sm mx-auto"
										onClick={() =>
											push({
												price: "",
												quantity: "",
												variant: "",
											})
										}
									>
										Add Variant
									</button>
								</div>
							</div>
						)}
					</FieldArray>

					<FieldArray name="images">
						{({ remove, push }) => (
							<div className="my-4">
								<div className="flex flex-row items-center">
									<h1 className="">Images</h1>
								</div>
								<div className="flex flex-col space-y-4">
									{values.images.length > 0 &&
										values.images.map((friend, index) => (
											<div key={index}>
												<div className="flex flex-row justify-end items-end">
													<button
														type="button"
														className="btn btn-xs btn-error"
														onClick={() => remove(index)}
													>
														Delete Image {index + 1}
													</button>
												</div>
												<InputField
													name={`images.${index}.imageURL`}
													label={`Image URL for Image ${index + 1}`}
													placeholder="Image URL"
													type="text"
													autoComplete="url"
												/>
											</div>
										))}
								</div>
								<div className="w-full flex my-4">
									<button
										type="button"
										className="btn btn-success btn-sm mx-auto"
										onClick={() =>
											push({
												imageURL: "",
											})
										}
									>
										Add Image
									</button>
								</div>
							</div>
						)}
					</FieldArray>

					<div className="flex mt-4 space-x-4">
						<button
							className={`btn btn-primary gap-2 rounded-md ${
								isSubmitting && "loading"
							}`}
							type="submit"
						>
							{isSubmitting ? "Loading" : "Create Product"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default AddProductForm;
