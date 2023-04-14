import {
	Box,
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";
import ProductDetails from "../ProductDetails";

const QuickView = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<IconButton
				size="sm"
				flexGrow={1}
				variant="ghost"
				colorScheme="blue"
				aria-label="Search database"
				onClick={onOpen}
				icon={<AiOutlineEye size={24} />}
			/>

			<Modal
				size="6xl"
				onClose={onClose}
				isOpen={isOpen}
				scrollBehavior="outside"
				preserveScrollBarGap
			>
				<ModalOverlay />
				<ModalContent>
					<ModalBody pt={8} px={8}>
						<Box>
							<ProductDetails />
						</Box>
					</ModalBody>
					<ModalFooter>
						<Button w="full" onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default QuickView;
