/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchProductsLazyQuery } from "@/generated/graphql";
import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	IconButton,
	InputGroup,
	InputRightElement,
	Spinner,
} from "@chakra-ui/react";
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteList,
	AutoCompleteItem,
	AutoCompleteCreatable,
} from "@choc-ui/chakra-autocomplete";
import { useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import debounce from "lodash.debounce";
import { Link } from "@chakra-ui/next-js";

const Search = () => {
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

			<Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
				<ModalOverlay />
				<ModalContent>
					<AutoComplete openOnFocus creatable>
						<InputGroup>
							<AutoCompleteInput
								onChange={(e) =>
									debouncer({
										variables: {
											query: e.target.value,
											limit: 5,
										},
									})
								}
								placeholder="Search Anything"
							/>
							<InputRightElement>
								{loading ? (
									<Spinner />
								) : (
									<IconButton
										aria-label="Search"
										variant="link"
										icon={<AiOutlineSearch size="24" />}
									/>
								)}
							</InputRightElement>
						</InputGroup>
						<AutoCompleteList w="full">
							{data?.searchProducts?.map((product) => (
								<AutoCompleteItem
									as={Link}
									key={product.identifier}
									value={product.identifier}
									textTransform="capitalize"
									href={`/products/${product.identifier}`}
								>
									{product.name}
								</AutoCompleteItem>
							))}
							<AutoCompleteCreatable>
								{({ value }) => <span>Search all results for {value} </span>}
							</AutoCompleteCreatable>
						</AutoCompleteList>
					</AutoComplete>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Search;
