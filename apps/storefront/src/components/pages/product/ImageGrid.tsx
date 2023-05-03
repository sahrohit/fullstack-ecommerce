import { Image, SimpleGrid } from "@chakra-ui/react";

interface ProductImageProps {
	images: {
		id: string;
		alt?: string;
		src: string;
	}[];
}

const ImageGrid = ({ images }: ProductImageProps) => (
	<SimpleGrid gap={2} gridTemplateColumns="repeat(2, 1fr)">
		{images.slice(0, 3).map((image, index) => {
			let gridColumn = "span 1";
			if (index === 0) {
				gridColumn = "span 2";
			}
			return (
				<Image
					key={image.id}
					src={image.src}
					alt={image.alt}
					gridColumn={gridColumn}
					boxSize="full"
					fit="cover"
					bgPos="center"
					borderRadius="lg"
				/>
			);
		})}
	</SimpleGrid>
);

export default ImageGrid;
