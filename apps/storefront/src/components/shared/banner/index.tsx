import { Box, Stack, Text } from "@chakra-ui/react";
import CallToActionLink from "./CallToActionLink";

const Banner = () => (
	<Box as="section" py="4">
		<Box
			// bgGradient="linear(to-r, blue.500, teal.500)"
			bg="teal.400"
			color="white"
			py="3"
			px={{ base: "3", md: "6", lg: "8" }}
		>
			<Stack
				spacing="3"
				direction={{
					base: "column",
					sm: "row",
				}}
			>
				<Stack
					direction={{ base: "column", sm: "row" }}
					justifyContent="center"
					alignItems="center"
					textAlign="center"
					spacing={{ base: "3", md: "6" }}
					width="full"
				>
					<Stack
						direction={{
							base: "column",
							sm: "row",
						}}
					>
						<Text as="strong">FLAT 10% OFF</Text>
						<Text>Valid on order value above NRP 10,000</Text>
					</Stack>
					<CallToActionLink href="/">Code: HAMROC10</CallToActionLink>
				</Stack>
				{/* <IconButton
					fontSize="1.5em"
					variant="ghost"
					icon={<HiX />}
					alignSelf={{ base: "self-start", sm: "initial" }}
					aria-label="Close banner"
				/> */}
			</Stack>
		</Box>
	</Box>
);

export default Banner;
