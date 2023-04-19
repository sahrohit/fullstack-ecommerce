import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	DateTime: any;
};

export type AddAddressInput = {
	address_line1: Scalars["String"];
	address_line2?: InputMaybe<Scalars["String"]>;
	city: Scalars["String"];
	country: Scalars["String"];
	name: Scalars["String"];
	phone_number: Scalars["String"];
	postal_code: Scalars["String"];
	state: Scalars["String"];
};

export type AddProductInput = {
	categoryId: Scalars["Float"];
	desc: Scalars["String"];
	identifier: Scalars["String"];
	images: Array<ProductImageInput>;
	name: Scalars["String"];
	variants: Array<ProductVariantInput>;
};

export type Address = {
	__typename?: "Address";
	address_line1: Scalars["String"];
	address_line2?: Maybe<Scalars["String"]>;
	city: Scalars["String"];
	country: Scalars["String"];
	created_at: Scalars["String"];
	id: Scalars["Int"];
	name: Scalars["String"];
	phone_number: Scalars["String"];
	postal_code: Scalars["String"];
	state: Scalars["String"];
	updated_at: Scalars["String"];
	userId: Scalars["Float"];
};

export type Cart = {
	__typename?: "Cart";
	created_at: Scalars["String"];
	id: Scalars["Int"];
	inventoryId: Scalars["Float"];
	quantity: Scalars["Float"];
	updated_at: Scalars["String"];
	userId: Scalars["Float"];
};

export type CartResponse = {
	__typename?: "CartResponse";
	categoryId: Scalars["Float"];
	created_at: Scalars["DateTime"];
	id: Scalars["Int"];
	images?: Maybe<Array<ProductImageResponse>>;
	inventoryId: Scalars["Float"];
	price: Scalars["Float"];
	product_desc?: Maybe<Scalars["String"]>;
	product_identifier?: Maybe<Scalars["String"]>;
	product_name: Scalars["String"];
	quantity: Scalars["Float"];
	updated_at: Scalars["DateTime"];
	userId: Scalars["Float"];
	variant: Scalars["String"];
};

export type DiscountResponse = {
	__typename?: "DiscountResponse";
	active: Scalars["Boolean"];
	desc: Scalars["String"];
	discount_percent: Scalars["Float"];
	name: Scalars["String"];
};

export type FieldError = {
	__typename?: "FieldError";
	field: Scalars["String"];
	message: Scalars["String"];
};

export type Mutation = {
	__typename?: "Mutation";
	addAddress: Address;
	addCategory: ProductCategory;
	addDiscount?: Maybe<DiscountResponse>;
	addProducts?: Maybe<ProductResponse>;
	addToCart: Cart;
	changePassword: UserResponse;
	clearCart: Scalars["Boolean"];
	deleteAddress: Scalars["Boolean"];
	deleteCategory: Scalars["Boolean"];
	deleteDiscount?: Maybe<Scalars["Boolean"]>;
	deleteFromCart: Scalars["Boolean"];
	forgotPassword: Scalars["Boolean"];
	login: UserResponse;
	logout: Scalars["Boolean"];
	register: UserResponse;
	resendVerificationEmail: Scalars["Boolean"];
	updateAddress: Address;
	updateCart: Cart;
	updateCategory: ProductCategory;
	updateDiscount?: Maybe<DiscountResponse>;
	updatePassword: UserResponse;
	updateProduct?: Maybe<ProductResponse>;
	updateProductDiscount?: Maybe<ProductResponse>;
	verifyEmail: Scalars["Boolean"];
};

export type MutationAddAddressArgs = {
	input: AddAddressInput;
};

export type MutationAddCategoryArgs = {
	desc: Scalars["String"];
	identifier: Scalars["String"];
	name: Scalars["String"];
};

export type MutationAddDiscountArgs = {
	options: AddProductInput;
};

export type MutationAddProductsArgs = {
	options: AddProductInput;
};

export type MutationAddToCartArgs = {
	inventoryId: Scalars["Int"];
	quantity: Scalars["Int"];
};

export type MutationChangePasswordArgs = {
	newPassword: Scalars["String"];
	token: Scalars["String"];
};

export type MutationDeleteAddressArgs = {
	id: Scalars["Int"];
};

export type MutationDeleteCategoryArgs = {
	id: Scalars["Float"];
};

export type MutationDeleteDiscountArgs = {
	id: Scalars["Float"];
};

export type MutationDeleteFromCartArgs = {
	inventoryId: Scalars["Int"];
	quantity: Scalars["Int"];
};

export type MutationForgotPasswordArgs = {
	email: Scalars["String"];
};

export type MutationLoginArgs = {
	email: Scalars["String"];
	password: Scalars["String"];
};

export type MutationRegisterArgs = {
	options: RegisterInput;
};

export type MutationResendVerificationEmailArgs = {
	email: Scalars["String"];
};

export type MutationUpdateAddressArgs = {
	id: Scalars["Int"];
	input: UpdateAddressInput;
};

export type MutationUpdateCartArgs = {
	inventoryId: Scalars["Int"];
	quantity: Scalars["Int"];
};

export type MutationUpdateCategoryArgs = {
	id: Scalars["Float"];
	options: UpdateCategoryInput;
};

export type MutationUpdateDiscountArgs = {
	options: UpdateDiscountInput;
};

export type MutationUpdatePasswordArgs = {
	confirmPassword: Scalars["String"];
	currentPassword: Scalars["String"];
	newPassword: Scalars["String"];
};

export type MutationUpdateProductArgs = {
	id: Scalars["Float"];
	options: UpdateProductInput;
};

export type MutationUpdateProductDiscountArgs = {
	discount_id: Scalars["Float"];
	product_id: Scalars["Float"];
};

export type MutationVerifyEmailArgs = {
	token: Scalars["String"];
};

export type ProductCategory = {
	__typename?: "ProductCategory";
	created_at: Scalars["String"];
	desc: Scalars["String"];
	id: Scalars["Int"];
	identifier: Scalars["String"];
	name: Scalars["String"];
	updated_at: Scalars["String"];
};

export type ProductCategorySummary = {
	__typename?: "ProductCategorySummary";
	created_at: Scalars["DateTime"];
	desc: Scalars["String"];
	id: Scalars["Int"];
	identifier: Scalars["String"];
	name: Scalars["String"];
	product_count: Scalars["Float"];
	updated_at: Scalars["DateTime"];
};

export type ProductImageInput = {
	imageURL: Scalars["String"];
};

export type ProductImageResponse = {
	__typename?: "ProductImageResponse";
	imageURL: Scalars["String"];
	image_id: Scalars["Int"];
};

export type ProductResponse = {
	__typename?: "ProductResponse";
	categoryId: Scalars["Float"];
	category_desc: Scalars["String"];
	category_name: Scalars["String"];
	created_at: Scalars["DateTime"];
	desc: Scalars["String"];
	discount_active?: Maybe<Scalars["Boolean"]>;
	discount_desc?: Maybe<Scalars["String"]>;
	discount_name?: Maybe<Scalars["String"]>;
	discount_percent?: Maybe<Scalars["Float"]>;
	id: Scalars["Int"];
	identifier: Scalars["String"];
	images: Array<ProductImageResponse>;
	name: Scalars["String"];
	updated_at: Scalars["DateTime"];
	variants: Array<ProductVariantResponse>;
};

export type ProductVariantInput = {
	price: Scalars["Float"];
	quantity: Scalars["Int"];
	variant: Scalars["String"];
};

export type ProductVariantResponse = {
	__typename?: "ProductVariantResponse";
	price: Scalars["Float"];
	product_id: Scalars["Int"];
	quantity: Scalars["Int"];
	variant: Scalars["String"];
	variant_id: Scalars["Int"];
};

export type Query = {
	__typename?: "Query";
	addresses?: Maybe<Array<Address>>;
	categories: Array<ProductCategory>;
	categoriesSummary?: Maybe<Array<ProductCategorySummary>>;
	fetchCartItems?: Maybe<Array<CartResponse>>;
	hello: Scalars["String"];
	me?: Maybe<User>;
	product?: Maybe<ProductResponse>;
	products?: Maybe<Array<ProductResponse>>;
	roles: Array<UserRole>;
	users: Array<UserDataResponse>;
};

export type QueryProductArgs = {
	identifier: Scalars["String"];
};

export type RegisterInput = {
	email: Scalars["String"];
	first_name: Scalars["String"];
	last_name: Scalars["String"];
	password: Scalars["String"];
};

export type UpdateAddressInput = {
	address_line1?: InputMaybe<Scalars["String"]>;
	address_line2?: InputMaybe<Scalars["String"]>;
	city?: InputMaybe<Scalars["String"]>;
	country?: InputMaybe<Scalars["String"]>;
	name?: InputMaybe<Scalars["String"]>;
	phone_number?: InputMaybe<Scalars["String"]>;
	postal_code?: InputMaybe<Scalars["String"]>;
	state?: InputMaybe<Scalars["String"]>;
};

export type UpdateCategoryInput = {
	desc?: InputMaybe<Scalars["String"]>;
	identifier?: InputMaybe<Scalars["String"]>;
	name?: InputMaybe<Scalars["String"]>;
};

export type UpdateDiscountInput = {
	active?: InputMaybe<Scalars["Boolean"]>;
	desc?: InputMaybe<Scalars["String"]>;
	discount_percent?: InputMaybe<Scalars["Float"]>;
	id: Scalars["Float"];
	name?: InputMaybe<Scalars["String"]>;
};

export type UpdateProductInput = {
	category_id?: InputMaybe<Scalars["Float"]>;
	desc?: InputMaybe<Scalars["String"]>;
	name?: InputMaybe<Scalars["String"]>;
	price?: InputMaybe<Scalars["Float"]>;
	quantity?: InputMaybe<Scalars["Float"]>;
};

export type User = {
	__typename?: "User";
	created_at: Scalars["String"];
	email: Scalars["String"];
	email_verified: Scalars["Boolean"];
	first_name: Scalars["String"];
	id: Scalars["Int"];
	imageUrl?: Maybe<Scalars["String"]>;
	last_name: Scalars["String"];
	phone_number?: Maybe<Scalars["String"]>;
	phone_number_verified: Scalars["Boolean"];
	roleId: Scalars["Float"];
	updated_at: Scalars["String"];
};

export type UserDataResponse = {
	__typename?: "UserDataResponse";
	created_at: Scalars["DateTime"];
	email: Scalars["String"];
	email_verified: Scalars["Boolean"];
	first_name: Scalars["String"];
	id: Scalars["Int"];
	imageUrl?: Maybe<Scalars["String"]>;
	last_name: Scalars["String"];
	phone_number?: Maybe<Scalars["String"]>;
	phone_number_verified: Scalars["Boolean"];
	role: Scalars["String"];
	roleId: Scalars["Float"];
	updated_at: Scalars["DateTime"];
};

export type UserResponse = {
	__typename?: "UserResponse";
	errors?: Maybe<Array<FieldError>>;
	user?: Maybe<User>;
};

export type UserRole = {
	__typename?: "UserRole";
	created_at: Scalars["String"];
	id: Scalars["Int"];
	name: Scalars["String"];
	updated_at: Scalars["String"];
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
	__typename?: "Query";
	me?: {
		__typename?: "User";
		id: number;
		first_name: string;
		last_name: string;
		email: string;
		email_verified: boolean;
		phone_number?: string | null;
		phone_number_verified: boolean;
		imageUrl?: string | null;
		roleId: number;
		created_at: string;
		updated_at: string;
	} | null;
};

export type ProductsQueryVariables = Exact<{ [key: string]: never }>;

export type ProductsQuery = {
	__typename?: "Query";
	products?: Array<{
		__typename?: "ProductResponse";
		id: number;
		name: string;
		desc: string;
		identifier: string;
		categoryId: number;
		category_name: string;
		category_desc: string;
		discount_name?: string | null;
		discount_percent?: number | null;
		discount_desc?: string | null;
		discount_active?: boolean | null;
		created_at: any;
		updated_at: any;
		variants: Array<{
			__typename?: "ProductVariantResponse";
			quantity: number;
			variant_id: number;
			product_id: number;
			price: number;
			variant: string;
		}>;
		images: Array<{
			__typename?: "ProductImageResponse";
			image_id: number;
			imageURL: string;
		}>;
	}> | null;
};

export const MeDocument = gql`
	query Me {
		me {
			id
			first_name
			last_name
			email
			email_verified
			phone_number
			phone_number_verified
			imageUrl
			roleId
			created_at
			updated_at
		}
	}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
	baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProductsDocument = gql`
	query Products {
		products {
			id
			name
			desc
			identifier
			categoryId
			category_name
			category_desc
			discount_name
			discount_percent
			discount_desc
			discount_active
			variants {
				quantity
				variant_id
				product_id
				price
				variant
			}
			images {
				image_id
				imageURL
			}
			created_at
			updated_at
		}
	}
`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(
	baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(
		ProductsDocument,
		options
	);
}
export function useProductsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		ProductsQuery,
		ProductsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(
		ProductsDocument,
		options
	);
}
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<
	typeof useProductsLazyQuery
>;
export type ProductsQueryResult = Apollo.QueryResult<
	ProductsQuery,
	ProductsQueryVariables
>;
