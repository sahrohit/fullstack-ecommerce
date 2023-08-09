import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useMeQuery } from "@/generated/graphql";
import PageLoader from "@/components/shared/PageLoader";

const withAuthPages = (Component: any) =>
	function WithAuthPages(props: NextPageContext) {
		const { data, loading, error } = useMeQuery();

		const router = useRouter();
		const { redirect } = router.query;

		if (loading) {
			return <PageLoader text="Loading User" />;
		}

		if (error) {
			return <p>{error.message}</p>;
		}

		if (data?.me) {
			if (redirect) {
				router.push(redirect as string);
			} else {
				router.push("/");
			}
			return <PageLoader text="Redirecting to Home" />;
		}

		return <Component {...props} />;
	};

export default withAuthPages;
