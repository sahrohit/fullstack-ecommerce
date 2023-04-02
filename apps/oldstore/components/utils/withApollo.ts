// import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

// const link = createHttpLink({
// 	uri: process.env.NEXT_PUBLIC_API_URL,
// 	credentials: "include",
// 	fetchOptions: {
// 		credentials: "include",
// 	},
// });

// const client = new ApolloClient({
// 	link,
// 	cache: new InMemoryCache(),
// });

// export const withApollo = client;

import { useMemo } from "react";
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	from,
	NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import merge from "deepmerge";
import { isEqual } from "lodash";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_API_URL, // Server URL (must be absolute)
	credentials: "include", // Additional fetch() options like `credentials` or `headers`
	fetchOptions: {
		credentials: "include",
	},
});

function createApolloClient() {
	return new ApolloClient({
		credentials: "include",
		ssrMode: typeof window === "undefined",
		link: from([errorLink, httpLink]),
		cache: new InMemoryCache(),
	});
}

export function initializeApollo(initialState = null) {
	const _apolloClient = apolloClient ?? createApolloClient();

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();

		// Merge the initialState from getStaticProps/getServerSideProps in the existing cache
		const data = merge(existingCache, initialState, {
			// combine arrays using object equality (like in sets)
			arrayMerge: (destinationArray, sourceArray) => [
				...sourceArray,
				...destinationArray.filter((d) =>
					sourceArray.every((s) => !isEqual(d, s))
				),
			],
		});

		// Restore the cache with the merged data
		_apolloClient.cache.restore(data);
	}
	// For SSG and SSR always create a new Apollo Client
	if (typeof window === "undefined") return _apolloClient;
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
}

export function addApolloState(
	client: ApolloClient<NormalizedCacheObject>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pageProps: { props: any }
) {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
	}

	return pageProps;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApollo(pageProps: any) {
	const state = pageProps[APOLLO_STATE_PROP_NAME];
	const store = useMemo(() => initializeApollo(state), [state]);
	return store;
}
