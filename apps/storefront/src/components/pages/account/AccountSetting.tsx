import {
	HStack,
	Avatar,
	Box,
	Button,
	Text,
	Stack,
	StackDivider,
	Icon,
	Tooltip,
} from "@chakra-ui/react";

import dayjs from "dayjs";
import { useRef } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { MdVerified } from "react-icons/md";
import { useMeQuery } from "@/generated/graphql";
import PageLoader from "@/components/shared/PageLoader";
import ModalButton from "@/components/ui/ModalButton";
import UpdatePasswordForm from "@/components/pages/account/setting/UpdatePasswordForm";
import Card from "./Card";
import FieldGroup from "./FieldGroup";
import ProfileForm from "./setting/ProfileForm";

dayjs.extend(relativeTime);

const AccountSettings = () => {
	const { data, loading, error } = useMeQuery({
		fetchPolicy: "cache-first",
	});

	const modalRef: any = useRef();

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};

	if (loading) return <PageLoader text="Loading User" />;

	if (error) return <p>Error: {error.message}</p>;

	const name = `${data?.me?.first_name} ${data?.me?.last_name}`;

	return (
		<Card>
			<Stack divider={<StackDivider />} spacing="6">
				<FieldGroup
					title="Name &amp; Avatar"
					description="Change your name and profile picture"
				>
					<HStack spacing="4">
						<Avatar
							src={
								data?.me?.imageUrl ??
								`https://api.dicebear.com/6.x/micah/svg?size=256&seed=${data?.me?.first_name}`
							}
							name={name}
						/>
						<Box>
							<Text>{name}</Text>
							<Text color="gray.500" fontSize="sm">
								Joined{" "}
								{dayjs(Number(data?.me?.created_at!)).format(
									"DD[th] MMMM YYYY"
								)}{" "}
								({dayjs(Number(data?.me?.created_at!)).fromNow()})
							</Text>
						</Box>
					</HStack>
					<HStack mt="5">
						<ModalButton
							ref={modalRef}
							size="sm"
							fontWeight="normal"
							buttonText="Change Name & Avatar"
							modalHeader="Change Name & Avatar"
							modalFooter=" "
						>
							<ProfileForm
								first_name={data?.me?.first_name || ""}
								last_name={data?.me?.last_name || ""}
								imageUrl={
									data?.me?.imageUrl ??
									`https://api.dicebear.com/6.x/micah/svg?size=256&seed=${data?.me?.first_name}`
								}
								onSubmissionSuccess={closeModal}
							/>
						</ModalButton>
					</HStack>
				</FieldGroup>

				<FieldGroup
					title="Login details"
					description="Change your email and password"
				>
					<HStack>
						<Text fontSize="sm">
							<strong>Email:</strong> {data?.me?.email}
						</Text>
						{data?.me?.email_verified ? (
							<Tooltip hasArrow label="Verified" placement="bottom">
								<Icon as={MdVerified} color="green" />
							</Tooltip>
						) : null}
					</HStack>
					{data?.me?.phone_number && (
						<Text fontSize="sm">
							<strong>Phone Number:</strong> {data?.me?.phone_number}
						</Text>
					)}
					<HStack mt="5">
						<Button size="sm" fontWeight="normal">
							Change Phone Number
						</Button>
						<ModalButton
							ref={modalRef}
							size="sm"
							fontWeight="normal"
							buttonText="Change password"
							modalHeader="Update Password"
							modalFooter=" "
						>
							<UpdatePasswordForm onSubmissionSuccess={closeModal} />
						</ModalButton>
					</HStack>
				</FieldGroup>
			</Stack>
		</Card>
	);
};

export default AccountSettings;
