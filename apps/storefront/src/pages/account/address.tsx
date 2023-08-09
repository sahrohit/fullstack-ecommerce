import { Stack } from "@chakra-ui/react";
import { useRef } from "react";
import { IoAdd } from "react-icons/io5";
import AddressSection from "@/components/pages/account/address/Address";
import AddressForm from "@/components/pages/account/address/AddressForm";
import HeadingGroup from "@/components/pages/account/HeadingGroup";
import ModalButton from "@/components/ui/ModalButton";
import withProtected from "@/routes/withProtected";

const AccountPage = () => {
	const modalRef: any = useRef();

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};

	return (
		<Stack as="section" spacing="6" maxW="3xl" my={8}>
			<Stack
				gap={4}
				alignItems={{ base: "center", md: "flex-end" }}
				justifyContent="space-between"
				direction={{ base: "column", md: "row" }}
			>
				<HeadingGroup
					title="Address"
					description="Add your addresses here, and reuse it over there"
				/>

				<ModalButton
					ref={modalRef}
					colorScheme="blue"
					leftIcon={<IoAdd />}
					w={{ base: "full", md: "unset" }}
					buttonText="Add Address"
					modalHeader="Add Address"
					modalFooter=" "
				>
					<AddressForm onSubmissionSuccess={closeModal} />
				</ModalButton>
			</Stack>
			<AddressSection />
		</Stack>
	);
};

export default withProtected(AccountPage);
