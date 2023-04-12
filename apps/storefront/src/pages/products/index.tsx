import ProductCard from "@/components/pages/product/ProductCard";
import ProductGrid from "@/components/pages/product/ProductGrid";
import FilterLayout from "@/components/pages/product/filter/FilterLayout";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar";
import { products } from "@/data/mock/temp";

const ProductFilterPage = () => (
	<>
		<Navbar />
		<FilterLayout>
			<ProductGrid>
				{[...products, ...products, ...products].map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</ProductGrid>
		</FilterLayout>
		<Footer />
	</>
);

export default ProductFilterPage;
