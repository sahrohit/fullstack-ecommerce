import { Button, Card, HStack, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "@/components/ui/InputField";
import { useState } from "react";

type AddressFormValues = {
	name: string;
	type: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	phone: string;
};

const AddressFormSchema = Yup.object({
	name: Yup.string().required("Required"),
	type: Yup.string().required("Required").oneOf(["work", "home"]),
	address: Yup.string().required("Required"),
	city: Yup.string().required("Required"),
	state: Yup.string().required("Required"),
	zip: Yup.string().required("Required").min(4, "Too Short").max(6, "Too Long"),
	country: Yup.string().required("Required"),
	phone: Yup.string().matches(
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
		"Phone number is not valid"
	),
});

const emptyAddressFormValues: AddressFormValues = {
	name: "",
	type: "",
	address: "",
	city: "",
	state: "",
	zip: "",
	country: "",
	phone: "",
};

interface AddressFormProps {
	defaultValues?: AddressFormValues;
}

const AddressForm = ({ defaultValues }: AddressFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
		setValue,
	} = useForm<AddressFormValues>({
		defaultValues: defaultValues ?? emptyAddressFormValues,
		resolver: yupResolver(AddressFormSchema),
	});
	const [autoFillLoading, setAutoFillLoading] = useState(false);

	return (
		<form
			onSubmit={handleSubmit(() => {
				// ? Anonymous fucntion receives data as an argument
				// console.log(data);
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
						variant="solid"
						onClick={() => {
							setAutoFillLoading(true);
							if (navigator?.geolocation) {
								navigator.geolocation.getCurrentPosition(async (location) => {
									if (location) {
										const data = await getLocationInformation(
											location.coords.latitude,
											location.coords.longitude
										);
										setValue("city", data.locality);
										setValue("state", data.principalSubdivision);
										setValue("zip", data.postcode);
										setValue("country", data.countryName);
									}
								});
							}
							setAutoFillLoading(false);
						}}
					>
						Autofill
					</Button>
				</HStack>
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
				<InputField
					register={{ ...register("phone") }}
					error={errors.phone}
					touched={touchedFields.phone}
					name="phone"
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

				<Button type="submit" colorScheme="blue" size="lg" fontSize="md">
					{defaultValues ? "Update Address" : "Create Address"}
				</Button>
			</Stack>
		</form>
	);
};

AddressForm.defaultProps = {
	defaultValues: null,
};

export default AddressForm;

const getLocationInformation = async (lat: number, lng: number) => {
	const res = await fetch(
		`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
	);
	const data = await res.json();
	return data;
};
