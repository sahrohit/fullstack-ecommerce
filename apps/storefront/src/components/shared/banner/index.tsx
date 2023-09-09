import { Box, Stack, Text } from "@chakra-ui/react";
import CallToActionLink from "./CallToActionLink";

const Banner = () => (
	<Box as="section" py="4">
		<Box
			// bgGradient="linear(to-r, blue.500, teal.500)"
			bg="secondary.400"
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
						<Text>
							<Text as="strong">IMPORTANT!</Text> This is a dummy website. The
							items you order here, wont be delivered.
						</Text>
					</Stack>
					<CallToActionLink href="https://sahrohit.com.np">
						Contact Us
					</CallToActionLink>
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
