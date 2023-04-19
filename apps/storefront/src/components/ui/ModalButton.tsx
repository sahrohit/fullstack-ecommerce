import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	ButtonProps,
	useDisclosure,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

interface ModalButtonProps extends ButtonProps {
	buttonText: string;
	modalHeader?: ReactNode;
	modalFooter?: ReactNode;
}

const ModalButton = ({
	buttonText,
	children,
	modalHeader,
	modalFooter,
	...rest
}: ModalButtonProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button onClick={onOpen} {...rest}>
				{buttonText}
			</Button>
			<Modal size="lg" isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					{modalHeader && <ModalHeader>{modalHeader}</ModalHeader>}
					<ModalCloseButton />
					<ModalBody>{children}</ModalBody>
					{modalFooter && <ModalFooter>{modalFooter}</ModalFooter>}
				</ModalContent>
			</Modal>
		</>
	);
};

ModalButton.defaultProps = {
	modalHeader: null,
	modalFooter: null,
};

export default ModalButton;
