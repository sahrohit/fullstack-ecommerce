import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import Alert from "@components/ui/Alert";
import { encodeURL } from "@components/utils/encodeURL";
import { useCategoriesQuery } from "@generated/graphql";
import React from "react";

const AdminCategoryPage = () => {
	const { data, loading, error } = useCategoriesQuery();

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
		// <div>
		// 	{data?.categories.map((category) => (
		// 		<CategoryCard key={category.id} id={category.id} name={category.name} />
		// 	))}
		// </div>
		<div className="overflow-x-auto w-full p-4">
			<table className="table w-full">
				<thead>
					<tr>
						<th>
							<label>
								<input type="checkbox" className="checkbox" />
							</label>
						</th>
						<th>Name</th>
						<th>Job</th>
						<th>Favorite Color</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{data?.categories.map((category) => (
						<CategoryCard
							key={category.id}
							id={category.id}
							name={category.name}
						/>
					))}
				</tbody>
				<tfoot>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Job</th>
						<th>Favorite Color</th>
						<th></th>
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
}

const CategoryCard = ({ id, name }: CatergoryCardProps) => {
	return (
		// <div>
		// 	{/* {name} {"===========>"} {encodeURL(name)} */}
		// 	UPDATE product_category SET identifier = (&apos;{encodeURL(name)}
		// 	&apos;) WHERE id = {id};
		// </div>

		<tr>
			<th>
				<label>
					<input type="checkbox" className="checkbox" />
				</label>
			</th>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<img
								src="/tailwind-css-component-profile-2@56w.png"
								alt="Avatar Tailwind CSS Component"
							/>
						</div>
					</div>
					<div>
						<div className="font-bold">{name}</div>
						<div className="text-sm opacity-50">United States</div>
					</div>
				</div>
			</td>
			<td>
				Zemlak, Daniel and Leannon
				<br />
				<span className="badge badge-ghost badge-sm">
					Desktop Support Technician
				</span>
			</td>
			<td>Purple</td>
			<th>
				<button className="btn btn-ghost btn-xs">details</button>
				<button className="btn btn-ghost btn-xs">Edit</button>
			</th>
		</tr>
	);
};
