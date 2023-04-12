import AddProductForm from "@components/Admin/Products/AddProductForm";
import { NextPage } from "next";

const AddProduct: NextPage = () => {
	return (
		<div>
			<h1 className="text-2xl text-center">Add Product</h1>
			<div className="mx-8">
				<AddProductForm />
			</div>
		</div>
	);
};

export default AddProduct;
