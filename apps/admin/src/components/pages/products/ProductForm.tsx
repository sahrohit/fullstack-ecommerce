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
	IconButton,
	FormHelperText,
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
import { Reorder, useMotionValue } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { UploadDropzone } from "@/utils/uploadthing";
import { cartesian } from "@/utils/helpers";
import useRaisedShadow from "@/hooks/useRaisedShadow";

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

	const y = useMotionValue(0);
	const boxShadow = useRaisedShadow(y);

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
		control,
		name: "combinations",
	});

	const { fields: imageFields, append: appendImage } = useFieldArray({
		control,
		name: "images",
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
			})) ?? []
		);
	}, [combinations, setValue]);

	return (
		<VStack
			gap={4}
			w="full"
			as="form"
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
			<HStack w="full" alignItems="flex-start" gap={2}>
				<VStack w="full">
					<FormControl id="desc" isInvalid={!!errors.desc && dirtyFields.desc}>
						<HStack justifyContent="space-between">
							<FormLabel>Product Description</FormLabel>
							<FormErrorMessage>{errors.desc?.message}</FormErrorMessage>
						</HStack>
						<Textarea {...register("desc")} />
					</FormControl>
					<FormControl id="images">
						<HStack justifyContent="space-between">
							<FormLabel>Images</FormLabel>
							<FormHelperText fontSize="xs">
								{!errors.images?.message && "Delete & Upload Again to Reorder"}
							</FormHelperText>
							<FormErrorMessage>{errors.images?.message}</FormErrorMessage>
						</HStack>

						{/* TODO: This needs to be reworked, as it is sketchy and not working properly  */}
						<Reorder.Group
							axis="x"
							onReorder={reorderImages}
							values={imageFields}
							as="div"
							style={{
								width: "100%",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "flex-start",
								gap: "1rem",
								listStyle: "none",
								flexWrap: "wrap",
							}}
						>
							{imageFields.map((field) => (
								<Reorder.Item
									style={{
										position: "relative",
										boxShadow,
										y,
										cursor: "grab",
									}}
									key={field.url}
									value={field}
									id={field.url}
								>
									<Image
										key={field.url}
										src={field.url}
										width={120}
										height={120}
										draggable="false"
										alt="Product Image"
										objectFit="cover"
										border="2px dotted"
										borderColor="gray.500"
										borderRadius="md"
									/>
									<IconButton
										onClick={() => {
											setValue(
												"images",
												imageFields.filter((item) => item.url !== field.url)
											);
										}}
										size="xs"
										position="absolute"
										top="2"
										right="2"
										colorScheme="red"
										aria-label="Delete Image"
										icon={<AiOutlineClose />}
									/>
								</Reorder.Item>
							))}
						</Reorder.Group>
						<UploadDropzone
							appearance={{
								container: {
									width: "100%",
								},
							}}
							endpoint="productImageUploader"
							onClientUploadComplete={(res) => {
								res?.forEach((image) => {
									appendImage({
										url: image.url as string,
										sequence: imageFields.length,
									});
								});
							}}
							onUploadError={(uploadError: Error) => {
								toast({
									title: "Product Image Upload Failed",
									description: uploadError.message,
									status: "error",
									duration: 5000,
									isClosable: true,
								});
							}}
						/>
					</FormControl>
				</VStack>
				<FormControl id="variants">
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
						<AutoCompleteInput w="full" size="lg" autoComplete="off">
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
					<VStack p={4} w="full" alignItems="flex-start">
						{variantFields.map((field, index) => (
							<HStack w="full">
								<InputField
									register={{ ...register(`combinations.${index}.price`) }}
									error={errors?.combinations?.[index]?.price}
									touched={dirtyFields?.combinations?.[index]?.price}
									required
									name="name"
									type="text"
									label={`Price (${
										field.variants.length > 1
											? field.variants.join(", ")
											: field.variants[0]
									})`}
									autoComplete="price"
									placeholder="e.g. 9000"
									size="md"
								/>
								<InputField
									register={{ ...register(`combinations.${index}.quantity`) }}
									error={errors?.combinations?.[index]?.quantity}
									touched={dirtyFields?.combinations?.[index]?.quantity}
									required
									name="name"
									type="text"
									label={`Quantity (${
										field.variants.length > 1
											? field.variants.join(", ")
											: field.variants[0]
									})`}
									autoComplete="quantity"
									placeholder="e.g. 30"
									size="md"
								/>
								<InputField
									register={{ ...register(`combinations.${index}.sku`) }}
									error={errors?.combinations?.[index]?.sku}
									touched={dirtyFields?.combinations?.[index]?.sku}
									required
									name="name"
									type="text"
									label={`Sku (${
										field.variants.length > 1
											? field.variants.join(", ")
											: field.variants[0]
									})`}
									autoComplete="sku"
									placeholder="e.g. red-green"
									size="md"
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
									<Switch
										size="md"
										{...register(`combinations.${index}.isPublished`)}
									/>
								</FormControl>
							</HStack>
						))}
					</VStack>
				</FormControl>
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
	);
};

ProductForm.defaultProps = {
	onSuccess: () => {},
	defaultValues: null,
};

export default ProductForm;
