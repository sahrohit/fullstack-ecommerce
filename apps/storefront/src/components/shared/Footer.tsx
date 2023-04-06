import {
	Box,
	Button,
	ButtonGroup,
	ButtonGroupProps,
	Heading,
	HeadingProps,
	IconButton,
	Link,
	SimpleGrid,
	Stack,
	StackDivider,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "../ui/InputField";
import { Logo } from "../logo";

const Footer = () => (
	<Box
		as="footer"
		role="contentinfo"
		mx="auto"
		maxW="7xl"
		py="12"
		px={{ base: "4", md: "8" }}
	>
		<Stack spacing="10" divider={<StackDivider />}>
			<Stack
				direction={{ base: "column", lg: "row" }}
				spacing={{ base: "10", lg: "28" }}
			>
				<Logo h={8} alignContent={"center"} />
				<Stack
					direction={{ base: "column", md: "row" }}
					spacing={{ base: "10", md: "20" }}
				>
					<SimpleGrid
						columns={2}
						spacing={{ base: "10", md: "20", lg: "28" }}
						flex="1"
					>
						<Box minW="130px">
							<FooterHeading mb="4">Product</FooterHeading>
							<Stack>
								<Link>How it works</Link>
								<Link>Pricing</Link>
								<Link>Use Cases</Link>
							</Stack>
						</Box>
						<Box minW="130px">
							<FooterHeading mb="4">Legal</FooterHeading>
							<Stack>
								<Link>Privacy</Link>
								<Link>Terms</Link>
								<Link>License</Link>
							</Stack>
						</Box>
					</SimpleGrid>

					<SubscribeForm />
				</Stack>
			</Stack>
			<Stack
				direction={{ base: "column-reverse", md: "row" }}
				justifyContent="space-between"
				alignItems="center"
			>
				<Text fontSize="sm">
					&copy; {new Date().getFullYear()} Envelope, Inc. All rights reserved.
				</Text>
				<SocialMediaLinks />
			</Stack>
		</Stack>
	</Box>
);

export default Footer;

export const FooterHeading = (props: HeadingProps) => (
	<Heading
		as="h4"
		color={useColorModeValue("gray.600", "gray.400")}
		fontSize="sm"
		fontWeight="semibold"
		textTransform="uppercase"
		letterSpacing="wider"
		{...props}
	/>
);

export const SocialMediaLinks = (props: ButtonGroupProps) => (
	<ButtonGroup variant="ghost" color="gray.600" {...props}>
		<IconButton
			as="a"
			href="#"
			aria-label="LinkedIn"
			icon={<FaLinkedin fontSize="20px" />}
		/>
		<IconButton
			as="a"
			href="#"
			aria-label="GitHub"
			icon={<FaGithub fontSize="20px" />}
		/>
		<IconButton
			as="a"
			href="#"
			aria-label="Twitter"
			icon={<FaTwitter fontSize="20px" />}
		/>
	</ButtonGroup>
);

interface FormValues {
	email: string;
}

const SubscribeFormSchema = Yup.object({
	email: Yup.string().email().required("Required"),
});

export const SubscribeForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
	} = useForm<FormValues>({
		defaultValues: {
			email: "",
		},
		resolver: yupResolver(SubscribeFormSchema),
	});

	return (
		<form
			onSubmit={handleSubmit((data) => {
				console.log(data);
			})}

			// width={{ base: "full", md: "sm" }}
		>
			<Stack spacing="4">
				<FooterHeading>Subscribe to our newsletter</FooterHeading>
				<Text>
					Get notified when we add new components or we have exciting news for
					you.
				</Text>
				<Stack spacing="4" direction={{ base: "column", md: "row" }}>
					<InputField
						name={"email"}
						register={{ ...register("email") }}
						error={errors.email}
						touched={touchedFields.email}
						label=""
						bg={useColorModeValue("white", "inherit")}
						placeholder="Enter your email"
						type="email"
						required
						_placeholder={{
							opacity: 1,
							color: useColorModeValue("gray.500", "whiteAlpha.700"),
						}}
					/>

					<Button
						type="submit"
						colorScheme="blue"
						flexShrink={0}
						width={{ base: "full", md: "auto" }}
					>
						Subscribe
					</Button>
				</Stack>
			</Stack>
		</form>
	);
};
