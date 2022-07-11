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
};

export type AddAddressInput = {
	address_line1: Scalars["String"];
	address_line2?: InputMaybe<Scalars["String"]>;
	city: Scalars["String"];
	country: Scalars["String"];
	nickname: Scalars["String"];
	phone_number: Scalars["String"];
	postal_code: Scalars["String"];
	state: Scalars["String"];
};

export type AddProductInput = {
	category_id: Scalars["Float"];
	desc: Scalars["String"];
	name: Scalars["String"];
	price: Scalars["Float"];
	quantity: Scalars["Float"];
};

export type Address = {
	__typename?: "Address";
	address_line1: Scalars["String"];
	address_line2?: Maybe<Scalars["String"]>;
	city: Scalars["String"];
	country: Scalars["String"];
	created_at: Scalars["String"];
	id: Scalars["Int"];
	nickname: Scalars["String"];
	phone_number: Scalars["String"];
	postal_code: Scalars["String"];
	state: Scalars["String"];
	updated_at: Scalars["String"];
	userId: Scalars["Float"];
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
	changePassword: UserResponse;
	deleteAddress: Scalars["Boolean"];
	deleteCategory: Scalars["Boolean"];
	deleteDiscount?: Maybe<Scalars["Boolean"]>;
	forgotPassword: Scalars["Boolean"];
	login: UserResponse;
	logout: Scalars["Boolean"];
	register: UserResponse;
	resendVerificationEmail: Scalars["Boolean"];
	updateAddress: Address;
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
	name: Scalars["String"];
};

export type MutationAddDiscountArgs = {
	options: AddProductInput;
};

export type MutationAddProductsArgs = {
	options: AddProductInput;
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
	name: Scalars["String"];
	updated_at: Scalars["String"];
};

export type ProductResponse = {
	__typename?: "ProductResponse";
	category_desc: Scalars["String"];
	category_name: Scalars["String"];
	desc: Scalars["String"];
	discount_active?: Maybe<Scalars["Boolean"]>;
	discount_desc?: Maybe<Scalars["String"]>;
	discount_name?: Maybe<Scalars["String"]>;
	discount_percent?: Maybe<Scalars["Float"]>;
	id: Scalars["Int"];
	name: Scalars["String"];
	price: Scalars["Float"];
	quantity: Scalars["Float"];
};

export type Query = {
	__typename?: "Query";
	addresses?: Maybe<Array<Address>>;
	categories: Array<ProductCategory>;
	hello: Scalars["String"];
	me?: Maybe<User>;
	products?: Maybe<Array<ProductResponse>>;
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
	nickname?: InputMaybe<Scalars["String"]>;
	phone_number?: InputMaybe<Scalars["String"]>;
	postal_code?: InputMaybe<Scalars["String"]>;
	state?: InputMaybe<Scalars["String"]>;
};

export type UpdateCategoryInput = {
	desc?: InputMaybe<Scalars["String"]>;
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
	last_name: Scalars["String"];
	phone_number?: Maybe<Scalars["String"]>;
	phone_number_verified: Scalars["Boolean"];
	updated_at: Scalars["String"];
};

export type UserResponse = {
	__typename?: "UserResponse";
	errors?: Maybe<Array<FieldError>>;
	user?: Maybe<User>;
};

export type AddressFragmentFragment = {
	__typename?: "Address";
	id: number;
	nickname: string;
	address_line1: string;
	address_line2?: string | null;
	city: string;
	state: string;
	postal_code: string;
	phone_number: string;
	country: string;
	created_at: string;
	updated_at: string;
};

export type RegularErrorFragment = {
	__typename?: "FieldError";
	field: string;
	message: string;
};

export type UserFragmentFragment = {
	__typename?: "User";
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	email_verified: boolean;
	phone_number?: string | null;
	phone_number_verified: boolean;
	created_at: string;
	updated_at: string;
};

export type AddAddressMutationVariables = Exact<{
	input: AddAddressInput;
}>;

export type AddAddressMutation = {
	__typename?: "Mutation";
	addAddress: {
		__typename?: "Address";
		id: number;
		nickname: string;
		address_line1: string;
		address_line2?: string | null;
		city: string;
		state: string;
		postal_code: string;
		phone_number: string;
		country: string;
		created_at: string;
		updated_at: string;
	};
};

export type ChangePasswordMutationVariables = Exact<{
	newPassword: Scalars["String"];
	token: Scalars["String"];
}>;

export type ChangePasswordMutation = {
	__typename?: "Mutation";
	changePassword: {
		__typename?: "UserResponse";
		errors?: Array<{
			__typename?: "FieldError";
			field: string;
			message: string;
		}> | null;
		user?: {
			__typename?: "User";
			id: number;
			first_name: string;
			last_name: string;
			email: string;
			email_verified: boolean;
			phone_number?: string | null;
			phone_number_verified: boolean;
			created_at: string;
			updated_at: string;
		} | null;
	};
};

export type DeleteAddressMutationVariables = Exact<{
	deleteAddressId: Scalars["Int"];
}>;

export type DeleteAddressMutation = {
	__typename?: "Mutation";
	deleteAddress: boolean;
};

export type ForgotPasswordMutationVariables = Exact<{
	email: Scalars["String"];
}>;

export type ForgotPasswordMutation = {
	__typename?: "Mutation";
	forgotPassword: boolean;
};

export type LoginMutationVariables = Exact<{
	password: Scalars["String"];
	email: Scalars["String"];
}>;

export type LoginMutation = {
	__typename?: "Mutation";
	login: {
		__typename?: "UserResponse";
		errors?: Array<{
			__typename?: "FieldError";
			field: string;
			message: string;
		}> | null;
		user?: {
			__typename?: "User";
			id: number;
			first_name: string;
			last_name: string;
			email: string;
			email_verified: boolean;
			phone_number?: string | null;
			phone_number_verified: boolean;
			created_at: string;
			updated_at: string;
		} | null;
	};
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type RegisterMutationVariables = Exact<{
	options: RegisterInput;
}>;

export type RegisterMutation = {
	__typename?: "Mutation";
	register: {
		__typename?: "UserResponse";
		errors?: Array<{
			__typename?: "FieldError";
			field: string;
			message: string;
		}> | null;
		user?: {
			__typename?: "User";
			id: number;
			first_name: string;
			last_name: string;
			email: string;
			email_verified: boolean;
			phone_number?: string | null;
			phone_number_verified: boolean;
			created_at: string;
			updated_at: string;
		} | null;
	};
};

export type ResendVerificationEmailMutationVariables = Exact<{
	email: Scalars["String"];
}>;

export type ResendVerificationEmailMutation = {
	__typename?: "Mutation";
	resendVerificationEmail: boolean;
};

export type UpdateAddressMutationVariables = Exact<{
	input: UpdateAddressInput;
	updateAddressId: Scalars["Int"];
}>;

export type UpdateAddressMutation = {
	__typename?: "Mutation";
	updateAddress: {
		__typename?: "Address";
		id: number;
		nickname: string;
		address_line1: string;
		address_line2?: string | null;
		city: string;
		state: string;
		postal_code: string;
		phone_number: string;
		country: string;
		created_at: string;
		updated_at: string;
	};
};

export type UpdatePasswordMutationVariables = Exact<{
	confirmPassword: Scalars["String"];
	newPassword: Scalars["String"];
	currentPassword: Scalars["String"];
}>;

export type UpdatePasswordMutation = {
	__typename?: "Mutation";
	updatePassword: {
		__typename?: "UserResponse";
		errors?: Array<{
			__typename?: "FieldError";
			field: string;
			message: string;
		}> | null;
		user?: {
			__typename?: "User";
			id: number;
			first_name: string;
			last_name: string;
			email: string;
			email_verified: boolean;
			phone_number?: string | null;
			phone_number_verified: boolean;
			created_at: string;
			updated_at: string;
		} | null;
	};
};

export type VerifyEmailMutationVariables = Exact<{
	token: Scalars["String"];
}>;

export type VerifyEmailMutation = {
	__typename?: "Mutation";
	verifyEmail: boolean;
};

export type AddressQueryVariables = Exact<{ [key: string]: never }>;

export type AddressQuery = {
	__typename?: "Query";
	addresses?: Array<{
		__typename?: "Address";
		id: number;
		nickname: string;
		address_line1: string;
		address_line2?: string | null;
		city: string;
		state: string;
		postal_code: string;
		phone_number: string;
		country: string;
		created_at: string;
		updated_at: string;
	}> | null;
};

export type HelloQueryQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQueryQuery = { __typename?: "Query"; hello: string };

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
		created_at: string;
		updated_at: string;
	} | null;
};

export const AddressFragmentFragmentDoc = gql`
	fragment AddressFragment on Address {
		id
		nickname
		address_line1
		address_line2
		city
		state
		postal_code
		phone_number
		country
		created_at
		updated_at
	}
`;
export const RegularErrorFragmentDoc = gql`
	fragment RegularError on FieldError {
		field
		message
	}
`;
export const UserFragmentFragmentDoc = gql`
	fragment UserFragment on User {
		id
		first_name
		last_name
		email
		email_verified
		phone_number
		phone_number_verified
		created_at
		updated_at
	}
`;
export const AddAddressDocument = gql`
	mutation AddAddress($input: AddAddressInput!) {
		addAddress(input: $input) {
			...AddressFragment
		}
	}
	${AddressFragmentFragmentDoc}
`;
export type AddAddressMutationFn = Apollo.MutationFunction<
	AddAddressMutation,
	AddAddressMutationVariables
>;

/**
 * __useAddAddressMutation__
 *
 * To run a mutation, you first call `useAddAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAddressMutation, { data, loading, error }] = useAddAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddAddressMutation(
	baseOptions?: Apollo.MutationHookOptions<
		AddAddressMutation,
		AddAddressMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<AddAddressMutation, AddAddressMutationVariables>(
		AddAddressDocument,
		options
	);
}
export type AddAddressMutationHookResult = ReturnType<
	typeof useAddAddressMutation
>;
export type AddAddressMutationResult =
	Apollo.MutationResult<AddAddressMutation>;
export type AddAddressMutationOptions = Apollo.BaseMutationOptions<
	AddAddressMutation,
	AddAddressMutationVariables
>;
export const ChangePasswordDocument = gql`
	mutation ChangePassword($newPassword: String!, $token: String!) {
		changePassword(newPassword: $newPassword, token: $token) {
			errors {
				...RegularError
			}
			user {
				...UserFragment
			}
		}
	}
	${RegularErrorFragmentDoc}
	${UserFragmentFragmentDoc}
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
	ChangePasswordMutation,
	ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(
	baseOptions?: Apollo.MutationHookOptions<
		ChangePasswordMutation,
		ChangePasswordMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		ChangePasswordMutation,
		ChangePasswordMutationVariables
	>(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
	typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
	Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
	ChangePasswordMutation,
	ChangePasswordMutationVariables
>;
export const DeleteAddressDocument = gql`
	mutation DeleteAddress($deleteAddressId: Int!) {
		deleteAddress(id: $deleteAddressId)
	}
`;
export type DeleteAddressMutationFn = Apollo.MutationFunction<
	DeleteAddressMutation,
	DeleteAddressMutationVariables
>;

/**
 * __useDeleteAddressMutation__
 *
 * To run a mutation, you first call `useDeleteAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAddressMutation, { data, loading, error }] = useDeleteAddressMutation({
 *   variables: {
 *      deleteAddressId: // value for 'deleteAddressId'
 *   },
 * });
 */
export function useDeleteAddressMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteAddressMutation,
		DeleteAddressMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		DeleteAddressMutation,
		DeleteAddressMutationVariables
	>(DeleteAddressDocument, options);
}
export type DeleteAddressMutationHookResult = ReturnType<
	typeof useDeleteAddressMutation
>;
export type DeleteAddressMutationResult =
	Apollo.MutationResult<DeleteAddressMutation>;
export type DeleteAddressMutationOptions = Apollo.BaseMutationOptions<
	DeleteAddressMutation,
	DeleteAddressMutationVariables
>;
export const ForgotPasswordDocument = gql`
	mutation ForgotPassword($email: String!) {
		forgotPassword(email: $email)
	}
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
	ForgotPasswordMutation,
	ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
	baseOptions?: Apollo.MutationHookOptions<
		ForgotPasswordMutation,
		ForgotPasswordMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		ForgotPasswordMutation,
		ForgotPasswordMutationVariables
	>(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<
	typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult =
	Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
	ForgotPasswordMutation,
	ForgotPasswordMutationVariables
>;
export const LoginDocument = gql`
	mutation Login($password: String!, $email: String!) {
		login(password: $password, email: $email) {
			errors {
				...RegularError
			}
			user {
				...UserFragment
			}
		}
	}
	${RegularErrorFragmentDoc}
	${UserFragmentFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
	LoginMutation,
	LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(
	baseOptions?: Apollo.MutationHookOptions<
		LoginMutation,
		LoginMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
		LoginDocument,
		options
	);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
	LoginMutation,
	LoginMutationVariables
>;
export const LogoutDocument = gql`
	mutation Logout {
		logout
	}
`;
export type LogoutMutationFn = Apollo.MutationFunction<
	LogoutMutation,
	LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
	baseOptions?: Apollo.MutationHookOptions<
		LogoutMutation,
		LogoutMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
		LogoutDocument,
		options
	);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
	LogoutMutation,
	LogoutMutationVariables
>;
export const RegisterDocument = gql`
	mutation Register($options: RegisterInput!) {
		register(options: $options) {
			errors {
				...RegularError
			}
			user {
				...UserFragment
			}
		}
	}
	${RegularErrorFragmentDoc}
	${UserFragmentFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
	RegisterMutation,
	RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(
	baseOptions?: Apollo.MutationHookOptions<
		RegisterMutation,
		RegisterMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
		RegisterDocument,
		options
	);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
	RegisterMutation,
	RegisterMutationVariables
>;
export const ResendVerificationEmailDocument = gql`
	mutation ResendVerificationEmail($email: String!) {
		resendVerificationEmail(email: $email)
	}
`;
export type ResendVerificationEmailMutationFn = Apollo.MutationFunction<
	ResendVerificationEmailMutation,
	ResendVerificationEmailMutationVariables
>;

/**
 * __useResendVerificationEmailMutation__
 *
 * To run a mutation, you first call `useResendVerificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendVerificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendVerificationEmailMutation, { data, loading, error }] = useResendVerificationEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResendVerificationEmailMutation(
	baseOptions?: Apollo.MutationHookOptions<
		ResendVerificationEmailMutation,
		ResendVerificationEmailMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		ResendVerificationEmailMutation,
		ResendVerificationEmailMutationVariables
	>(ResendVerificationEmailDocument, options);
}
export type ResendVerificationEmailMutationHookResult = ReturnType<
	typeof useResendVerificationEmailMutation
>;
export type ResendVerificationEmailMutationResult =
	Apollo.MutationResult<ResendVerificationEmailMutation>;
export type ResendVerificationEmailMutationOptions = Apollo.BaseMutationOptions<
	ResendVerificationEmailMutation,
	ResendVerificationEmailMutationVariables
>;
export const UpdateAddressDocument = gql`
	mutation UpdateAddress($input: UpdateAddressInput!, $updateAddressId: Int!) {
		updateAddress(input: $input, id: $updateAddressId) {
			...AddressFragment
		}
	}
	${AddressFragmentFragmentDoc}
`;
export type UpdateAddressMutationFn = Apollo.MutationFunction<
	UpdateAddressMutation,
	UpdateAddressMutationVariables
>;

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *      updateAddressId: // value for 'updateAddressId'
 *   },
 * });
 */
export function useUpdateAddressMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateAddressMutation,
		UpdateAddressMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateAddressMutation,
		UpdateAddressMutationVariables
	>(UpdateAddressDocument, options);
}
export type UpdateAddressMutationHookResult = ReturnType<
	typeof useUpdateAddressMutation
>;
export type UpdateAddressMutationResult =
	Apollo.MutationResult<UpdateAddressMutation>;
export type UpdateAddressMutationOptions = Apollo.BaseMutationOptions<
	UpdateAddressMutation,
	UpdateAddressMutationVariables
>;
export const UpdatePasswordDocument = gql`
	mutation UpdatePassword(
		$confirmPassword: String!
		$newPassword: String!
		$currentPassword: String!
	) {
		updatePassword(
			confirmPassword: $confirmPassword
			newPassword: $newPassword
			currentPassword: $currentPassword
		) {
			errors {
				...RegularError
			}
			user {
				...UserFragment
			}
		}
	}
	${RegularErrorFragmentDoc}
	${UserFragmentFragmentDoc}
`;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<
	UpdatePasswordMutation,
	UpdatePasswordMutationVariables
>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      confirmPassword: // value for 'confirmPassword'
 *      newPassword: // value for 'newPassword'
 *      currentPassword: // value for 'currentPassword'
 *   },
 * });
 */
export function useUpdatePasswordMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdatePasswordMutation,
		UpdatePasswordMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdatePasswordMutation,
		UpdatePasswordMutationVariables
	>(UpdatePasswordDocument, options);
}
export type UpdatePasswordMutationHookResult = ReturnType<
	typeof useUpdatePasswordMutation
>;
export type UpdatePasswordMutationResult =
	Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<
	UpdatePasswordMutation,
	UpdatePasswordMutationVariables
>;
export const VerifyEmailDocument = gql`
	mutation VerifyEmail($token: String!) {
		verifyEmail(token: $token)
	}
`;
export type VerifyEmailMutationFn = Apollo.MutationFunction<
	VerifyEmailMutation,
	VerifyEmailMutationVariables
>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(
	baseOptions?: Apollo.MutationHookOptions<
		VerifyEmailMutation,
		VerifyEmailMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(
		VerifyEmailDocument,
		options
	);
}
export type VerifyEmailMutationHookResult = ReturnType<
	typeof useVerifyEmailMutation
>;
export type VerifyEmailMutationResult =
	Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<
	VerifyEmailMutation,
	VerifyEmailMutationVariables
>;
export const AddressDocument = gql`
	query Address {
		addresses {
			...AddressFragment
		}
	}
	${AddressFragmentFragmentDoc}
`;

/**
 * __useAddressQuery__
 *
 * To run a query within a React component, call `useAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressQuery({
 *   variables: {
 *   },
 * });
 */
export function useAddressQuery(
	baseOptions?: Apollo.QueryHookOptions<AddressQuery, AddressQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<AddressQuery, AddressQueryVariables>(
		AddressDocument,
		options
	);
}
export function useAddressLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<AddressQuery, AddressQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<AddressQuery, AddressQueryVariables>(
		AddressDocument,
		options
	);
}
export type AddressQueryHookResult = ReturnType<typeof useAddressQuery>;
export type AddressLazyQueryHookResult = ReturnType<typeof useAddressLazyQuery>;
export type AddressQueryResult = Apollo.QueryResult<
	AddressQuery,
	AddressQueryVariables
>;
export const HelloQueryDocument = gql`
	query HelloQuery {
		hello
	}
`;

/**
 * __useHelloQueryQuery__
 *
 * To run a query within a React component, call `useHelloQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQueryQuery(
	baseOptions?: Apollo.QueryHookOptions<
		HelloQueryQuery,
		HelloQueryQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<HelloQueryQuery, HelloQueryQueryVariables>(
		HelloQueryDocument,
		options
	);
}
export function useHelloQueryLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		HelloQueryQuery,
		HelloQueryQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<HelloQueryQuery, HelloQueryQueryVariables>(
		HelloQueryDocument,
		options
	);
}
export type HelloQueryQueryHookResult = ReturnType<typeof useHelloQueryQuery>;
export type HelloQueryLazyQueryHookResult = ReturnType<
	typeof useHelloQueryLazyQuery
>;
export type HelloQueryQueryResult = Apollo.QueryResult<
	HelloQueryQuery,
	HelloQueryQueryVariables
>;
export const MeDocument = gql`
	query Me {
		me {
			...UserFragment
		}
	}
	${UserFragmentFragmentDoc}
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
