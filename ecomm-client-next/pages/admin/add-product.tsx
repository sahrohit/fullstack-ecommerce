import AddProductForm from "@components/Admin/Products/AddProductForm";
import { NextPage } from "next";
import React from "react";

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
