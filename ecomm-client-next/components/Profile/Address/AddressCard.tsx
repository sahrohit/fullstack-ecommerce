import { AddressFragmentFragment } from "@generated/graphql";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

interface AddressCardProps {
	address: AddressFragmentFragment;
}

const AddressCard = ({ address }: AddressCardProps) => {
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
					{address.city}, {"Bagmati Pradesh"}, {address.postal_code}
				</p>
				<div className="justify-end card-actions">
					<button className="btn btn-square btn-sm btn-outline flex-grow md:flex-grow-0">
						<FiEdit transform="scale(1.2)" />
					</button>
					<button className="btn btn-square btn-sm btn-outline btn-error flex-grow md:flex-grow-0">
						<AiOutlineDelete transform="scale(1.2)" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddressCard;
