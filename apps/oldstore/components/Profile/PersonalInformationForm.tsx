/* eslint-disable @next/next/no-img-element */
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import InputField from "@components/ui/InputField";
import UploadFile from "@components/ui/UploadFile";
import {
	useMeQuery,
	useResendVerificationEmailMutation,
} from "@generated/graphql";
import { Form, Formik } from "formik";
import Image from "next/image";
import toast from "react-hot-toast";
import { BsCheck } from "react-icons/bs";

const PersonalInformationForm = () => {
	const { data, loading } = useMeQuery({ fetchPolicy: "cache-first" });
	const [resendVerificationEmail] = useResendVerificationEmailMutation();

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	return (
		<Formik
			initialValues={{
				email: data?.me?.email,
				first_name: data?.me?.first_name,
				last_name: data?.me?.last_name,
				phone_number: data?.me?.phone_number || "",
			}}
			onSubmit={async () => {
				toast.error("Profile Updation has not been implemented yet.");
			}}
		>
			{({ isSubmitting, dirty }) => (
				<Form>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col md:flex-row w-full justify-between grow gap-4">
							<InputField
								name="first_name"
								label="First Name"
								placeholder="First Name"
								type="text"
								autoComplete="firstname"
							/>
							<InputField
								name="last_name"
								label="Last Name"
								placeholder="Last Name"
								type="text"
								autoComplete="family-name"
							/>
						</div>
						<div className="w-full md:w-3/4 flex flex-row flex-nowrap space-x-2">
							<InputField
								name="email"
								label="Email"
								placeholder="Email"
								type="text"
								autoComplete="username"
							/>
							{data?.me?.email_verified ? (
								<div className="self-end tooltip" data-tip="Verified">
									<BsCheck className="text-5xl text-green-500" />
								</div>
							) : (
								<button
									type="button"
									className="btn btn-link self-end"
									onClick={async () => {
										if (data?.me?.email) {
											toast.promise(
												resendVerificationEmail({
													variables: {
														email: data?.me?.email,
													},
												}),
												{
													loading: "Sending Email",
													success: "Verification Email Sent",
													error: "Something went wrong!",
												}
											);
										}
									}}
								>
									Verify
								</button>
							)}
						</div>
						<div className="w-full md:w-3/4 flex flex-row flex-nowrap space-x-2">
							<InputField
								name="phone_number"
								label="Phone Number"
								placeholder="Phone Number"
								type="text"
								autoComplete="tel-national"
							/>
							{data?.me?.phone_number_verified ? (
								<div className="self-end tooltip" data-tip="Verified">
									<BsCheck className="text-5xl text-green-500" />
								</div>
							) : (
								<button
									type="button"
									className="btn btn-link self-end"
									onClick={() => {
										toast.error(
											"Mobile number verification is not yet implemented."
										);
									}}
								>
									Verify
								</button>
							)}
						</div>

						<p>Photo</p>
						<div className="w-full md:w-3/4 flex flex-row flex-nowrap space-x-6 items-center">
							<div className="avatar">
								<div className="w-24 rounded-full">
									<Image
										alt={data?.me?.first_name ?? "Profile Picture"}
										src={
											data?.me?.imageUrl ??
											"https://placeimg.com/192/192/people"
										}
										height={96}
										width={96}
									/>
								</div>
							</div>

							<UploadFile
								id={`upload-photo-modal`}
								button={
									<label
										htmlFor={`upload-photo-modal`}
										className="btn btn-sm btn-outline"
									>
										{data?.me?.imageUrl ? "Change Photo" : "Upload Photo"}
									</label>
								}
							/>
						</div>

						{data?.me?.created_at && (
							<p className="">
								Your account is{" "}
								<strong>
									{" "}
									{Math.floor(
										(new Date().getTime() - parseInt(data?.me?.created_at)) /
											86400000
									)}{" "}
								</strong>
								days old.
							</p>
						)}

						<div className="ml-auto">
							<button
								className={`btn btn-secondary btn-sm gap-2 rounded-md ${
									isSubmitting && "loading"
								} ${!dirty && "btn-disabled"}`}
								type="submit"
							>
								{isSubmitting ? "Loading" : "Save"}
							</button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default PersonalInformationForm;
