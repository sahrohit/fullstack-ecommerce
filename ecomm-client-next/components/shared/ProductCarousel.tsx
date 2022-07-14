import { ProductImageResponse } from "@generated/graphql";
import Image from "next/image";
import { LoadingSpinner } from "./LoadingSpinner";

interface ProductCarouselProps {
	images: ProductImageResponse[];
}

const ProductCarousel = ({ images }: ProductCarouselProps) => {
	return (
		<>
			<div className="carousel w-full m-4 rounded-md">
				{images.map((image) => (
					<div
						key={`${image.image_id}`}
						id={`product-image-${image.image_id}`}
						className="carousel-item w-full"
						style={{
							backgroundImage: `url(${image.imageURL})`,
							height: "400px",
							objectFit: "cover",
							objectPosition: "center",
						}}
					>
						{/* <Image
							src={image.imageURL}
							// className="w-full"
							alt="Product Image"
							width="100%"
							height="100%"
							objectFit="cover"
						/> */}
					</div>
				))}
			</div>
			<div className="flex justify-center w-full py-2 gap-2">
				{images.map((image) => (
					<a
						key={image.image_id}
						href={`#product-image-${image.image_id}`}
						className="rounded-md object-scale-down h-24 w-24"
						style={{
							backgroundImage: `url(${image.imageURL})`,
							objectFit: "cover",
						}}
					></a>
				))}
			</div>
		</>
	);
};

export default ProductCarousel;
