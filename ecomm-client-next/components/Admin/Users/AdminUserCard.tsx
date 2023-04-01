import { UserDataResponse } from "@generated/graphql";
import Image from "next/image";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

interface AdminUserCardProps {
	user: UserDataResponse;
}

const AdminUserCard = ({ user }: AdminUserCardProps) => {
	return (
		<div className="flex flex-col rounded-md pt-4">
			<div className="flex flex-row justify-between p-4 card card-bordered rounded-b-none">
				<div className="flex flex-col">
					<h1 className="text-2xl font-bold">
						{user.first_name} {user.last_name}
						<span
							className={`badge ${getColorFromRole(
								user.role
							)} align-middle ml-2`}
						>
							{user.role.replaceAll("_", " ")}
						</span>
					</h1>

					<h1 className="text-sm text-gray-500">
						Senior Computer Science Student
					</h1>
				</div>
				<div className="avatar">
					<div className="w-16 rounded-full">
						<Image
							alt={user.first_name}
							src={user.imageUrl ?? "https://placeimg.com/192/192/people"}
							height={64}
							width={64}
						/>
					</div>
				</div>
			</div>
			<div className="btn-group w-full">
				<button className="btn flex-grow rounded-t-none btn-outline outline-none gap-2">
					<AiOutlineMail transform="scale(1.4)" />
					Mail
				</button>
				<button className="btn flex-grow rounded-t-none btn-outline outline-none gap-2">
					<AiOutlinePhone transform="scale(1.4)" />
					Call
				</button>
			</div>
		</div>
	);
};

export default AdminUserCard;

export const getColorFromRole = (role: string) => {
	switch (role) {
		case "ADMIN":
			return "badge-error";
		case "SUPPORT_TEAM":
			return "badge-info";
		case "MERCHANT":
			return "badge-warning";
		case "CUSTOMER":
			return "badge-success";
		default:
			return "";
	}
};
