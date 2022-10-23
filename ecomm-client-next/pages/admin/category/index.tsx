import {
	default as CategoryForm,
	default as UpdateCategoryForm,
} from "@components/Admin/Category/CategoryForm";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import Alert from "@components/ui/Alert";
import ConfirmationModal from "@components/ui/ConfirmationModal";
import PageHeading from "@components/ui/PageHeading";
import {
	useCategoriesSummaryQuery,
	useDeleteCategoryMutation,
} from "@generated/graphql";
import Image from "next/image";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

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
		<>
			<div className="flex flex-row justify-between align-middle py-2 mx-4 sticky top-0 z-10 bg-base-100">
				<PageHeading text="Categories" />

				<label htmlFor={`add-category-modal`} className="btn btn-secondary">
					Create Category
				</label>
				<input
					type="checkbox"
					id={`add-category-modal`}
					className="modal-toggle"
				/>
				<label
					htmlFor={`add-category-modal`}
					className="modal modal-bottom sm:modal-middle"
				>
					<div className="modal-box whitespace-normal">
						<label
							htmlFor={`add-category-modal`}
							className="btn btn-sm btn-circle absolute right-2 top-2"
						>
							✕
						</label>
						<h3 className="font-bold text-lg">Add Category</h3>
						<UpdateCategoryForm />
					</div>
				</label>
			</div>
			<div className="overflow-x-auto w-full py-4 sm:px-4">
				<table className="table w-full">
					<thead>
						<tr>
							<th className="text-lg !static">Name</th>
							<th className="text-lg">Products</th>
							<th className="text-lg">Description</th>
							<th className="text-lg"></th>
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
							<th className="text-lg !static">Name</th>
							<th className="text-lg">Products</th>
							<th className="text-lg">Description</th>
							<th className="text-lg"></th>
						</tr>
					</tfoot>
				</table>
			</div>
		</>
	);
};

export default AdminCategoryPage;

interface CatergoryCardProps {
	id: number;
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
	const [deleteCategory] = useDeleteCategoryMutation();

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
							toast.promise(
								deleteCategory({
									variables: {
										deleteCategoryId: id,
									},
									update: (cache) =>
										cache.evict({ fieldName: "categoriesSummary" }),
								}),
								{
									loading: "Adding Product...",
									success: "Product Added Successfully",
									error: (error) => error.message,
								}
							);
						}}
					>
						<AiOutlineDelete transform="scale(1.2)" />
					</ConfirmationModal>
					<label
						htmlFor={`category-details-${id}`}
						className="btn btn-square btn-outline btn-sm"
					>
						<AiOutlineEdit transform="scale(1.2)" />
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
							<h3 className="font-bold text-lg">Edit {name}</h3>
							<CategoryForm
								categoryId={id}
								name={name}
								desc={desc}
								identifier={identifer}
							/>
						</div>
					</label>
				</div>
			</th>
		</tr>
	);
};
