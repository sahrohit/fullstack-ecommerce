import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	ButtonProps,
	Text,
	VStack,
	FormLabel,
	HStack,
	Input,
} from "@chakra-ui/react";
import { useState } from "react";

export interface ConfirmationModalProps extends ButtonProps {
	onSuccess: () => void;
	headerText: string;
	bodyText: string;
	confirmButtonProps: ButtonProps;
	confirmText?: string;
}

export const ConfirmationModal = ({
	onSuccess,
	headerText,
	bodyText,
	confirmButtonProps,
	confirmText,
	...rest
}: ConfirmationModalProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [text, setText] = useState("");

	return (
		<>
			<Button onClick={onOpen} {...rest} />

			<Modal isCentered isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{headerText}</ModalHeader>
					<ModalCloseButton />
					<ModalBody as={VStack} alignItems="flex-start" pb={6}>
						<Text textAlign="left" my={2}>
							{bodyText}
						</Text>
						{confirmText && (
							<>
								<HStack justifyContent="space-between">
									<FormLabel m={0}>
										Type <strong>{confirmText}</strong> to confirm
									</FormLabel>
								</HStack>
								<Input
									required
									name="Confirm"
									placeholder={confirmText}
									value={text}
									onChange={(e) => setText(e.target.value)}
								/>
							</>
						)}
					</ModalBody>

					<ModalFooter gap={2}>
						<Button variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button
							isDisabled={!!confirmText && text !== confirmText}
							colorScheme="red"
							onClick={() => {
								onSuccess();
								onClose();
							}}
							{...confirmButtonProps}
						>
							Confirm
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

ConfirmationModal.defaultProps = {
	confirmText: "",
};
