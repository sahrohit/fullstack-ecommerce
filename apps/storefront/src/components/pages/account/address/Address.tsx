import {
	Box,
	Stack,
	StackDivider,
	useColorModeValue as mode,
	Badge,
	Button,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import ADDRESS from "@/data/address";
import { MdWorkOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";

const AddressSection = () => (
	<Box mx="auto">
		<Box
			rounded="lg"
			bg={mode("white", "gray.700")}
			shadow="base"
			overflow="hidden"
		>
			<Stack spacing="6" divider={<StackDivider />} py="5" px="8">
				{ADDRESS.map((address) => (
					<Address key={address.id} address={address} />
				))}
			</Stack>
		</Box>
	</Box>
);

export default AddressSection;

interface AddressProps {
	address: {
		id: string;
		name: string;
		type: string;
		isDefault: boolean;
		address: string;
		city: string;
		state: string;
		zip: string;
		country: string;
		phone: string;
	};
}

export const Address = ({ address }: AddressProps) => (
	<Stack
		direction={{ base: "column", sm: "row" }}
		spacing="5"
		justify="space-between"
		pos="relative"
	>
		<Stack
			direction={{ base: "column", sm: "row" }}
			spacing="4"
			align="flex-start"
			flex="1"
		>
			<Box aria-hidden fontSize="2xl" pt="1" color="gray.500">
				{address.type === "Home" ? <FaHome /> : <MdWorkOutline />}
			</Box>
			<Box flex="1">
				<Box as="h4" fontWeight="bold" maxW="xl">
					<span>{address.name}</span>{" "}
					{address.isDefault && <Badge marginStart="1">Recommended</Badge>}
				</Box>
				<Box
					maxW={{ base: "xs", md: "unset" }}
					color={mode("gray.600", "gray.400")}
					fontSize="md"
				>
					{address.address}, {address.city}
					<br />
					{address.state} {address.zip}, {address.country}
				</Box>
				<Box
					color={mode("gray.600", "gray.400")}
					fontSize="lg"
					fontWeight="semibold"
				>
					{address.phone && `Phone: ${address.phone}`}
				</Box>
			</Box>
		</Stack>
		<Stack
			direction={{ base: "row", md: "column" }}
			justifyContent={{ base: "flex-start", md: "center" }}
		>
			<Button variant="outline" leftIcon={<FiEdit />}>
				Edit
			</Button>
			<Button colorScheme="red" leftIcon={<BiTrash />}>
				Delete
			</Button>
		</Stack>
	</Stack>
);
