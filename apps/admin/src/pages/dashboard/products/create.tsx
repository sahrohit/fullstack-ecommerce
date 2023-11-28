import { VStack } from "@chakra-ui/react";
import { HeadingGroup } from "ui";
import ProductForm from "@/components/pages/products/ProductForm";

const CreateProduct = () => (
	<VStack gap={4} w="full">
		<HeadingGroup
			title="Manage Products"
			description="Update your Products Here."
		/>
		<ProductForm />
	</VStack>
);

export default CreateProduct;
