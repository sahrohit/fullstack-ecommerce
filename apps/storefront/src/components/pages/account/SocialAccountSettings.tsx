import type { StackProps } from "@chakra-ui/react";
import { Spinner, Stack } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useMeWithAccountQuery } from "generated-graphql";
import Result from "@/components/shared/Result";
import { capitalize, parseJwt } from "@/utils/helpers";
import { getGoogleOAuthUrl } from "@/components/auth/AuthProvider";
import Card from "./Card";
import HeadingGroup from "./HeadingGroup";
import SocialAccount from "./SocialAccount";

const providers = [
	{
		provider: "google",
		icon: FcGoogle,
		onConnect: () => {
			window.location.href = getGoogleOAuthUrl();
		},
	},
];

const SocialAccountSettings = (props: StackProps) => {
	const { data, loading, error } = useMeWithAccountQuery();

	if (loading) {
		return <Spinner />;
	}

	if (error)
		return (
			<Result
				heading={error.name}
				text={error.message}
				type="error"
				dump={error.stack}
			/>
		);

	return (
		<Stack as="section" spacing="6" {...props}>
			<HeadingGroup
				title="Connected accounts"
				description="Connect your Hamropasal account to one or more provides"
			/>
			<Card>
				<Stack spacing="5">
					{providers?.map((provider) => {
						let profile;

						if (provider.provider === "google") {
							profile = parseJwt(
								data?.meWithAccount?.accounts?.find(
									(account) => account.provider === "google"
								)?.id_token ?? ""
							);
						}

						return (
							<SocialAccount
								key={provider.provider}
								provider={capitalize(provider.provider)}
								icon={provider.icon}
								imageUrl={profile?.picture}
								username={profile?.name}
							/>
						);
					})}
				</Stack>
			</Card>
		</Stack>
	);
};

export default SocialAccountSettings;
