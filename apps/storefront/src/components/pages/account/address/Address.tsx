import {
	Box,
	Stack,
	StackDivider,
	useColorModeValue as mode,
	Badge,
	SkeletonCircle,
	Skeleton,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import ConfirmationModal from "@/components/helpers/ConfirmationModal";
import ModalButton from "@/components/ui/ModalButton";
import {
	useAddressesQuery,
	useDeleteAddressMutation,
} from "@/generated/graphql";
import { useRef } from "react";
import AddressForm from "./AddressForm";

const AddressSection = () => {
	const { data, loading, error } = useAddressesQuery();

	if (error) return <div>Error: {error.message}</div>;

	return (
		<Box mx="auto">
			<Box
				rounded="lg"
				bg={mode("white", "gray.700")}
				shadow="base"
				overflow="hidden"
			>
				{loading ? (
					<Stack spacing="6" divider={<StackDivider />} py="5" px="8">
						{Array(3)
							.fill(4, 2, 1)
							.map((address) => (
								<AddressSkeleton key={address} />
							))}
					</Stack>
				) : (
					<Stack spacing="6" divider={<StackDivider />} py="5" px="8">
						{data?.addresses?.map((address) => (
							<Address key={address.id} address={address} />
						))}
					</Stack>
				)}
			</Box>
		</Box>
	);
};

export default AddressSection;

interface AddressProps {
	address: {
		id: number;
		name: string;
		type: string;
		isDefault: boolean;
		address: string;
		city: string;
		state: string;
		zip: string;
		country: string;
		phone_number: string;
	};
}

export const Address = ({ address }: AddressProps) => {
	const modalRef: any = useRef();
	const [onSubmissionSuccess] = useDeleteAddressMutation({
		refetchQueries: ["Addresses"],
	});

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};

	return (
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
					{address.type === "home" ? <FaHome /> : <MdWorkOutline />}
				</Box>
				<Box flex="1">
					<Box as="h4" fontWeight="bold" fontSize="xl" maxW="xl">
						<span>{address.name}</span>{" "}
						{address.isDefault && <Badge marginStart="1">Default</Badge>}
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
						{address.phone_number && `Phone: ${address.phone_number}`}
					</Box>
				</Box>
			</Stack>
			<Stack
				direction={{ base: "row", md: "column" }}
				justifyContent={{ base: "flex-start", md: "center" }}
			>
				<ModalButton
					ref={modalRef}
					variant="outline"
					leftIcon={<FiEdit />}
					buttonText="Edit"
					modalHeader="Edit Address"
					modalFooter=" "
				>
					<AddressForm
						onSubmissionSuccess={closeModal}
						id={address.id}
						defaultValues={address}
					/>
				</ModalButton>

				<ConfirmationModal
					colorScheme="red"
					leftIcon={<BiTrash />}
					onSuccess={() => {
						onSubmissionSuccess({
							variables: {
								deleteAddressId: address.id,
							},
						});
					}}
					bodyText="Are you sure you want to delete this address?"
					headerText="Delete Address?"
				/>
			</Stack>
		</Stack>
	);
};

export const AddressSkeleton = () => (
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
				<SkeletonCircle size="10" />
			</Box>
			<Box flex="1">
				<Skeleton as="h4" fontWeight="bold" fontSize="xl" maxW="xl">
					<Skeleton>Skeleton</Skeleton>{" "}
				</Skeleton>
				<Box
					maxW={{ base: "xs", md: "unset" }}
					color={mode("gray.600", "gray.400")}
					fontSize="md"
				>
					<Skeleton height="20px" />, <Skeleton height="20px" />
					<br />
					<Skeleton height="20px" /> <Skeleton height="20px" />,{" "}
					<Skeleton height="20px" />
				</Box>
				<Box
					color={mode("gray.600", "gray.400")}
					fontSize="lg"
					fontWeight="semibold"
				>
					<Skeleton height="20px" />
				</Box>
			</Box>
		</Stack>
		<Stack
			direction={{ base: "row", md: "column" }}
			justifyContent={{ base: "flex-start", md: "center" }}
		>
			<Skeleton height="20px" />
			<Skeleton height="20px" />
		</Stack>
	</Stack>
);
