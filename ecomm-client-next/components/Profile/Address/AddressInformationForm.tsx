import { useAddressQuery } from "@generated/graphql";
import { useState } from "react";
import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";

const AddressInformationForm = () => {
	const { data } = useAddressQuery();
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	return (
		<>
			<div className="flex flex-col space-y-4">
				{data?.addresses?.map((address) => (
					<AddressCard key={address.id} address={address} />
				))}
			</div>
			<div className="w-full flex justify-center my-4">
				<label
					htmlFor="create-new-address-modal"
					className="btn btn-secondary btn-sm btn-wide"
				>
					Add Address
				</label>

				<input
					type="checkbox"
					id="create-new-address-modal"
					className="modal-toggle"
					checked={modalOpen}
					onChange={(e) => setModalOpen(e.target.checked)}
				/>
				<label
					htmlFor="create-new-address-modal"
					className="modal modal-bottom sm:modal-middle cursor-pointer"
				>
					<label className="modal-box relative" htmlFor="">
						<label
							htmlFor="create-new-address-modal"
							className="btn btn-sm btn-circle absolute right-2 top-2"
						>
							✕
						</label>
						<h3 className="text-lg font-bold">Add New Address</h3>
						<AddressForm setModalOpen={setModalOpen} />
					</label>
				</label>
			</div>
		</>
	);
};

export default AddressInformationForm;
