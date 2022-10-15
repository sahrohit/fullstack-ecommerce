import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import Alert from "@components/ui/Alert";
import ConfirmationModal from "@components/ui/ConfirmationModal";
import { useCategoriesSummaryQuery } from "@generated/graphql";
import Image from "next/image";
import { AiOutlineDelete, AiOutlineMenu } from "react-icons/ai";

const AdminCategoryPage = () => {
	const { data, loading, error } = useCategoriesSummaryQuery();

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	if (error) {
		return (
			<Alert
				message="An Error Occured"
				title="Couldn't load Current User"
				status="error"
			/>
		);
	}

	return (
		<div className="overflow-x-auto w-full py-4 sm:px-4">
			<table className="table w-full">
				<thead>
					<tr>
						<th className="text-lg">Name</th>
						<th className="text-lg"></th>
						<th className="text-lg">Products</th>
						<th className="text-lg">Description</th>
					</tr>
				</thead>
				<tbody>
					{data?.categoriesSummary?.map((category) => (
						<CategoryCard
							key={category.id}
							id={category.id}
							name={category.name}
							identifer={category.identifier}
							product_count={category.product_count}
							desc={category.desc}
						/>
					))}
				</tbody>
				<tfoot>
					<tr>
						<th className="text-lg">Name</th>
						<th className="text-lg"></th>
						<th className="text-lg">Products</th>
						<th className="text-lg">Description</th>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default AdminCategoryPage;

interface CatergoryCardProps {
	id: string | number;
	name: string;
	identifer: string;
	product_count: number;
	desc: string;
}

const CategoryCard = ({
	id,
	name,
	identifer,
	product_count,
	desc,
}: CatergoryCardProps) => {
	return (
		<tr>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<Image
								height={48}
								width={48}
								src="https://images.unsplash.com/photo-1615744455875-7ad33653e8c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
								alt="Avatar Tailwind CSS Component"
							/>
						</div>
					</div>
					<div>
						<div className="font-bold">{name}</div>
						<div className="text-sm opacity-50">/{identifer}</div>
					</div>
				</div>
			</td>

			<th>
				<div className="flex flex-row gap-4">
					<ConfirmationModal
						needTypeConfirmation={product_count > 0}
						id={`delete-category-${id}`}
						className="btn-square btn-sm btn-outline btn-error flex-grow md:flex-grow-0"
						heading={`Delete Category: ${name} ?`}
						description={
							<p className="py-4">
								This category is associated with{" "}
								<strong>{product_count}</strong> product
								{product_count > 1 && "s"}. <br />
								All the PRODUCTS will also be deleted.
							</p>
						}
						onConfirm={() => {
							console.log(`Delete Category ${id}`);
						}}
					>
						<AiOutlineDelete transform="scale(1.2)" />
					</ConfirmationModal>
					<label
						htmlFor={`category-details-${id}`}
						className="btn btn-square btn-outline btn-sm"
					>
						<AiOutlineMenu transform="scale(1.2)" />
					</label>
					<input
						type="checkbox"
						id={`category-details-${id}`}
						className="modal-toggle"
					/>
					<label
						htmlFor={`category-details-${id}`}
						className="modal modal-bottom sm:modal-middle"
					>
						<div className="modal-box whitespace-normal">
							<label
								htmlFor={`category-details-${id}`}
								className="btn btn-sm btn-circle absolute right-2 top-2"
							>
								✕
							</label>
							<h3 className="font-bold text-lg">{name}</h3>
							<p className="py-4">{desc}</p>
						</div>
					</label>
				</div>
			</th>
			<td>
				<strong className="text-lg">{product_count}</strong>
			</td>

			<td>
				{desc}
				<br />
				<span className="badge badge-ghost badge-sm">
					Desktop Support Technician
				</span>
			</td>
		</tr>
	);
};
