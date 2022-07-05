import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { useMeQuery } from "@generated/graphql";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withProtected = (Component: any) => {
	return function WithProtected(props: NextPageContext) {
		const { data, loading } = useMeQuery();
		const router = useRouter();

		if (loading) {
			return <FullPageLoadingSpinner />;
		}

		if (!data?.me) {
			toast.error("Not Logged In.");
			router.replace("/auth/login");
			return <FullPageLoadingSpinner />;
		}

		return <Component {...props} />;
	};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withAuthPages = (Component: any) => {
	return function WithAuthPages(props: NextPageContext) {
		const { data, loading } = useMeQuery();
		const router = useRouter();

		if (loading) {
			return <FullPageLoadingSpinner />;
		}

		if (data?.me) {
			toast.success("Already Logged In.");
			router.back();
			return <FullPageLoadingSpinner />;
		}

		return <Component {...props} />;
	};
};
