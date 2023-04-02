import { AddressFragmentFragment } from "@generated/graphql";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import AddressForm from "./AddressForm";

interface UpdateAddressProps {
	address: AddressFragmentFragment;
}

const UpdateAddress = ({ address }: UpdateAddressProps) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	return (
		<>
			<label
				htmlFor={`update-address-modal-${address.id}`}
				className="btn modal-button btn-square btn-sm btn-outline flex-grow md:flex-grow-0"
			>
				<FiEdit transform="scale(1.2)" />
			</label>

			<input
				type="checkbox"
				id={`update-address-modal-${address.id}`}
				className="modal-toggle"
				checked={modalOpen}
				onChange={(e) => setModalOpen(e.target.checked)}
			/>
			<div className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<label
						htmlFor={`update-address-modal-${address.id}`}
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						X
					</label>
					<h3 className="text-lg font-bold">Update Address</h3>
					<AddressForm currentValues={address} setModalOpen={setModalOpen} />
				</div>
			</div>
		</>
	);
};

export default UpdateAddress;
