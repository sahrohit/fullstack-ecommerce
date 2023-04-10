import FilterLayout from "@/components/pages/product/filter/FilterLayout";
import { Navbar } from "@/components/shared/navbar";
import { Heading } from "@chakra-ui/react";
import React from "react";

const ProductFilterPage = () => {
	return (
		<>
			<Navbar />
			<FilterLayout>
				<Heading>This is where filtered contents</Heading>
			</FilterLayout>
		</>
	);
};

export default ProductFilterPage;
