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
import { forwardRef, useImperativeHandle, type ReactNode } from "react";

interface ModalButtonProps extends ButtonProps {
	buttonText: string;
	modalHeader?: ReactNode;
	modalFooter?: ReactNode;
}

const ModalButton = forwardRef(
	(
		{
			buttonText,
			children,
			modalHeader,
			modalFooter,
			...rest
		}: ModalButtonProps,
		ref
	) => {
		const { isOpen, onOpen, onClose } = useDisclosure();

		useImperativeHandle(ref, () => ({
			closeModal() {
				onClose();
			},
		}));

		return (
			<>
				<Button onClick={onOpen} {...rest}>
					{buttonText}
				</Button>
				<Modal size="lg" isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
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
	}
);

ModalButton.displayName = "ModalButton";

ModalButton.defaultProps = {
	modalHeader: null,
	modalFooter: null,
};

export default ModalButton;
