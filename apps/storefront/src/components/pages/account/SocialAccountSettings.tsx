import type { StackProps } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { FaBitbucket, FaGithub, FaGoogle, FaSpotify } from "react-icons/fa";

import Card from "./Card";
import HeadingGroup from "./HeadingGroup";
import SocialAccount from "./SocialAccount";

const SocialAccountSettings = (props: StackProps) => (
	<Stack as="section" spacing="6" {...props}>
		<HeadingGroup
			title="Connected accounts"
			description="Connect your Chakra account to one or more provides"
		/>
		<Card>
			<Stack spacing="5">
				<SocialAccount
					provider="Github"
					icon={FaGithub}
					username="dabestcoder03"
				/>
				<SocialAccount provider="Google" icon={FaGoogle} iconColor="red.500" />
				<SocialAccount
					provider="Bitbucket"
					icon={FaBitbucket}
					iconColor="blue.500"
				/>
				<SocialAccount
					provider="Spotify"
					icon={FaSpotify}
					iconColor="green.500"
					username="lisabeats09"
				/>
			</Stack>
		</Card>
	</Stack>
);

export default SocialAccountSettings;
