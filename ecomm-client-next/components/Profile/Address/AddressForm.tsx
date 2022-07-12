/* eslint-disable no-mixed-spaces-and-tabs */
import InputField from "@components/ui/InputField";
import SelectField from "@components/ui/Select";
import {
	AddressFragmentFragment,
	useAddAddressMutation,
	useUpdateAddressMutation,
} from "@generated/graphql";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { __available_countries__, __nepal_states__ } from "../../../constants";
import * as Yup from "yup";

interface AddressFormProps {
	setModalOpen: (value: boolean) => void;
	currentValues?: AddressFragmentFragment;
	idPrefix?: string;
}

const AddressFormSchema = Yup.object().shape({
	nickname: Yup.string().required("Required"),
	address_line1: Yup.string().required("Required"),
	address_line2: Yup.string(),
	state: Yup.string().required("Required"),
	city: Yup.string().required("Required"),
	postal_code: Yup.string().required("Required"),
	country: Yup.string().required("Required"),
	phone_number: Yup.string()
		.min(10, "Invalid Number")
		.max(10, "Invalid Number")
		.required("Required"),
});

const AddressForm = ({ setModalOpen, currentValues }: AddressFormProps) => {
	const [addAddressMutation] = useAddAddressMutation();
	const [updateAddressMutation] = useUpdateAddressMutation();

	return (
		<Formik
			validateOnBlur
			initialValues={
				currentValues
					? {
							nickname: currentValues.nickname,
							address_line1: currentValues.address_line1,
							address_line2: currentValues.address_line2,
							state: currentValues.state,
							city: currentValues.city,
							postal_code: currentValues.postal_code,
							country: currentValues.country,
							phone_number: currentValues.phone_number.replace(
								`${
									__available_countries__.find(
										(country) => country.name == currentValues.country
									)?.country_code
								}`,
								""
							),
					  }
					: {
							nickname: "",
							address_line1: "",
							address_line2: "",
							state: "Bagmati Province",
							city: "",
							postal_code: "",
							country: "Nepal",
							phone_number: "",
					  }
			}
			validationSchema={AddressFormSchema}
			onSubmit={async (values, actions) => {
				if (currentValues) {
					toast.promise(
						updateAddressMutation({
							variables: {
								updateAddressId: currentValues.id,
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
							loading: "Updating Address ...",
							success: () => {
								actions.resetForm();
								setModalOpen(false);
								return "Address Updated Successfully!";
							},
							error: "Something went wrong!",
						}
					);
					return;
				}
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
			{({ isSubmitting, values, dirty }) => (
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
						options={__nepal_states__.map((state) => {
							return { option: state, value: state };
						})}
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
						options={__available_countries__
							.map((country) => country.name)
							.map((state) => {
								return { option: state, value: state };
							})}
						placeholder="Pick your Country"
					/>

					<div className="flex justify-end mt-4 space-x-4">
						<label
							htmlFor={
								!currentValues
									? "create-new-address-modal"
									: `update-address-modal-${currentValues.id}`
							}
							className="btn btn-error btn-outline btn-sm gap-2 rounded-md"
						>
							Cancel
						</label>
						<button
							className={`btn btn-secondary btn-sm gap-2 rounded-md ${
								isSubmitting && "loading"
							} ${currentValues && !dirty && "btn-disabled"}`}
							type="submit"
						>
							{isSubmitting ? "Loading" : currentValues ? "Update" : "Add"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default AddressForm;
