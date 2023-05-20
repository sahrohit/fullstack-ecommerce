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
	modalSize?:
		| "xs"
		| "sm"
		| "md"
		| "lg"
		| "xl"
		| "2xl"
		| "3xl"
		| "4xl"
		| "5xl"
		| "6xl"
		| "7xl"
		| "full";
}

const ModalButton = forwardRef(
	(
		{
			buttonText,
			children,
			modalHeader,
			modalFooter,
			modalSize,
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
				<Modal
					size={modalSize}
					isOpen={isOpen}
					onClose={onClose}
					preserveScrollBarGap
				>
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
	modalSize: "lg",
};

export default ModalButton;
