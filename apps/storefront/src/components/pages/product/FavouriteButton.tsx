import { Icon, IconButton, IconButtonProps, LightMode } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import {
	useAddToFavouriteMutation,
	useFavouritesQuery,
	useRemoveFromFavouriteMutation,
} from "generated-graphql";

interface FavouriteButtonProps extends IconButtonProps {
	productId: number;
}

const FavouriteButton = ({ productId, ...props }: FavouriteButtonProps) => {
	const { data, loading, error } = useFavouritesQuery();
	const [addToFavouriteMutation] = useAddToFavouriteMutation({
		refetchQueries: ["Favourites"],
	});
	const [removeFromFavouriteMutation] = useRemoveFromFavouriteMutation({
		refetchQueries: ["Favourites"],
	});
	if (loading || error) return null;

	const isFavourite = data?.favourites
		?.map((fav) => fav.productId)
		.includes(productId);

	return (
		<LightMode>
			<IconButton
				isRound
				bg="white"
				color="gray.900"
				size="sm"
				// TODO: Fix hover scale while favouriting
				// _hover={{ transform: "scale(1.1)" }}
				// sx={{ ":hover > svg": { transform: "scale(1.1)" } }}
				// transition="all 0.15s ease"
				icon={
					<Icon
						transform={
							isFavourite
								? "scale(1.1) rotate(360deg)"
								: "scale(1.1) rotate(0deg)"
						}
						fontSize="lg"
						as={FiHeart}
						transition="all 0.25s ease"
						color={isFavourite ? "red.500" : "gray.500"}
						fill={isFavourite ? "red" : "none"}
					/>
				}
				boxShadow="base"
				{...props}
				onClick={() => {
					if (isFavourite) {
						removeFromFavouriteMutation({
							variables: {
								productId,
							},
						});
						return;
					}
					addToFavouriteMutation({
						variables: {
							productId,
						},
					});
				}}
			/>
		</LightMode>
	);
};

export default FavouriteButton;
