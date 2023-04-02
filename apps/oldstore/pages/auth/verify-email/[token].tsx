import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import Alert from "@components/ui/Alert";
import { useVerifyEmailMutation } from "@generated/graphql";

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
		return <FullPageLoadingSpinner />;
	}

	if (emailVerified === "not-verified") {
		return (
			<Alert
				status="error"
				title="Invalid Token"
				message="Please regenerate verification link here."
			/>
		);
	}

	return (
		<Alert
			status="error"
			title="Successfully Verified"
			message="Your account is verifed."
		/>
	);
};

export default VerifyEmailPage;
