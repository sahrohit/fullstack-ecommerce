import { Button, Card, HStack, Stack, Text, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
import {
	useAddAddressMutation,
	useUpdateAddressMutation,
} from "@/generated/graphql";
import InputField from "@/components/ui/InputField";
import { ToggleButtonGroup, ToggleButton } from "@/components/ui/ToggleButton";

type AddressFormValues = {
	name: string;
	type: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	phone_number: string;
};

const AddressFormSchema = Yup.object({
	name: Yup.string().required("Required"),
	type: Yup.string().required("Required").oneOf(["work", "home"]),
	address: Yup.string().required("Required"),
	city: Yup.string().required("Required"),
	state: Yup.string().required("Required"),
	zip: Yup.string().required("Required").min(4, "Too Short").max(6, "Too Long"),
	country: Yup.string().required("Required"),
	phone_number: Yup.string().matches(
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
		"Phone number is not valid"
	),
});

const emptyAddressFormValues: AddressFormValues = {
	name: "",
	type: "home",
	address: "",
	city: "",
	state: "",
	zip: "",
	country: "",
	phone_number: "",
};

interface AddressFormProps {
	id?: number;
	defaultValues?: AddressFormValues;
	onSubmissionSuccess?: () => void;
}

const AddressForm = ({
	id,
	defaultValues,
	onSubmissionSuccess: closeModal,
}: AddressFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
		setValue,
		reset,
	} = useForm<AddressFormValues>({
		defaultValues: defaultValues ?? emptyAddressFormValues,
		resolver: yupResolver(AddressFormSchema),
	});
	const toast = useToast();
	const [autoFillLoading, setAutoFillLoading] = useState(false);
	const [addAddressMutation, { loading: addLoading }] = useAddAddressMutation({
		refetchQueries: ["Addresses"],
	});
	const [updateAddressMutation, { loading: updateLoading }] =
		useUpdateAddressMutation({
			refetchQueries: ["Addresses"],
		});

	return (
		<form
			onSubmit={handleSubmit((values) => {
				if (id && defaultValues) {
					updateAddressMutation({
						variables: {
							updateAddressId: id,
							input: {
								address: values.address,
								city: values.city,
								country: values.country,
								name: values.name,
								phone_number: values.phone_number,
								state: values.state,
								type: values.type,
								zip: values.zip,
							},
						},
					});
				} else {
					addAddressMutation({
						variables: {
							input: values,
						},
					});
				}
				reset();

				if (closeModal) {
					closeModal();
				}
			})}
		>
			<Stack spacing="4">
				<HStack
					as={Card}
					p={2}
					justifyContent="space-around"
					bgGradient="linear(to-r, teal.500, green.500)"
				>
					<Text fontWeight="semibold">
						Save time. Autofill your current location.
					</Text>
					<Button
						isLoading={autoFillLoading}
						type="button"
						variant="solid"
						onClick={async () => {
							setAutoFillLoading(true);
							if (navigator?.geolocation) {
								navigator.geolocation.getCurrentPosition(
									async (location) => {
										if (location) {
											const data = await getLocationInformation(
												location.coords.latitude,
												location.coords.longitude
											);
											setValue(
												"address",
												`${
													data.address?.neighbourhood || data.address?.suburb
												} ${data.address?.municipality}`
											);
											setValue(
												"city",
												data.address?.city ||
													data.address?.county ||
													data.address?.municipality ||
													data.address?.town ||
													data.address?.village
											);
											setValue("zip", data.address.postcode);
											setValue(
												"state",
												data.address?.state ||
													data.address?.state_district ||
													data.address?.region
											);
											setValue("country", data.address?.country);
											setAutoFillLoading(false);
										}
									},
									(error) => {
										toast({
											title: "An Error Occured",
											description: error.message,
											status: "error",
											duration: 3000,
											isClosable: true,
										});
										setAutoFillLoading(false);
									}
								);
							}
						}}
					>
						Autofill
					</Button>
				</HStack>
				<HStack alignItems="flex-end">
					<InputField
						register={{ ...register("name") }}
						error={errors.name}
						touched={touchedFields.name}
						type="text"
						name="name"
						size="lg"
						autoComplete="name"
						label="Name"
						placeholder=""
					/>
					<ToggleButtonGroup<"home" | "work">
						name={register("type").name}
						onChange={(value) => setValue("type", value)}
						size="lg"
						defaultValue={defaultValues?.type ?? "home"}
						isAttached
						variant="outline"
						aria-label="Set Home or Work"
					>
						<ToggleButton
							value="home"
							aria-label="Home"
							icon={<AiOutlineHome />}
						/>
						<ToggleButton
							value="work"
							aria-label="Work"
							icon={<MdWorkOutline />}
						/>
					</ToggleButtonGroup>
				</HStack>
				<InputField
					register={{ ...register("phone_number") }}
					error={errors.phone_number}
					touched={touchedFields.phone_number}
					name="phone_number"
					type="numeric"
					size="lg"
					autoComplete="phone"
					label="Phone Number"
					placeholder=""
				/>
				<InputField
					register={{ ...register("address") }}
					error={errors.address}
					touched={touchedFields.address}
					name="address"
					type="text"
					size="lg"
					autoComplete="address"
					label="Address"
					placeholder=""
				/>
				<HStack gap={3}>
					<InputField
						register={{ ...register("city") }}
						error={errors.city}
						touched={touchedFields.city}
						type="text"
						name="city"
						size="lg"
						autoComplete="city"
						label="City"
						placeholder=""
					/>
					<InputField
						register={{ ...register("state") }}
						error={errors.state}
						touched={touchedFields.state}
						name="state"
						type="text"
						size="lg"
						autoComplete="state"
						label="State"
						placeholder=""
					/>
				</HStack>
				<HStack gap={3}>
					<InputField
						register={{ ...register("zip") }}
						error={errors.zip}
						touched={touchedFields.zip}
						type="text"
						name="zip"
						size="lg"
						autoComplete="zip"
						label="Zip Code"
						placeholder=""
					/>
					<InputField
						register={{ ...register("country") }}
						error={errors.country}
						touched={touchedFields.country}
						name="country"
						type="text"
						size="lg"
						autoComplete="country"
						label="Country"
						placeholder=""
					/>
				</HStack>

				<Button
					type="submit"
					colorScheme="blue"
					size="lg"
					fontSize="md"
					isLoading={addLoading || updateLoading}
				>
					{defaultValues ? "Update Address" : "Create Address"}
				</Button>
			</Stack>
		</form>
	);
};

AddressForm.defaultProps = {
	id: null,
	defaultValues: null,
	onSubmissionSuccess: () => {},
};

export default AddressForm;

const getLocationInformation = async (lat: number, lng: number) => {
	const res = await fetch(
		`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
	);
	const data = await res.json();
	return data;
};
