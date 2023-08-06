import {
	Box,
	Button,
	ButtonGroupProps,
	HStack,
	Heading,
	HeadingProps,
	Icon,
	Link,
	SimpleGrid,
	Stack,
	StackDivider,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "@/components/ui/InputField";
import { AiOutlineMail } from "react-icons/ai";
import Logo from "@/components/logo";
import { EsewaLogoFull, KhaltiLogoFull } from "@/config/brands";
import { ThemeSwitchButton } from "./ThemeSwitch";
import { BRAND_NAME } from "../../../constants";

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
				<Stack>
					<Logo h={8} alignContent="center" iconColor="blue.400" />
					<Box mt={2}>
						<ThemeSwitchButton />
					</Box>
				</Stack>
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
							<FooterHeading mb="4">Customer Care</FooterHeading>
							<Stack>
								<Link href="/">About Us</Link>
								<Link href="/">Returns</Link>
								<Link href="/">FAQs</Link>
								<Link href="/">Contact Us</Link>
							</Stack>
						</Box>
						<Box minW="130px">
							<FooterHeading mb="4">Legal</FooterHeading>
							<Stack>
								<Link href="/">Privacy</Link>
								<Link href="/">Terms</Link>
								<Link href="/">License</Link>
								<Link href="/">Return Policy</Link>
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
					&copy; {new Date().getFullYear()} {BRAND_NAME}, Inc. All rights
					reserved.
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
	<HStack gap={2} {...props}>
		<Icon maxW={8} as={KhaltiLogoFull} />
		<Icon maxW={8} as={EsewaLogoFull} />
	</HStack>
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
		<form onSubmit={handleSubmit(() => {})}>
			<Stack spacing="4">
				<FooterHeading>Subscribe and Save</FooterHeading>
				<Text>
					Subscribe to get special offers, free giveaways, and
					once-in-a-lifetime deals.
				</Text>
				<Stack
					spacing="4"
					alignItems="center"
					direction={{ base: "column", md: "row" }}
				>
					<InputField
						name="email"
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
						leftIcon={<AiOutlineMail />}
						width={{ base: "full", md: "auto" }}
					>
						Subscribe
					</Button>
				</Stack>
			</Stack>
		</form>
	);
};
