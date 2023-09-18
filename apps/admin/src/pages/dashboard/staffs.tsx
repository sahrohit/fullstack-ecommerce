import { createColumnHelper } from "@tanstack/react-table";
import {
	Avatar,
	Badge,
	Button,
	Flex,
	HStack,
	Text,
	ButtonGroup,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
	Stack,
	VStack,
} from "@chakra-ui/react";

import { BsSearch } from "react-icons/bs";
import { RiAddFill, RiArrowRightUpLine } from "react-icons/ri";
import { DataTable } from "@/components/ui/table";
import HeadingGroup from "@/components/ui/HeadingGroup";
import withProtected from "@/routes/withProtected";

type User = {
	role: string;
	status: string;
	earned: string;
	id: string;
	user: {
		imageUrl: string;
		name: string;
		email: string;
	};
};

export const data: User[] = [
	{
		role: "Admin",
		status: "active",
		earned: "$45,000",
		id: "blog",
		user: {
			imageUrl:
				"https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDN8fGd1eSUyMGZhY2V8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
			name: "Marion Watson",
			email: "codyfisher@example.com",
		},
	},
	{
		role: "Marketing Director",
		status: "reviewing",
		earned: "$4,840",
		id: "home",
		user: {
			imageUrl:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
			name: "Louise Hopkins",
			email: "jane@example.com",
		},
	},
	{
		role: "Front Desk Officer",
		status: "declined",
		id: "design-system",
		earned: "$89,054",
		user: {
			imageUrl:
				"https://images.unsplash.com/photo-1470506028280-a011fb34b6f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjN8fGxhZHklMjBmYWNlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
			name: "Susan Schwartz",
			email: "jenyzx@exmaple.com",
		},
	},
	{
		role: "Lead Software Engineer",
		status: "active",
		earned: "$19,954",
		id: "home-2",
		user: {
			imageUrl:
				"https://images.unsplash.com/photo-1533674689012-136b487b7736?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjl8fGFmcmljYSUyMGxhZHklMjBmYWNlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
			name: "Sade Akinlade",
			email: "melyb@example.com",
		},
	},
];

const columnHelper = createColumnHelper<User>();

const columns = [
	columnHelper.accessor("user", {
		cell: (info) => <UserProfile {...info.getValue()} />,
		header: "User",
	}),
	columnHelper.accessor("role", {
		cell: (info) => info.getValue(),
		header: "Role",
	}),
	columnHelper.accessor("status", {
		cell: (info) => (
			<Badge fontSize="xs" colorScheme="green">
				{info.getValue()}
			</Badge>
		),
		header: "Status",
	}),
	columnHelper.accessor("earned", {
		cell: (info) => <Text>${info.getValue()}</Text>,
		header: "Amount Earned",
		meta: {
			isNumeric: true,
		},
	}),
	columnHelper.accessor("id", {
		cell: (info) => (
			<HStack>
				<Button
					variant="link"
					colorScheme="blue"
					onClick={() => {
						console.log("Revoke", info.getValue());
					}}
				>
					Revoke
				</Button>
				<Button
					variant="link"
					colorScheme="blue"
					onClick={() => {
						console.log("Delete", info.getValue());
					}}
				>
					Delete
				</Button>
				info.getValue(),
			</HStack>
		),
		header: "Actions",
	}),
];

interface UserProfileProps {
	name: string;
	imageUrl: string;
	email: string;
}

export const UserProfile = ({ name, imageUrl, email }: UserProfileProps) => (
	<HStack spacing="4" px="2" w="full">
		<Avatar
			name={name}
			src={
				imageUrl ??
				`https://api.dicebear.com/6.x/micah/svg?size=256&seed=${name}`
			}
		/>
		<Flex direction="column">
			<Text fontWeight="medium">{name}</Text>
			<Text fontSize="sm" lineHeight="shorter">
				{email}
			</Text>
		</Flex>
	</HStack>
);

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
						rounded="base"
						type="search"
						placeholder="Filter by name or email..."
					/>
				</InputGroup>
			</FormControl>
			<Select
				w={{ base: "300px", md: "unset" }}
				rounded="base"
				size="sm"
				placeholder="All roles"
			>
				<option>All roles</option>
				<option>UI Designers</option>
				<option>Marketing Directors</option>
			</Select>
		</HStack>
		<ButtonGroup size="sm" variant="outline">
			<Button iconSpacing="1" leftIcon={<RiAddFill fontSize="1.25em" />}>
				New member
			</Button>
			<Button
				iconSpacing="1"
				leftIcon={<RiArrowRightUpLine fontSize="1.25em" />}
			>
				Export CSV
			</Button>
		</ButtonGroup>
	</Stack>
);

const ManageStaffsPage = () => (
	<VStack gap={4} w="full">
		<HeadingGroup
			title="Manage Staffs"
			description="Manage your staffs here."
		/>
		<TableActions />
		<DataTable columns={columns} data={data} />
	</VStack>
);

export default withProtected(ManageStaffsPage);
