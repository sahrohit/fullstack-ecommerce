import ProductCard from "@/components/pages/product/ProductCard";
import ProductGrid from "@/components/pages/product/ProductGrid";
import FilterLayout from "@/components/pages/product/filter/FilterLayout";
import Footer from "@/components/shared/Footer";
import Result from "@/components/shared/Result";
import Navbar from "@/components/shared/navbar";
import { useProductsQuery } from "@/generated/graphql";

const ProductFilterPage = () => {
	const { data, loading, error } = useProductsQuery();

	if (loading) return <div>Loading...</div>;

	if (error)
		return (
			<Result
				heading={error.name}
				type="error"
				text={error.message}
				dump={error.stack}
			/>
		);

	return (
		<>
			<Navbar />
			<FilterLayout>
				<ProductGrid>
					{data?.products &&
						data.products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</ProductGrid>
			</FilterLayout>
			<Footer />
		</>
	);
};

export default ProductFilterPage;
