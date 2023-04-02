/* eslint-disable no-mixed-spaces-and-tabs */
import { ProductResponse } from "@generated/graphql";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
	name,
	images,
	variants,
	identifier,
	category_name,
}: ProductResponse) => {
	// const [imageURL, setImageURL] = useState(images[0].imageURL);

	return (
		<Link href={`/products/${identifier}`}>
			<div
				className="m-6 rounded-md flex flex-col shadow-s"
				// onMouseEnter={() =>
				// 	setImageURL(
				// 		images.length <= 1
				// 			? images[0].imageURL
				// 			: images.filter((image) => image.imageURL != imageURL)[
				// 					Math.floor(Math.random() * (images.length - 1))
				// 			  ].imageURL
				// 	)
				// }
			>
				<Image
					className="rounded-md"
					src={images[0].imageURL}
					alt={name}
					height="500"
					width="500"
				/>
				<div className="p-4 flex flex-col justify-between space-y-1 flex-grow rounded-md rounded-t-none text-center">
					<p className="text-sm text-slate-500">{category_name}</p>
					<h2 className="font-bold text-xl">{name}</h2>
					<p className="">Rs {variants[0].price}</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
