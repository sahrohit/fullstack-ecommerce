/* eslint-disable no-nested-ternary */
import {
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
	Spinner,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { CellContext, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Result from "@/components/shared/Result";
import HeadingGroup from "@/components/ui/HeadingGroup";
import { DataTable } from "@/components/ui/table";
import { type ProductCategory, useCategoriesQuery } from "@/generated/graphql";
import ConfirmationModal from "@/components/helpers/ConfirmationModal";
import ModalButton from "@/components/ui/ModalButton";

export const TableActions = () => (
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
					<FormLabel srOnly>Filter by name or email</FormLabel>
					<InputLeftElement pointerEvents="none" color="gray.400">
						<BsSearch />
					</InputLeftElement>
					<Input
						// value={searchText}
						// onChange={(e) => setSearchText(e.target.value)}
						rounded="base"
						type="search"
						placeholder="Filter by name or email..."
					/>
				</InputGroup>
			</FormControl>
			<Select
				w={{ base: "300px", md: "full" }}
				rounded="base"
				size="sm"
				// value={selectedRole}
				// onChange={(e) => setSelectedRole(Number(e.target.value))}
			>
				<option value={0}>All categories</option>
				{/* {categoriesData?.categories
					.filter((r) => r.id !== 1)
					.map((role) => (
						<option key={`role-${role.id}`} value={role.id}>
							{role.name}
						</option>
					))} */}
			</Select>
		</HStack>
	</Stack>
);

const columnHelper = createColumnHelper<ProductCategory>();

const columns = [
	// columnHelper.accessor("name", {
	// 	cell: (info) => <Checkbox size="lg" />,
	// 	header: "",
	// }),
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
	columnHelper.accessor("desc", {
		cell: (info) => info.getValue(),
		header: "Desc",
	}),
	// columnHelper.accessor("user", {
	// 	cell: (info) => (
	// 		<UserProfile
	// 			email={info.getValue()?.email ?? ""}
	// 			imageUrl={info.getValue()?.imageUrl ?? ""}
	// 			name={`${info.getValue()?.first_name} ${info.getValue()?.last_name}`}
	// 		/>
	// 	),
	// 	header: "User",
	// }),
	// columnHelper.accessor("user.role", {
	// 	cell: (info) => <RoleSelector info={info} />,
	// 	header: "Role",
	// }),
	// columnHelper.accessor("status", {
	// 	cell: (info) => (
	// 		<Badge fontSize="xs" colorScheme={colorFromStatus(info.getValue())}>
	// 			{info.getValue()}
	// 		</Badge>
	// 	),
	// 	header: "Status",
	// }),
	columnHelper.accessor("id", {
		cell: (info) => <CategoryActions info={info} />,
		header: "Actions",
	}),
];

const CategoryActions = ({
	info,
}: {
	info: CellContext<ProductCategory, number>;
}) => (
	<HStack gap={2}>
		<ModalButton
			modalHeader={`Edit ${info.row.original.name}`}
			size="sm"
			colorScheme="primary"
			buttonText="Edit"
		>
			Editing
		</ModalButton>
		<ConfirmationModal
			bodyText={`Are you sure you want to delete category ${info.row.original.name}?`}
			confirmButtonProps={{ colorScheme: "red" }}
			headerText={`Delete Category ${info.row.original.name}?`}
			onSuccess={() => {
				console.log("Deleted");
			}}
			size="sm"
			confirmText="delete"
			colorScheme="red"
		>
			Delete
		</ConfirmationModal>
	</HStack>
);

const SettingsPage = () => {
	const { data, loading, error } = useCategoriesQuery();

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

	return (
		<VStack gap={4} w="full">
			<HeadingGroup
				title="Manage Staffs"
				description="Manage your staffs here."
			/>
			<TableActions />
			{loading ? (
				<Spinner />
			) : (
				<DataTable
					columns={columns}
					data={data?.categories as ProductCategory[]}
				/>
			)}
		</VStack>
	);
};

export default SettingsPage;
