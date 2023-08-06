import { Box, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { HiX } from "react-icons/hi";
import CallToActionLink from "./CallToActionLink";

const Banner = () => (
	<Box as="section" pt="8" pb="12">
		<Box
			// bgGradient="linear(to-r, blue.500, teal.500)"
			bg="teal.400"
			color="white"
			py="3"
			px={{ base: "3", md: "6", lg: "8" }}
		>
			<HStack spacing="3">
				<Stack
					direction={{ base: "column", sm: "row" }}
					justifyContent="center"
					alignItems="center"
					spacing={{ base: "3", md: "6" }}
					width="full"
				>
					<Text>
						<b>FLAT 10% OFF </b>
						Valid on order value above NRP 10,000
					</Text>
					<CallToActionLink href="/">Code: HAMROC10</CallToActionLink>
				</Stack>
				<IconButton
					fontSize="1.5em"
					variant="ghost"
					icon={<HiX />}
					alignSelf={{ base: "self-start", sm: "initial" }}
					aria-label="Close banner"
				/>
			</HStack>
		</Box>
	</Box>
);

export default Banner;
