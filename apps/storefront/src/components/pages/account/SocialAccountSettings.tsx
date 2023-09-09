import type { StackProps } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import Card from "./Card";
import HeadingGroup from "./HeadingGroup";
import SocialAccount from "./SocialAccount";

const SocialAccountSettings = (props: StackProps) => (
	<Stack as="section" spacing="6" {...props}>
		<HeadingGroup
			title="Connected accounts"
			description="Connect your Hamropasal account to one or more provides"
		/>
		<Card>
			<Stack spacing="5">
				<SocialAccount provider="Google" icon={FcGoogle} username="Rohit Sah" />
				<SocialAccount
					provider="Facebook"
					icon={FaFacebook}
					// username="sahrohit9586"
					iconColor="blue.500"
				/>
			</Stack>
		</Card>
	</Stack>
);

export default SocialAccountSettings;
