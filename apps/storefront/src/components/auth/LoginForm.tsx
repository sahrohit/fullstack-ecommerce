import {
	Box,
	BoxProps,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Input,
	LightMode,
	Stack,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { Link, type LinkProps } from "@chakra-ui/next-js";

const LoginForm = () => {
	return (
		<form
			onSubmit={(e) => {
				// add submit logic here
				e.preventDefault();
			}}
		>
			<Stack spacing="-px">
				<FormControl id="email-address">
					<FormLabel srOnly>Email address</FormLabel>
					<Input
						size="lg"
						name="email"
						type="email"
						autoComplete="email"
						required
						placeholder="Email address"
						bg={mode("white", "gray.700")}
						fontSize="md"
						roundedBottom="0"
					/>
				</FormControl>
				<FormControl id="password">
					<FormLabel srOnly>Email address</FormLabel>
					<Input
						name="password"
						type="password"
						autoComplete="current-password"
						required
						size="lg"
						bg={mode("white", "gray.700")}
						fontSize="md"
						roundedTop="0"
						placeholder="Password"
					/>
				</FormControl>
			</Stack>
			<Flex align="center" justify="space-between" mt="8">
				<LightMode>
					<Checkbox
						size="lg"
						colorScheme="blue"
						sx={{
							".chakra-checkbox__control": {
								"&:not([data-checked])": { bg: mode("white", "gray.700") },
								rounded: "base",
								borderWidth: "1px",
							},
							".chakra-checkbox__label": { fontSize: "sm" },
						}}
					>
						Remember me
					</Checkbox>
				</LightMode>
				<UnderlineLink href="/auth/forgot-password" fontSize="sm">
					Forgot Password
				</UnderlineLink>
			</Flex>
			<LightMode>
				<Button
					size="lg"
					type="submit"
					mt="8"
					w="full"
					colorScheme="blue"
					fontSize="md"
					fontWeight="bold"
				>
					Sign in
				</Button>
			</LightMode>
		</form>
	);
};

export default LoginForm;

export const UnderlineLink = (props: LinkProps) => {
	return (
		<Link
			as="a"
			pos="relative"
			display="inline-block"
			transition="opacity 0.2s"
			_hover={{ opacity: 0.8 }}
			_after={{
				content: `""`,
				display: "block",
				w: "full",
				h: "2px",
				bottom: 0,
				bg: "blue.500",
				insetX: 0,
				insetY: 0,
			}}
			{...props}
		/>
	);
};
