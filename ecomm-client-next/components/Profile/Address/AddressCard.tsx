import ConfirmationModal from "@components/ui/ConfirmationModal";
import {
	AddressFragmentFragment,
	useDeleteAddressMutation
} from "@generated/graphql";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import UpdateAddress from "./UpdateAddress";

interface AddressCardProps {
	address: AddressFragmentFragment;
}

const AddressCard = ({ address }: AddressCardProps) => {
	const [deleteAddressMutation] = useDeleteAddressMutation();

	return (
		<div className="card card-bordered ">
			<div className="card-body p-4">
				<h2 className="card-title">
					{address.nickname}
					<div className="badge mx-2 badge-secondary badge-outline badge-lg">
						{address.phone_number}
					</div>
				</h2>
				<p>
					{address.address_line1}, {address.address_line2}
				</p>
				<p>
					{address.city}, {address.state}, {address.postal_code}
				</p>
				<div className="justify-end card-actions">
					<UpdateAddress address={address} />

					<ConfirmationModal
						id={`delete-address-${address.id}`}
						className="btn-square btn-sm btn-outline btn-error flex-grow md:flex-grow-0"
						heading="Are you sure you want to delete ?"
						description={
							<p className="py-4">
								The address with nickname <strong>{address.nickname}</strong>{" "}
								will be deleted. <br />
								This action cannot be undone
							</p>
						}
						onConfirm={() => {
							toast.promise(
								deleteAddressMutation({
									variables: {
										deleteAddressId: address.id,
									},
									update: (cache) => cache.evict({ fieldName: "addresses" }),
								}),
								{
									loading: "Deleting Address ...",
									success: () => {
										return "Address Deleted Successfully!";
									},
									error: "Something went wrong!",
								}
							);
						}}
					>
						<AiOutlineDelete transform="scale(1.2)" />
					</ConfirmationModal>
				</div>
			</div>
		</div>
	);
};

export default AddressCard;
