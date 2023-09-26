/* eslint-disable no-nested-ternary */
import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	Spinner,
	Stack,
	Text,
	Textarea,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { CellContext, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { RiAddFill } from "react-icons/ri";
import Result from "@/components/shared/Result";
import HeadingGroup from "@/components/ui/HeadingGroup";
import { DataTable } from "@/components/ui/table";
import {
	type ProductCategoryWithProductCount,
	useCategoriesSummaryQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} from "@/generated/graphql";
import ConfirmationModal from "@/components/helpers/ConfirmationModal";
import ModalButton from "@/components/ui/ModalButton";
import InputField from "@/components/ui/InputField";
import FileUploadInputField from "@/components/ui/FileUploadInputField";

interface TableActionsProps {
	searchText: string;
	setSearchText: Dispatch<SetStateAction<string>>;
}
export const TableActions = ({
	searchText,
	setSearchText,
}: TableActionsProps) => {
	const modalRef: any = useRef();

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};
	return (
		<Stack
			w="full"
			spacing="4"
			direction={{ base: "column", md: "row" }}
			justify="space-between"
			position="sticky"
			top="0"
		>
			<HStack>
				<FormControl minW={{ md: "320px" }} id="search">
					<InputGroup size="sm">
						<FormLabel srOnly>Filter by name or description</FormLabel>
						<InputLeftElement pointerEvents="none" color="gray.400">
							<BsSearch />
						</InputLeftElement>
						<Input
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							rounded="base"
							type="search"
							placeholder="Filter by name or description..."
						/>
					</InputGroup>
				</FormControl>
			</HStack>
			<ModalButton
				buttonText="New Category/Collection"
				modalHeader="Add New Category/Collection"
				size="sm"
				colorScheme="primary"
				iconSpacing="1"
				leftIcon={<RiAddFill fontSize="1.25em" />}
				ref={modalRef}
			>
				<CategoryForm onSuccess={closeModal} />
			</ModalButton>
		</Stack>
	);
};

const columnHelper = createColumnHelper<ProductCategoryWithProductCount>();

const columns = [
	columnHelper.accessor("name", {
		cell: (info) => (
			<HStack spacing="4" px="2" w="full">
				<Image
					alt={info.getValue()}
					height={48}
					width={48}
					src={info.row.original.imageURL}
					style={{
						borderRadius: "4px",
					}}
				/>
				<Flex direction="column">
					<Text fontWeight="medium">{info.getValue()} </Text>
				</Flex>
			</HStack>
		),
		header: "Name",
	}),
	columnHelper.accessor("product_count", {
		cell: (info) => <Text>{info.getValue()} products</Text>,
		header: "ProductCount",
	}),
	columnHelper.accessor("desc", {
		cell: (info) => info.getValue(),
		header: "Desc",
	}),
	columnHelper.accessor("id", {
		cell: (info) => <CategoryActions info={info} />,
		header: "Actions",
	}),
];

interface NewCategoryFormValues {
	name: string;
	desc: string;
	imageURL: string;
}

const NewCategoryFormSchema = Yup.object({
	name: Yup.string().required(),
	desc: Yup.string().required(),
	imageURL: Yup.string().url().required(),
});

interface CategoryFormProps {
	onSuccess?: () => void;
	defaultValues?: NewCategoryFormValues & {
		id: number;
	};
}

const CategoryForm = ({ onSuccess, defaultValues }: CategoryFormProps) => {
	const toast = useToast();
	const [createCategory] = useCreateCategoryMutation({
		refetchQueries: ["Categories", "CategoriesSummary"],
		onCompleted(data) {
			toast({
				title: "Category Created Successfully",
				description: `${data.createCategory.name} category created`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			if (typeof onSuccess === "function") {
				onSuccess();
			}
		},
		onError(error) {
			toast({
				title: "An Error Occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

	const [updateCategory] = useUpdateCategoryMutation({
		refetchQueries: ["Categories", "CategoriesSummary"],
		onCompleted(data) {
			toast({
				title: "Category Updated Successfully",
				description: `${data.updateCategory.name} category updated`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			if (typeof onSuccess === "function") {
				onSuccess();
			}
		},
		onError(error) {
			toast({
				title: "An Error Occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
		watch,
		setValue,
	} = useForm<NewCategoryFormValues>({
		defaultValues: defaultValues || {
			name: "",
			desc: "",
			imageURL: "",
		},
		resolver: yupResolver(NewCategoryFormSchema),
	});

	const { imageURL } = watch();

	return (
		<form
			onSubmit={handleSubmit(async (values) => {
				if (defaultValues) {
					updateCategory({
						variables: {
							id: defaultValues.id,
							options: {
								name: values.name,
								desc: values.desc,
								imageURL: values.imageURL,
							},
						},
					});
				} else {
					createCategory({
						variables: values,
					});
				}
			})}
		>
			<VStack gap={4}>
				<InputField
					register={{ ...register("name") }}
					error={errors.name}
					touched={dirtyFields.name}
					required
					name="name"
					type="name"
					label="Category Name"
					autoComplete="name"
					placeholder="eg. Himalayan Collection"
					size="lg"
				/>
				<FormControl id="desc" isInvalid={!!errors.desc && dirtyFields.desc}>
					<HStack justifyContent="space-between">
						<FormLabel>Category Description</FormLabel>
						<FormErrorMessage>{errors.desc?.message}</FormErrorMessage>
					</HStack>
					<Textarea {...register("desc")} />
				</FormControl>
				<FileUploadInputField
					error={errors.imageURL}
					label="Category Image"
					name="imageURL"
					onResetField={async () => {
						setValue("imageURL", "");
					}}
					onUploadComplete={(res) => {
						setValue("imageURL", res?.[0].url ?? "");
					}}
					value={imageURL}
				/>

				<Button mb={4} w="full" type="submit" colorScheme="primary">
					{defaultValues ? "Update" : "Add New"} Category
				</Button>
			</VStack>
		</form>
	);
};

CategoryForm.defaultProps = {
	onSuccess: () => {},
	defaultValues: null,
};

const CategoryActions = ({
	info,
}: {
	info: CellContext<ProductCategoryWithProductCount, number>;
}) => {
	const toast = useToast();

	const modalRef: any = useRef();

	const [deleteCategory] = useDeleteCategoryMutation({
		refetchQueries: ["Categories", "CategoriesSummary"],
		onCompleted() {
			toast({
				title: "Category Deleted Successfully",
				description: `${info.row.original.name} category deleted`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		},
		onError(error) {
			toast({
				title: "An Error Occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};
	return (
		<HStack gap={2}>
			<ModalButton
				modalHeader={`Edit ${info.row.original.name}`}
				size="sm"
				colorScheme="primary"
				buttonText="Edit"
				ref={modalRef}
			>
				<CategoryForm
					defaultValues={info.row.original}
					onSuccess={closeModal}
				/>
			</ModalButton>
			<ConfirmationModal
				bodyText={`Are you sure you want to delete category ${info.row.original.name}?`}
				confirmButtonProps={{ colorScheme: "red" }}
				headerText={`Delete Category ${info.row.original.name}?`}
				onSuccess={() => {
					deleteCategory({
						variables: {
							id: info.row.original.id,
						},
					});
				}}
				size="sm"
				confirmText="delete"
				colorScheme="red"
				isDisabled={info.row.original.product_count > 0}
			>
				Delete
			</ConfirmationModal>
		</HStack>
	);
};

const CategoryPage = () => {
	const { data, loading, error } = useCategoriesSummaryQuery();
	const [searchText, setSearchText] = useState("");

	if (error) {
		return (
			<Result
				heading={error.name}
				text={error.message}
				type="error"
				dump={error.stack}
			/>
		);
	}

	let filteredData: ProductCategoryWithProductCount[] =
		data?.categoriesSummary as ProductCategoryWithProductCount[];

	if (searchText) {
		filteredData = data?.categoriesSummary?.filter(
			(category) =>
				category.name.toLowerCase().includes(searchText.toLowerCase()) ||
				category.desc.toLowerCase().includes(searchText.toLowerCase())
		) as ProductCategoryWithProductCount[];
	}

	return (
		<VStack gap={4} w="full">
			<HeadingGroup
				title="Manage Product Category"
				description="Manage your product categories and collections here."
			/>
			<TableActions searchText={searchText} setSearchText={setSearchText} />
			{loading ? (
				<Spinner />
			) : (
				<DataTable
					columns={columns}
					data={filteredData as ProductCategoryWithProductCount[]}
				/>
			)}
		</VStack>
	);
};

export default CategoryPage;
