import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useMeStaffQuery } from "@/generated/graphql";
import PageLoader from "@/components/shared/PageLoader";

const withAuthPages = (Component: any) =>
	function WithAuthPages(props: NextPageContext) {
		const { data, loading, error } = useMeStaffQuery();

		const router = useRouter();
		const { redirect } = router.query;

		if (loading) {
			return <PageLoader text="Loading User" />;
		}

		if (error) {
			return <p>{error.message}</p>;
		}

		if (data?.meStaff?.staff?.tenantId) {
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
