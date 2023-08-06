import {
	Avatar,
	Box,
	Button,
	HStack,
	Stack,
	useColorModeValue,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "@/components/ui/InputField";
import { HiCloudUpload } from "react-icons/hi";

type ProfileFormValues = {
	first_name: string;
	last_name: string;
};

const ProfileFormSchema = Yup.object({
	first_name: Yup.string().required("Required"),
	last_name: Yup.string().required("Required"),
});

interface ProfileFormProps {
	first_name: string;
	last_name: string;
	imageUrl: string;
	onSubmissionSuccess?: () => void;
}

const ProfileForm = ({
	first_name,
	last_name,
	imageUrl,
	onSubmissionSuccess: closeModal,
}: ProfileFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields, isSubmitting },
	} = useForm<ProfileFormValues>({
		defaultValues: {
			first_name,
			last_name,
		},
		resolver: yupResolver(ProfileFormSchema),
	});
	const toast = useToast();

	return (
		<form
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			onSubmit={handleSubmit(async (values) => {
				if (closeModal) {
					closeModal();
				}
			})}
		>
			<Stack spacing="4">
				<Stack direction="row" spacing="6" align="center" width="full">
					<Avatar
						size="xl"
						name={`${first_name} ${last_name}`}
						src={imageUrl}
					/>
					<Box>
						<HStack spacing="5">
							<Button
								onClick={() => {
									toast({
										title: "Feature coming soon",
										status: "info",
										duration: 4000,
										isClosable: true,
									});
								}}
								leftIcon={<HiCloudUpload />}
							>
								Change photo
							</Button>
							<Button variant="ghost" colorScheme="red">
								Delete
							</Button>
						</HStack>
						<Text
							fontSize="sm"
							mt="3"
							color={useColorModeValue("gray.500", "whiteAlpha.600")}
						>
							.jpg, .gif, or .png. Max file size 700K.
						</Text>
					</Box>
				</Stack>
				<HStack gap={3}>
					<InputField
						register={{ ...register("first_name") }}
						error={errors.first_name}
						touched={touchedFields.first_name}
						type="text"
						name="first_name"
						size="lg"
						autoComplete="firstName"
						label="First Name"
						placeholder=""
					/>
					<InputField
						register={{ ...register("last_name") }}
						error={errors.last_name}
						touched={touchedFields.last_name}
						name="last_name"
						type="text"
						size="lg"
						autoComplete="lastName"
						label="Last Name"
						placeholder=""
					/>
				</HStack>

				<Button
					type="submit"
					colorScheme="blue"
					size="lg"
					fontSize="md"
					isLoading={isSubmitting}
				>
					Update Profile
				</Button>
			</Stack>
		</form>
	);
};

ProfileForm.defaultProps = {
	onSubmissionSuccess: () => {},
};

export default ProfileForm;
