import ProductDescription from "@components/Product/ProductDescription";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import ProductCarousel from "@components/shared/ProductCarousel";
import { useProductQuery } from "@generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ProductPage = () => {
	const router = useRouter();
	const { identifier } = router.query;

	const { data, loading } = useProductQuery({
		variables: {
			identifier: identifier as string,
		},
	});

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	return (
		<div className="flex flex-col md:flex-row">
			<div className="basis-3/5">
				{data?.product?.images && (
					<ProductCarousel images={data?.product?.images} />
				)}
			</div>
			<div className="basis-2/5">
				<div className="breadcrumbs mx-8">
					<ul>
						<li>
							<Link href="/products" passHref>
								Products
							</Link>
						</li>
						<li>
							<a>{data?.product?.category_name}</a>
						</li>
						<li>{data?.product?.name}</li>
					</ul>
				</div>
				{data?.product && <ProductDescription product={data.product} />}
			</div>
		</div>
	);
};

export default ProductPage;
