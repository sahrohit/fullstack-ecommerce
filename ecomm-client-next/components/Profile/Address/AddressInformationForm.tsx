import { useAddressQuery } from "@generated/graphql";
import React from "react";
import AddressCard from "./AddressCard";

const AddressInformationForm = () => {
	const { data } = useAddressQuery();

	return (
		<>
			<div className="flex flex-col space-y-4">
				{data?.addresses?.map((address) => (
					<AddressCard key={address.id} address={address} />
				))}
			</div>
			<div className="w-full flex justify-center my-4">
				<button className="btn btn-secondary btn-sm btn-wide">
					Add Address
				</button>
			</div>
			<p className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</p>
		</>
	);
};

export default AddressInformationForm;
