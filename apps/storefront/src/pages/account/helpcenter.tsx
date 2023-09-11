import { Stack } from "@chakra-ui/react";
import { useRef } from "react";
import { IoAdd } from "react-icons/io5";
import HeadingGroup from "@/components/pages/account/HeadingGroup";
import ModalButton from "@/components/ui/ModalButton";
import withProtected from "@/routes/withProtected";
import IssueForm from "@/components/pages/account/helpcenter/IssueForm";
import IssueSection from "@/components/pages/account/helpcenter/Issue";

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
					title="Issues"
					description="Create ticket here for your issues, and get them resolved"
				/>

				<ModalButton
					ref={modalRef}
					colorScheme="primary"
					leftIcon={<IoAdd />}
					w={{ base: "full", md: "unset" }}
					buttonText="Open Ticket for Issue"
					modalHeader="Open Ticket for Issue"
					modalFooter=" "
					modalSize="3xl"
				>
					<IssueForm onSubmissionSuccess={closeModal} />
				</ModalButton>
			</Stack>
			<IssueSection />
		</Stack>
	);
};

export default withProtected(AccountPage);
