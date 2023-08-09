/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	IconButton,
	Spinner,
	Text,
	Box,
	Image,
	HStack,
	VStack,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { Command } from "cmdk";
import { AiOutlineSearch } from "react-icons/ai";
import debounce from "lodash.debounce";
import { Link } from "@chakra-ui/next-js";
import { useSearchProductsLazyQuery } from "@/generated/graphql";

const Search = () => {
	const [value, setValue] = useState("not-found");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [search, { loading, data }] = useSearchProductsLazyQuery();

	const debouncer = useCallback(debounce(search, 400), []);
	return (
		<>
			<IconButton
				onClick={onOpen}
				aria-label="Search"
				variant="link"
				icon={<AiOutlineSearch size="24" />}
			/>

			<Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap size="xl">
				<ModalOverlay />
				<ModalContent w="full">
					<Box className="framer">
						<Command
							value={value}
							onValueChange={(v) => {
								setValue(v);
							}}
							onChange={(e: any) => {
								debouncer({ variables: { query: e.target.value, limit: 5 } });
							}}
						>
							<Box cmdk-framer-header="">
								{loading ? <Spinner size="sm" /> : <AiOutlineSearch />}
								<Command.Input
									autoFocus
									placeholder="Find products, brand, and everything..."
								/>
							</Box>
							<Command.Empty>No results found</Command.Empty>
							<Command.List>
								<HStack w="full" justifyContent="space-between">
									<VStack
										minH={
											data?.searchProducts?.length !== 0 ? "340px" : undefined
										}
										flexGrow={1}
									>
										<Command.Group>
											{data?.searchProducts?.map((product) => (
												<Box
													key={product.identifier}
													onMouseOver={() => {
														setValue(product.name);
													}}
													w="full"
													flexGrow={1}
												>
													<Item
														value={product.name}
														subtitle={product.identifier}
														image={product.images[0].imageURL}
													/>
												</Box>
											))}
										</Command.Group>
									</VStack>
									<Box w="250px">
										{data?.searchProducts?.map((product) => {
											if (product.name !== value) return null;
											return (
												<Image
													borderRadius="lg"
													height="300"
													src={`${product.images[0].imageURL}`}
													alt="product"
												/>
											);
										})}
									</Box>
								</HStack>
							</Command.List>
						</Command>
					</Box>
				</ModalContent>
			</Modal>
		</>
	);
};

const Item = ({
	value,
	subtitle,
	image,
}: {
	value: string;
	subtitle: string;
	image: string;
}) => (
	<Command.Item value={value} onSelect={() => {}}>
		<HStack
			as={Link}
			href={`/products/${subtitle}`}
			_hover={{
				textDecoration: "none",
			}}
			px={4}
		>
			<Image height="12" width="12" src={`${image}`} alt="product" />
			<VStack>
				<Text whiteSpace="nowrap">{value}</Text>
				<Text fontSize="sm" fontWeight="normal">
					{subtitle}
				</Text>
			</VStack>
		</HStack>
	</Command.Item>
);

export default Search;
