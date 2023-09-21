import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { useMeStaffQuery } from "@/generated/graphql";
import PageLoader from "@/components/shared/PageLoader";

const withProtected = (Component: any) =>
	function WithProtected(props: NextPageContext) {
		const { data, loading, error } = useMeStaffQuery();

		const router = useRouter();

		if (loading) {
			return <PageLoader text="User Loading" />;
		}

		if (error) {
			return <p>{error.message}</p>;
		}

		if (
			!data?.meStaff?.staff?.tenantId ||
			data.meStaff.staff.status === "REVOKED"
		) {
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
			return <PageLoader text="Redirecting to Login" />;
		}

		return <Component {...props} />;
	};

export default withProtected;
