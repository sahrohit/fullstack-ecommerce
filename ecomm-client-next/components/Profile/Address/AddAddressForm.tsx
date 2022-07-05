import InputField from "@components/ui/InputField";
import SelectField from "@components/ui/Select";
import { useAddAddressMutation } from "@generated/graphql";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { __available_countries__, __nepal_states__ } from "../../../constants";

interface AddAddressFormProps {
	setModalOpen: (value: boolean) => void;
}

const AddAddressForm = ({ setModalOpen }: AddAddressFormProps) => {
	const [addAddressMutation] = useAddAddressMutation();

	return (
		<Formik
			initialValues={{
				nickname: "",
				address_line1: "",
				address_line2: "",
				state: "Bagmati Province",
				city: "",
				postal_code: "",
				country: "Nepal",
				phone_number: "",
			}}
			onSubmit={async (values, actions) => {
				toast.promise(
					addAddressMutation({
						variables: {
							input: {
								...values,
								phone_number: `${
									__available_countries__.find(
										(country) => country.name == values.country
									)?.country_code
								}${values.phone_number}`,
							},
						},
						update: (cache) => cache.evict({ fieldName: "addresses" }),
					}),
					{
						loading: "Adding Address ...",
						success: () => {
							actions.resetForm();
							setModalOpen(false);
							return "Address Added Successfully!";
						},
						error: "Something went wrong!",
					}
				);
			}}
		>
			{({ isSubmitting, values }) => (
				<Form>
					<div className="flex flex-col md:flex-row w-full justify-between grow gap-x-4">
						<InputField
							name="nickname"
							label="Nickname"
							placeholder="Home, Office, etc."
							type="text"
							autoComplete="nickname"
						/>
						<InputField
							name="phone_number"
							label="Phone Number"
							placeholder="9800000000"
							type="text"
							autoComplete="tel-national"
							leftAddon={
								__available_countries__.find(
									(country) => country.name == values.country
								)?.country_code
							}
						/>
					</div>
					<InputField
						name="address_line1"
						label="Address Line 1"
						placeholder="321 Main Street (street address)"
						type="text"
						autoComplete="addresses"
					/>
					<InputField
						name="address_line2"
						label="Address Line 2"
						placeholder="1234 Apple St. Suite 100"
						type="text"
						autoComplete="addresses"
					/>

					<SelectField
						name="state"
						label="State"
						options={__nepal_states__}
						placeholder="Pick your State"
					/>
					<div className="flex flex-col md:flex-row w-full justify-between grow gap-x-4">
						<InputField
							name="city"
							label="City"
							placeholder="City"
							type="text"
							autoComplete="city"
						/>
						<InputField
							name="postal_code"
							label="Zip Code"
							placeholder="123456"
							type="text"
							autoComplete="family-name"
						/>
					</div>

					<SelectField
						name="country"
						label="Country"
						options={__available_countries__.map((country) => country.name)}
						placeholder="Pick your Country"
					/>

					<div className="flex justify-end mt-4 space-x-4">
						<button
							className={`btn btn-error btn-outline btn-sm gap-2 rounded-md`}
							type="button"
							onClick={() => setModalOpen(false)}
						>
							Cancel
						</button>
						<button
							className={`btn btn-secondary btn-sm gap-2 rounded-md ${
								isSubmitting && "loading"
							}`}
							type="submit"
						>
							{isSubmitting ? "Loading" : "Save"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default AddAddressForm;
