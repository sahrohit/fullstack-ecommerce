import {
	VStack,
	HStack,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Textarea,
	Select,
	Switch,
	useToast,
	Image,
} from "@chakra-ui/react";
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
	AutoCompleteTag,
} from "@choc-ui/chakra-autocomplete";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCategoriesQuery, useVariantsQuery } from "generated-graphql";
import { useEffect, useMemo } from "react";
import { FieldArrayWithId, useFieldArray, useForm } from "react-hook-form";
import { InputField } from "ui";
import * as Yup from "yup";
import { Reorder } from "framer-motion";
import { UploadButton } from "@/utils/uploadthing";
import { cartesian } from "@/utils/helpers";

interface NewProductFormValues {
	name: string;
	desc: string;
	category_id: number;
	variants: string[];
	images: {
		url: string;
		sequence: number;
	}[];
	combinations: {
		variants: string[];
		price: number;
		quantity: number;
		sku: string;
		isPublished: boolean;
	}[];
}

const NewProductFormSchema = Yup.object({
	name: Yup.string().required(),
	desc: Yup.string().required(),
	category_id: Yup.number().required(),
	variants: Yup.array().required(),
	images: Yup.array()
		.of(
			Yup.object({
				url: Yup.string().required(),
				sequence: Yup.number().required(),
			})
		)
		.required(),
	combinations: Yup.array()
		.of(
			Yup.object({
				variants: Yup.array().required(),
				price: Yup.number().required(),
				quantity: Yup.number().required(),
				isPublished: Yup.boolean().required(),
			})
		)
		.required(),
});

interface ProductFormProps {
	onSuccess?: () => void;
	defaultValues?: NewProductFormValues & {
		id: number;
	};
}

const ProductForm = ({ onSuccess, defaultValues }: ProductFormProps) => {
	const toast = useToast();
	console.log("OnSuccess", onSuccess);

	const { data: categories, loading: categoriesLoading } = useCategoriesQuery();
	const { data: variants } = useVariantsQuery();

	// const [createProduct] = useCreateProductMutation({
	// 	refetchQueries: ["Products", "ShippingmethodsByTenant"],
	// 	onCompleted(data) {
	// 		toast({
	// 			title: "Staff Added Successfully",
	// 			description: `${data.createProduct.name} shipping method created`,
	// 			status: "success",
	// 			duration: 5000,
	// 			isClosable: true,
	// 		});
	// 		if (typeof onSuccess === "function") {
	// 			onSuccess();
	// 		}
	// 	},
	// 	onError(error) {
	// 		toast({
	// 			title: "An Error Occured",
	// 			description: error.message,
	// 			status: "error",
	// 			duration: 5000,
	// 			isClosable: true,
	// 		});
	// 	},
	// });

	// const [updateProduct] = useUpdateProductMutation({
	// 	refetchQueries: ["Products", "ShippingmethodsByTenant"],
	// 	onCompleted(data) {
	// 		toast({
	// 			title: "Shipping Method Updated Successfully",
	// 			description: `${data.updateProduct.name} shipping method updated`,
	// 			status: "success",
	// 			duration: 5000,
	// 			isClosable: true,
	// 		});
	// 		if (typeof onSuccess === "function") {
	// 			onSuccess();
	// 		}
	// 	},
	// 	onError(error) {
	// 		toast({
	// 			title: "An Error Occured",
	// 			description: error.message,
	// 			status: "error",
	// 			duration: 5000,
	// 			isClosable: true,
	// 		});
	// 	},
	// });

	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields, touchedFields },
		setValue,
		watch,
		control,
	} = useForm<NewProductFormValues>({
		defaultValues: defaultValues || {
			name: "",
			desc: "",
			category_id: 0,
			variants: [],
			images: [],
			combinations: [],
		},
		resolver: yupResolver(NewProductFormSchema),
	});

	const { fields: variantFields } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: "combinations", // unique name for your Field Array
	});

	const { fields: imageFields, append: appendImage } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: "images", // unique name for your Field Array
	});

	const reorderImages = (
		images: FieldArrayWithId<NewProductFormValues, "images", "id">[]
	) => {
		setValue("images", images);
	};

	const combinations = useMemo(() => {
		const variantCombinations = variants?.variants
			.map((variant) => {
				if (watch("variants").includes(variant.variant_id.toString())) {
					return variant.variant_values.map((values) => values.value_id);
				}
				return null;
			})
			.filter((combination) => combination != null);
		if (variantCombinations) {
			if (variantCombinations.length === 1) {
				return variantCombinations?.[0]?.map((combination) => [combination]);
			}
			return cartesian(...variantCombinations);
		}
		return [];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [variants?.variants, watch("variants")]);

	useEffect(() => {
		setValue(
			"combinations",
			combinations?.map((combintation: string[]) => ({
				variants: combintation,
				price: 0,
				quantity: 0,
				sku: "",
				isPublished: false,
			}))
		);
	}, [combinations, setValue]);

	return (
		<form
			onSubmit={handleSubmit(async (values) => {
				console.log("Values", values);
				// if (defaultValues) {
				// 	updateProduct({
				// 		variables: {
				// 			...values,
				// 			name: values.name * 100,
				// 			id: defaultValues.id,
				// 		},
				// 	});
				// } else {
				// 	createProduct({
				// 		variables: { ...values, name: values.name * 100 },
				// 	});
				// }
			})}
		>
			<VStack gap={4} w="full">
				<HStack w="full" gap={2}>
					<InputField
						register={{ ...register("name") }}
						error={errors.name}
						touched={dirtyFields.name}
						required
						name="name"
						type="text"
						label="Product Name"
						autoComplete="name"
						placeholder="Nike Air Force"
						size="lg"
					/>
					<FormControl
						id="category_id"
						isInvalid={!!errors.category_id && touchedFields.category_id}
					>
						<HStack justifyContent="space-between">
							<FormLabel>Product Category</FormLabel>
							<FormErrorMessage>{errors.category_id?.message}</FormErrorMessage>
						</HStack>
						<Select size="lg" {...register("category_id")}>
							{categoriesLoading
								? ["Loading..."].map(() => (
										<option key="product-category-option-loading" value={1}>
											Loading...
										</option>
								  ))
								: categories?.categories.map((category) => (
										<option key={category.identifier} value={category.id}>
											{category.name}
										</option>
								  ))}
						</Select>
					</FormControl>
				</HStack>
				<FormControl id="desc" isInvalid={!!errors.desc && dirtyFields.desc}>
					<HStack justifyContent="space-between">
						<FormLabel>Product Description</FormLabel>
						<FormErrorMessage>{errors.desc?.message}</FormErrorMessage>
					</HStack>
					<Textarea {...register("desc")} />
				</FormControl>
				<FormControl id="variants" w="60">
					<HStack justifyContent="space-between">
						<FormLabel>Variants</FormLabel>
						<FormErrorMessage>{errors.variants?.message}</FormErrorMessage>
					</HStack>
					<AutoComplete
						openOnFocus
						multiple
						onChange={(vals) => {
							setValue("variants", vals);
						}}
					>
						<AutoCompleteInput size="lg" autoComplete="off">
							{({ tags }) =>
								tags.map((tag, tid) => (
									<AutoCompleteTag
										key={`${tid + 1}`}
										label={tag.label}
										onRemove={tag.onRemove}
									/>
								))
							}
						</AutoCompleteInput>
						<AutoCompleteList>
							{variants?.variants.map((variant, cid) => (
								<AutoCompleteItem
									key={`option-${cid + 1}`}
									value={variant.variant_id}
									label={variant.variant_name}
									textTransform="capitalize"
									_selected={{ bg: "whiteAlpha.50" }}
									_focus={{ bg: "whiteAlpha.100" }}
								>
									{variant.variant_name}
								</AutoCompleteItem>
							))}
						</AutoCompleteList>
					</AutoComplete>
				</FormControl>

				{variantFields.map((field, index) => (
					<HStack>
						<InputField
							register={{ ...register(`combinations.${index}.price`) }}
							error={errors?.combinations?.[index]?.price}
							touched={dirtyFields?.combinations?.[index]?.price}
							required
							name="name"
							type="text"
							label={`Product Price (${
								field.variants.length > 1
									? field.variants.join(", ")
									: field.variants[0]
							})`}
							autoComplete="price"
							placeholder="e.g. 9000"
							size="lg"
						/>
						<InputField
							register={{ ...register(`combinations.${index}.quantity`) }}
							error={errors?.combinations?.[index]?.quantity}
							touched={dirtyFields?.combinations?.[index]?.quantity}
							required
							name="name"
							type="text"
							label={`Product Quantity (${
								field.variants.length > 1
									? field.variants.join(", ")
									: field.variants[0]
							})`}
							autoComplete="quantity"
							placeholder="e.g. 30"
							size="lg"
						/>
						<InputField
							register={{ ...register(`combinations.${index}.sku`) }}
							error={errors?.combinations?.[index]?.sku}
							touched={dirtyFields?.combinations?.[index]?.sku}
							required
							name="name"
							type="text"
							label={`Product Sku (${
								field.variants.length > 1
									? field.variants.join(", ")
									: field.variants[0]
							})`}
							autoComplete="sku"
							placeholder="e.g. red-green"
							size="lg"
						/>
						<FormControl
							isInvalid={
								!!errors?.combinations?.[index]?.isPublished &&
								dirtyFields?.combinations?.[index]?.isPublished
							}
						>
							<HStack justifyContent="space-between">
								<FormLabel>Is Published</FormLabel>
								<FormErrorMessage>
									{errors?.combinations?.[index]?.isPublished?.message}
								</FormErrorMessage>
							</HStack>
							<Switch size="lg" {...register} />
						</FormControl>
					</HStack>
				))}

				<HStack>
					<Reorder.Group
						axis="x"
						onReorder={reorderImages}
						values={imageFields}
						as="div"
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
							gap: "2rem",
							listStyle: "none",
						}}
					>
						{imageFields.map((field) => (
							<Reorder.Item value={field} id={field.id}>
								<Image
									key={field.url}
									src={field.url}
									width={160}
									height={160}
									draggable="false"
									alt="Product Image"
									objectFit="cover"
								/>
							</Reorder.Item>
						))}
						<UploadButton
							endpoint="kycDocumentUploader"
							onClientUploadComplete={(res) => {
								appendImage({
									url: res?.[0].url as string,
									sequence: imageFields.length,
								});
							}}
							onUploadError={(uploadError: Error) => {
								toast({
									title: "KYC Document Upload Failed",
									description: uploadError.message,
									status: "error",
									duration: 5000,
									isClosable: true,
								});
							}}
						/>
					</Reorder.Group>
				</HStack>

				{/* TODO: Add Multiple File Upload & View Shared Component */}
				{/* <MultipleFileUploadInputField<NewProductFormValues>
					control={control}
					name="images"
					error={errors?.images?.[0]}
					label="Registration Document"
					onResetField={() => {
						console.log("Reset Triggered");
					}}
					onUploadComplete={(res) => {
						appendImage(res?.[0].url as string);
					}}
					value="abcdef"
				/> */}

				<Button mb={4} w="full" type="submit" colorScheme="primary">
					{defaultValues ? "Update" : "Add"} Create New Product
				</Button>
			</VStack>
		</form>
	);
};

ProductForm.defaultProps = {
	onSuccess: () => {},
	defaultValues: null,
};

export default ProductForm;
