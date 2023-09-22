import {
	AspectRatio,
	Box,
	Button,
	HStack,
	Heading,
	Link,
	SimpleGrid,
	Skeleton,
	Stack,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import {
	Favourite,
	useFavouritesWithProductQuery,
	useMeQuery,
	useRemoveFromFavouriteMutation,
} from "@/generated/graphql";
import Result from "@/components/shared/Result";
// import dayjs from "dayjs";
import ConfirmationModal from "@/components/helpers/ConfirmationModal";
import withProtected from "@/routes/withProtected";
import HeadingGroup from "@/components/pages/account/HeadingGroup";
import Navbar from "@/components/shared/navbar";
import { PriceTag } from "@/components/shared/product/PriceTag";
import services from "../../../public/assets/services.svg";

const FavouritePage = () => {
	const { data: user, loading: userLoading, error: userError } = useMeQuery();
	const { data, loading, error } = useFavouritesWithProductQuery({
		skip: !user?.me?.id,
	});

	if (error || userError) {
		return (
			<Result
				heading={error ? error.name : userError?.name!}
				type="error"
				text={error ? error.message : userError?.message!}
				dump={error ? error.stack : userError?.stack}
			/>
		);
	}

	return (
		<>
			<Navbar />
			<Box
				maxW="7xl"
				mx="auto"
				px={{ base: "4", md: "8", lg: "12" }}
				py={{ base: "6", md: "8", lg: "12" }}
			>
				<HeadingGroup
					py={4}
					textAlign="center"
					title="Favourites"
					description="Your favourite products"
				/>
				<SimpleGrid
					columns={[1, 1, 1, 2, 2]}
					columnGap={{ base: "4", md: "6" }}
					rowGap={{ base: "8", md: "4" }}
				>
					{/* eslint-disable-next-line no-nested-ternary */}
					{loading || userLoading ? (
						Array(4)
							.fill("favourite-skeleton")
							.map((mock, index) => (
								<FavouriteProductCardSkeleton key={`${mock}-${index + 1}`} />
							))
					) : data?.favouritesWithProduct.length ? (
						data?.favouritesWithProduct?.map((favourite) => (
							<FavouriteProductCard
								key={favourite.id}
								favourite={favourite as Favourite}
							/>
						))
					) : (
						<VStack py={8} gap={4} gridColumn="1 / span 2">
							<Image width={300} alt="App screenshot" src={services} />
							<Box textAlign="center">
								<Heading as="h3" fontSize="2xl" lineHeight="2">
									Nothing in Favourites
								</Heading>
								<Text>
									Save you favourite items here, so that you can buy it later.
								</Text>
							</Box>
						</VStack>
					)}
				</SimpleGrid>
			</Box>
		</>
	);
};

export default withProtected(FavouritePage);

const FavouriteProductCard = ({ favourite }: { favourite: Favourite }) => {
	const [removeFromFavouriteMutation, { loading }] =
		useRemoveFromFavouriteMutation({
			refetchQueries: ["FavouritesWithProduct"],
		});
	const {
		name,
		images: unsortedImages,
		inventories,
		identifier,
		desc,
	} = favourite.product;

	const images = [...unsortedImages]?.sort((a, b) => a.sequence - b.sequence);

	return (
		<Stack
			direction={{ base: "column", md: "row" }}
			justify="center"
			spacing="12"
			shadow="xs"
			rounded="md"
			p="4"
		>
			<Stack direction="column">
				<Stack
					alignSelf="flex-start"
					justifyContent="space-between"
					w="full"
					direction={{ base: "row", md: "column" }}
				>
					<VStack spacing="1" alignItems="flex-start" alignSelf="flex-start">
						<Text
							fontWeight="medium"
							fontSize="xl"
							color={useColorModeValue("gray.700", "gray.400")}
						>
							{name}
						</Text>
						<Text>
							{/* Starting from{" "} */}
							<PriceTag
								price={inventories?.[0]?.price || 0}
								// salePrice={salePrice}
								currency="NPR"
								rootProps={{
									display: "inline-flex",
								}}
							/>
						</Text>
					</VStack>
					{/* <Stack
						alignSelf="flex-start"
						direction={{ base: "column", md: "row" }}
					>
						<Rating defaultValue={2} size="sm" />
						<Text
							fontSize="sm"
							color={useColorModeValue("gray.600", "gray.400")}
						>
							12 Reviews
						</Text>
					</Stack> */}
					<Box display={{ base: "none", lg: "block" }}>
						<Text maxW="xs" noOfLines={2}>
							{desc}
						</Text>
					</Box>
				</Stack>
				<HStack gap={2} w={{ base: "full", md: "unset" }}>
					<Button
						as={Link}
						flexGrow={1}
						href={`/products/${identifier}`}
						_hover={{
							textDecoration: "none",
						}}
						colorScheme="primary"
					>
						View Product
					</Button>
					<ConfirmationModal
						isLoading={loading}
						headerText="Remove from Favourites"
						bodyText={`Are you sure you want to remove ${favourite.product.name} from your favourites?`}
						onSuccess={() => {
							removeFromFavouriteMutation({
								variables: {
									productId: favourite.productId,
								},
							});
						}}
						color="red"
						variant="outline"
						colorScheme="red"
					>
						Remove
					</ConfirmationModal>
				</HStack>
			</Stack>{" "}
			<AspectRatio
				ratio={6 / 5}
				as={Link}
				href={`/products/${identifier}`}
				w={{ base: "full", md: "180px" }}
				flexGrow="1"
			>
				<Image
					src={images?.[0]?.imageURL ?? "https://picsum.photos/200/300"}
					alt={name}
					width={400}
					height={500}
					draggable="false"
				/>
			</AspectRatio>
		</Stack>
	);
};

const FavouriteProductCardSkeleton = () => (
	<Stack
		direction={{ base: "column", md: "row" }}
		justify="center"
		spacing="12"
		shadow="md"
		rounded="md"
		p="4"
	>
		<Stack direction="column" w="full">
			<Stack
				alignSelf="flex-start"
				justifyContent="space-between"
				w="full"
				direction={{ base: "row", md: "column" }}
			>
				<VStack spacing="1" alignItems="flex-start" alignSelf="flex-start">
					<Skeleton>
						<Text fontWeight="medium" fontSize="xl">
							Hello Hello Hello Hello
						</Text>
					</Skeleton>
					<Skeleton>
						<Text>Hello Hello</Text>
					</Skeleton>
				</VStack>

				<Box display={{ base: "none", lg: "block" }}>
					<Skeleton>
						<Text maxW="xs" noOfLines={2}>
							Hello
						</Text>
					</Skeleton>
				</Box>
			</Stack>
			<VStack justifyContent="space-around" h="100%">
				<Skeleton w="full">Hello</Skeleton>
				<VStack gap={2} w="full">
					<HStack w="full">
						<Skeleton flexGrow={1}>Hello</Skeleton>
						<Skeleton flexGrow={1}>Hello</Skeleton>
					</HStack>
				</VStack>
			</VStack>
		</Stack>{" "}
		<AspectRatio ratio={6 / 5} w={{ base: "full", md: "180px" }}>
			<Skeleton>Hello</Skeleton>
		</AspectRatio>
	</Stack>
);
