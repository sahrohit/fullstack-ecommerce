/* eslint-disable no-nested-ternary */
import { CellContext, createColumnHelper } from "@tanstack/react-table";
import {
	VStack,
	Spinner,
	FormControl,
	FormLabel,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	useToast,
	Button,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import { RiAddFill } from "react-icons/ri";
import * as Yup from "yup";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {
	ShippingMethod,
	useCreateShippingMethodMutation,
	useDeleteShippingMethodMutation,
	useShippingmethodsByTenantQuery,
	useUpdateShippingMethodMutation,
} from "@/generated/graphql";
import HeadingGroup from "@/components/ui/HeadingGroup";
import { DataTable } from "@/components/ui/table";
import Result from "@/components/shared/Result";
import InputField from "@/components/ui/InputField";
import ModalButton from "@/components/ui/ModalButton";
import { PriceTag } from "@/components/shared/PriceTag";
import ConfirmationModal from "@/components/helpers/ConfirmationModal";

const columnHelper = createColumnHelper<ShippingMethod>();

const columns = [
	columnHelper.accessor("name", {
		cell: (info) => info.getValue(),
		header: "Name",
	}),
	columnHelper.accessor("price", {
		cell: (info) => <PriceTag currency="NPR" price={info.getValue()} />,
		header: "Price",
	}),
	columnHelper.accessor("dispatch_in", {
		cell: (info) => `${info.getValue()} hr`,
		header: "Dispatch In",
	}),
	columnHelper.accessor("id", {
		cell: (info) => <ShippingMethodActions info={info} />,
		header: "Actions",
	}),
];

interface NewShippingMethodFormValues {
	name: string;
	price: number;
	dispatch_in: number;
}

const NewShippingMethodFormSchema = Yup.object({
	name: Yup.string().required(),
	price: Yup.number().required(),
	dispatch_in: Yup.number().required(),
});

interface ShippingMethodFormProps {
	onSuccess?: () => void;
	defaultValues?: NewShippingMethodFormValues & {
		id: number;
	};
}

const ShippingMethodForm = ({
	onSuccess,
	defaultValues,
}: ShippingMethodFormProps) => {
	const toast = useToast();
	const [createShippingMethod] = useCreateShippingMethodMutation({
		refetchQueries: ["ShippingMethods", "ShippingmethodsByTenant"],
		onCompleted(data) {
			toast({
				title: "Staff Added Successfully",
				description: `${data.createShippingMethod.name} shipping method created`,
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

	const [updateShippingMethod] = useUpdateShippingMethodMutation({
		refetchQueries: ["ShippingMethods", "ShippingmethodsByTenant"],
		onCompleted(data) {
			toast({
				title: "Shipping Method Updated Successfully",
				description: `${data.updateShippingMethod.name} shipping method updated`,
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
	} = useForm<NewShippingMethodFormValues>({
		defaultValues: defaultValues || {
			name: "",
			price: 0,
			dispatch_in: 0,
		},
		resolver: yupResolver(NewShippingMethodFormSchema),
	});
	return (
		<form
			onSubmit={handleSubmit(async (values) => {
				if (defaultValues) {
					updateShippingMethod({
						variables: {
							...values,
							price: values.price * 100,
							id: defaultValues.id,
						},
					});
				} else {
					createShippingMethod({
						variables: { ...values, price: values.price * 100 },
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
					label="Shipping Method Name"
					autoComplete="name"
					placeholder="eg. Express Delivery"
					size="lg"
				/>
				<HStack w="full" gap={2}>
					<InputField
						register={{ ...register("price") }}
						error={errors.price}
						touched={dirtyFields.price}
						required
						name="price"
						type="numeric"
						label="Shipping Method Price"
						autoComplete="price"
						placeholder="Price"
						size="lg"
					/>
					<InputField
						register={{ ...register("dispatch_in") }}
						error={errors.dispatch_in}
						touched={dirtyFields.dispatch_in}
						required
						name="dispatch_in"
						type="numeric"
						label="Dispatched within (in hrs)"
						autoComplete="dispatch_in"
						placeholder="Dispatch in"
						size="lg"
					/>
				</HStack>
				<Button mb={4} w="full" type="submit" colorScheme="primary">
					{defaultValues ? "Update" : "Add"} New Shipping Method
				</Button>
			</VStack>
		</form>
	);
};

ShippingMethodForm.defaultProps = {
	onSuccess: () => {},
	defaultValues: null,
};

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
						<FormLabel srOnly>Filter by name, price of dispatch time</FormLabel>
						<InputLeftElement pointerEvents="none" color="gray.400">
							<BsSearch />
						</InputLeftElement>
						<Input
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							rounded="base"
							type="search"
							placeholder="Filter by name or name..."
						/>
					</InputGroup>
				</FormControl>
			</HStack>
			<ModalButton
				buttonText="New Shipping Method"
				modalHeader="Add New Shipping Method"
				size="sm"
				colorScheme="primary"
				iconSpacing="1"
				leftIcon={<RiAddFill fontSize="1.25em" />}
				ref={modalRef}
			>
				<ShippingMethodForm onSuccess={closeModal} />
			</ModalButton>
		</Stack>
	);
};

const ShippingMethodActions = ({
	info,
}: {
	info: CellContext<ShippingMethod, number>;
}) => {
	const toast = useToast();
	const [deleteShippingMethod] = useDeleteShippingMethodMutation({
		refetchQueries: ["ShippingMethods", "ShippingmethodsByTenant"],
		onCompleted() {
			toast({
				title: "Staff Deleted Successfully",
				description: `${info.row.original.name} deleted`,
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

	return (
		<HStack>
			<ModalButton
				buttonText="Edit"
				modalHeader={`Editing ${info.row.original.name}`}
				size="sm"
				colorScheme="primary"
				iconSpacing="1"
				leftIcon={<AiOutlineEdit fontSize="1.25em" />}
			>
				<ShippingMethodForm defaultValues={info.row.original} />
			</ModalButton>
			<ConfirmationModal
				onSuccess={() => {
					deleteShippingMethod({
						variables: {
							id: info.row.original.id,
						},
					});
				}}
				bodyText={`Are you sure you want to delete ${info.row.original.name} from shipping methods?`}
				headerText={`Delete ${info.row.original.name}`}
				confirmButtonProps={{
					colorScheme: "red",
				}}
				leftIcon={<AiOutlineDelete fontSize="1.25em" />}
				size="sm"
				colorScheme="red"
			>
				Delete
			</ConfirmationModal>
		</HStack>
	);
};

const DeliveryOptions = () => {
	const [searchText, setSearchText] = useState("");
	const { data, loading, error } = useShippingmethodsByTenantQuery();

	if (error) {
		<Result
			heading={error.name}
			type="error"
			text={error.message}
			dump={error.stack}
		/>;
	}

	let filteredData: ShippingMethod[] =
		data?.shippingmethodsByTenant as ShippingMethod[];

	if (searchText) {
		filteredData = data?.shippingmethodsByTenant?.filter(
			(shippingMethod) =>
				shippingMethod.name.toLowerCase().includes(searchText.toLowerCase()) ||
				shippingMethod.price.toString().includes(searchText.toLowerCase()) ||
				shippingMethod.dispatch_in.toString().includes(searchText.toLowerCase())
		) as ShippingMethod[];
	}

	return (
		<VStack gap={4} w="full">
			<HeadingGroup
				title="Manage Shipping Methods"
				description="Manage various shipping options, you customer can select."
			/>
			<TableActions searchText={searchText} setSearchText={setSearchText} />
			{loading ? (
				<Spinner />
			) : (
				<DataTable columns={columns} data={filteredData} />
			)}
		</VStack>
	);
};

export default DeliveryOptions;
