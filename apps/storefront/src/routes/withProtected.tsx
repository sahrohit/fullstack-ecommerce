import { useMeQuery } from "@/generated/graphql";
import PageLoader from "@/components/shared/PageLoader";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

const withProtected = (Component: any) =>
	function WithProtected(props: NextPageContext) {
		const { data, loading, error } = useMeQuery();

		const router = useRouter();

		if (loading) {
			return <PageLoader />;
		}

		if (error) {
			return <p>{error.message}</p>;
		}

		if (!data?.me) {
			router.replace(
				{
					pathname: "/auth/login",
					query: {
						redirect: router.pathname,
					},
				},
				undefined,
				{
					shallow: true,
				}
			);
			return <PageLoader />;
		}

		return <Component {...props} />;
	};

export default withProtected;
