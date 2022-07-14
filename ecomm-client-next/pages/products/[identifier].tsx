import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import ProductCarousel from "@components/shared/ProductCarousel";
import { useProductQuery } from "@generated/graphql";
import { useRouter } from "next/router";
import React from "react";

const ProductPage = () => {
	const router = useRouter();
	const { identifier } = router.query;

	const { data, loading, error } = useProductQuery({
		variables: {
			identifier: identifier as string,
		},
	});

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	return (
		<div className="flex">
			<div className="basis-2/5">
				{data?.product?.images && (
					<ProductCarousel images={data?.product?.images} />
				)}
			</div>
			<div className="basis-3/5"></div>
		</div>
	);
};

export default ProductPage;
