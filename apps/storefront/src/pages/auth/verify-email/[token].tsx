import { Link } from "@chakra-ui/next-js";
import { Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useVerifyEmailMutation } from "generated-graphql";
import { Result } from "ui";
import PageLoader from "@/components/shared/PageLoader";

const VerifyEmailPage: NextPage = () => {
	const router = useRouter();
	const { token } = router.query;
	const [emailVerified, setEmailVerified] = useState<
		"loading" | "verified" | "not-verified"
	>("loading");

	const [verifyEmail] = useVerifyEmailMutation();

	useEffect(() => {
		const asyncFuntion = async () => {
			const response = await verifyEmail({
				variables: {
					token: token as string,
				},
			});
			if (response.data?.verifyEmail) {
				setEmailVerified("verified");
				router.replace("/");
				return;
			}
			setEmailVerified("not-verified");
		};
		if (typeof window !== "undefined" && token) {
			asyncFuntion();
		}
	}, [router, token, verifyEmail]);

	if (emailVerified === "loading") {
		return <PageLoader text="Verifying Email" />;
	}

	if (emailVerified === "not-verified") {
		return (
			<Result
				type="error"
				heading="Invalid Token"
				text="Please regenerate verification link here."
			/>
		);
	}

	return (
		<Result
			type="success"
			heading="Successfully Verified"
			text="Your account is successfully verifed. You can now login."
		>
			<Button as={Link} href="/" textDecoration="none!" colorScheme="primary">
				Go to Dashboard
			</Button>
		</Result>
	);
};

export default VerifyEmailPage;
