/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
	Box,
	useRadioGroup,
	HStack,
	Text,
	useColorModeValue as mode,
	useId,
	UseRadioProps,
	useRadio,
	Skeleton,
	VStack,
	SkeletonCircle,
	Stack,
	Divider,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import {
	MdWorkOutline,
	MdCheckBox,
	MdCheckBoxOutlineBlank,
} from "react-icons/md";
import { Control, useController } from "react-hook-form";
import { Address, useAddressesQuery } from "generated-graphql";
import Result from "@/components/shared/Result";
import ListRadioBox from "@/components/ui/radio/list/ListRadioBox";
import { CheckoutForm } from "@/pages/cart/checkout";

interface AddressSelectorProps {
	control: Control<CheckoutForm, any>;
}

const AddressSelector = ({ control }: AddressSelectorProps) => {
	const { data: addresses, loading, error } = useAddressesQuery();

	const { field } = useController({
		name: "addressId",
		control,
	});

	const { getRadioProps } = useRadioGroup({ ...field });

	if (error)
		return (
			<Result
				heading={error.name}
				type="error"
				text={error.message}
				dump={error.stack}
			/>
		);
	return (
		<Box as="section" py={4} w="full">
			<Stack spacing="5" justify="flex-start" divider={<Divider />}>
				{loading
					? Array(3)
							.fill("address-skeleton")
							.map((address, index) => (
								<AddressSelectorRadioSkeleton key={`${address}-${index + 1}`} />
							))
					: addresses?.addresses?.map((address) => (
							<AddressSelectorRadio
								{...getRadioProps({ value: `${address.id}` })}
								key={`checkout-address-${address.id}`}
								address={address}
							/>
					  ))}
			</Stack>
		</Box>
	);
};

export default AddressSelector;

interface ListRadioProps extends UseRadioProps {
	address: Address;
}

const AddressSelectorRadio = ({ address, ...rest }: ListRadioProps) => {
	const { getRadioProps, getInputProps, getLabelProps, state } = useRadio(rest);
	const id = useId();

	return (
		<label {...getLabelProps()}>
			<input {...getInputProps()} aria-labelledby={id} />
			<ListRadioBox {...getRadioProps()} id={id}>
				<HStack spacing="4">
					<Box
						data-checked={state.isChecked ? "" : undefined}
						fontSize="2xl"
						_checked={{
							color: mode("primary.500", "primary.300"),
						}}
						color={mode("gray.300", "whiteAlpha.400")}
					>
						{state.isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
					</Box>
					<Box flex="1">
						<Text fontWeight="bold">{address.name}</Text>
						<Text fontSize="sm">
							{address.address}, {address.zip}, {address.city}, {address.state}
						</Text>
						<Text fontWeight="semibold">
							Phone Number: {address.phone_number}
						</Text>
					</Box>
					<Box fontSize="3xl">
						{address.type === "home" ? <FaHome /> : <MdWorkOutline />}
					</Box>
				</HStack>
			</ListRadioBox>
		</label>
	);
};

const AddressSelectorRadioSkeleton = () => (
	<Box
		borderWidth="2px"
		px="4"
		py="3"
		borderRadius="md"
		cursor="pointer"
		transition="all 0.2s"
		_focus={{ shadow: "outline" }}
		_checked={{
			bg: mode("gray.50", "whiteAlpha.100"),
			borderColor: mode("primary.500", "primary.300"),
		}}
	>
		<HStack spacing="4">
			<Skeleton w="24px">.</Skeleton>
			<SkeletonCircle />
			<VStack flex="1" w="full" alignItems="flex-start">
				<Skeleton w="1/2">Rohit Kumar Sah (9865071231)</Skeleton>
				<Skeleton w="2/3">
					House no 6, Surya Colony, Tikathali, Lalitpur
				</Skeleton>
			</VStack>
			<Skeleton>98765432</Skeleton>
		</HStack>
	</Box>
);
