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
import { Product } from "@/generated/graphql";
import { AiOutlineEye } from "react-icons/ai";
import ProductDetails from "../ProductDetails";

interface QuickViewProps {
	product: Product;
}

const QuickView = ({ product }: QuickViewProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<IconButton
				size="sm"
				flexGrow={1}
				variant="link"
				aria-label="Open Preview"
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
							<ProductDetails product={product} />
						</Box>
					</ModalBody>
					<ModalFooter display={{ base: "flex", lg: "none" }}>
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
