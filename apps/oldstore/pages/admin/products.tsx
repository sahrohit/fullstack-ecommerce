import ProductCard from "@components/Admin/Products/AdminProductCard";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import Alert from "@components/ui/Alert";
import { withAdminProtected } from "@components/utils/routes";
import { useProductsQuery } from "@generated/graphql";
import { NextPage } from "next";

const AdminProducts: NextPage = () => {
	const { data, loading, error } = useProductsQuery();

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
		<div className="flex flex-col sm:flex-row">
			<div className="basis-1/4 text-center">Options</div>
			<div className="basis-3/4 justify-evenly grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
				{data?.products?.map((product) => (
					<ProductCard {...product} key={product.id} />
				))}
			</div>
		</div>
	);
};

export default withAdminProtected(AdminProducts);
