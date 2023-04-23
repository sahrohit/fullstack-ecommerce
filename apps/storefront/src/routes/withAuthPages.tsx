import PageLoader from "@/components/shared/PageLoader";
import { useMeQuery } from "@/generated/graphql";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

const withAuthPages = (Component: any) =>
	function WithAuthPages(props: NextPageContext) {
		const { data, loading, error } = useMeQuery();

		const router = useRouter();
		const { redirect } = router.query;

		if (loading) {
			return <PageLoader />;
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
			return <PageLoader />;
		}

		return <Component {...props} />;
	};

export default withAuthPages;
