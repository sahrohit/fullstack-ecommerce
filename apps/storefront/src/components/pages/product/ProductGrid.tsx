import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";
import { Children, isValidElement, useMemo } from "react";

const ProductGrid = (props: SimpleGridProps) => {
	const { children, ...rest } = props;

	const columns = useMemo(() => {
		const count = Children.toArray(children).filter(isValidElement).length;
		return {
			base: Math.min(1, count),
			sm: Math.min(1, count),
			md: Math.min(1, count),
			lg: Math.min(3, count),
			xl: Math.min(4, count),
		};
	}, [children]);

	return (
		<SimpleGrid
			columns={columns}
			columnGap={{ base: "4", md: "6" }}
			rowGap={{ base: "8", md: "10" }}
			{...rest}
		>
			{children}
		</SimpleGrid>
	);
};

export default ProductGrid;
