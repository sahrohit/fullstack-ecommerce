/* eslint-disable no-mixed-spaces-and-tabs */
import { ProductResponse } from "@generated/graphql";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductCard = ({
	name,
	desc,
	images,
	variants,
	identifier,
}: ProductResponse) => {
	const [imageURL, setImageURL] = useState(images[0].imageURL);

	return (
		<Link href={`/products/${identifier}`}>
			<div
				className="m-6 rounded-md flex flex-col shadow-s"
				onMouseEnter={() =>
					setImageURL(
						images.length <= 1
							? images[0].imageURL
							: images.filter((image) => image.imageURL != imageURL)[
									Math.floor(Math.random() * (images.length - 1))
							  ].imageURL
					)
				}
			>
				<Image
					className="rounded-t-md"
					src={imageURL}
					alt={name}
					height="600"
					width="600"
				/>
				<div className="p-4 flex flex-col justify-between space-y-4 flex-grow border-2 border-gray-300 border-t-0 rounded-md rounded-t-none">
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
		</Link>
	);
};

export default ProductCard;
