import Link from "next/link";
import Result from "@/components/shared/Result";
import { useMeQuery } from "@/generated/graphql";
import { Button } from "@chakra-ui/react";

const TestPage = () => {
	const { data, loading } = useMeQuery();

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Result
			type="info"
			heading="Test Page"
			text="This page should always remain as it is. The below data is fetched from the server."
			dump={data}
		>
			<Button as={Link} href="/" textDecoration="none!">
				Go to Dashboard
			</Button>
		</Result>
	);
};
export default TestPage;
