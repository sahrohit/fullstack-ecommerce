import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	IconButton,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteList,
	AutoCompleteItem,
	AutoCompleteCreatable,
} from "@choc-ui/chakra-autocomplete";
import { AiOutlineSearch } from "react-icons/ai";

const countries = ["nigeria", "japan", "india", "united states", "south korea"];

const Search = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
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
							<AutoCompleteInput placeholder="Search Anything" />
							<InputRightElement>
								<IconButton
									aria-label="Search"
									variant="link"
									icon={<AiOutlineSearch size="24" />}
								/>
							</InputRightElement>
						</InputGroup>
						<AutoCompleteList w="full">
							{countries.map((country, cid) => (
								<AutoCompleteItem
									key={`option-${cid + 1}`}
									value={country}
									textTransform="capitalize"
								>
									{country}
								</AutoCompleteItem>
							))}
							<AutoCompleteCreatable>
								{({ value }) => <span>Search specifically for {value} </span>}
							</AutoCompleteCreatable>
						</AutoCompleteList>
					</AutoComplete>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Search;
