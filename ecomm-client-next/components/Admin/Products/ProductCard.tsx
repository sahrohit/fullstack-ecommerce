import { ProductResponse } from "@generated/graphql";
import Image from "next/image";
import React from "react";

const ProductCard = ({ name, desc, images, variants }: ProductResponse) => {
	return (
		<div className="m-6 rounded-md flex flex-col shadow-s">
			<Image
				className="rounded-t-md"
				src={images[0].imageURL}
				alt={name}
				height="360"
				width="360"
			/>
			<div className="p-4 flex flex-col justify-between space-y-6 flex-grow border-2 border-gray-300 border-t-0 rounded-md rounded-t-none">
				<div>
					<h2 className="font-bold">{name}</h2>
					<p className="text-sm">{desc}</p>
				</div>

				<div>
					<em>{variants.length} Variants</em>
					<p className="text-md font-bold">Rs {variants[0].price}</p>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
