import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  address_line1: Scalars['String'];
  address_line2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  phone_number: Scalars['String'];
  postal_code: Scalars['String'];
};

export type AddProductInput = {
  category_id: Scalars['Float'];
  desc: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type Address = {
  __typename?: 'Address';
  address_line1: Scalars['String'];
  address_line2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  created_at: Scalars['String'];
  id: Scalars['Int'];
  phone_number: Scalars['String'];
  postal_code: Scalars['String'];
  updated_at: Scalars['String'];
  userId: Scalars['Float'];
};

export type DiscountResponse = {
  __typename?: 'DiscountResponse';
  active: Scalars['Boolean'];
  desc: Scalars['String'];
  discount_percent: Scalars['Float'];
  name: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAddress: Address;
  addCategory: ProductCategory;
  addDiscount?: Maybe<DiscountResponse>;
  addProducts?: Maybe<ProductResponse>;
  changePassword: UserResponse;
  deleteAddress: Scalars['Boolean'];
  deleteCategory: Scalars['Boolean'];
  deleteDiscount?: Maybe<Scalars['Boolean']>;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  resendVerificationEmail: Scalars['Boolean'];
  updateAddress: Address;
  updateCategory: ProductCategory;
  updateDiscount?: Maybe<DiscountResponse>;
  updateProduct?: Maybe<ProductResponse>;
  updateProductDiscount?: Maybe<ProductResponse>;
  verifyEmail: Scalars['Boolean'];
};


export type MutationAddAddressArgs = {
  input: AddAddressInput;
};


export type MutationAddCategoryArgs = {
  desc: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddDiscountArgs = {
  options: AddProductInput;
};


export type MutationAddProductsArgs = {
  options: AddProductInput;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationDeleteAddressArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteDiscountArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationUpdateAddressArgs = {
  id: Scalars['Int'];
  input: UpdateAddressInput;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['Float'];
  options: UpdateCategoryInput;
};


export type MutationUpdateDiscountArgs = {
  options: UpdateDiscountInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['Float'];
  options: UpdateProductInput;
};


export type MutationUpdateProductDiscountArgs = {
  discount_id: Scalars['Float'];
  product_id: Scalars['Float'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  created_at: Scalars['String'];
  desc: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updated_at: Scalars['String'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  category_desc: Scalars['String'];
  category_name: Scalars['String'];
  desc: Scalars['String'];
  discount_active?: Maybe<Scalars['Boolean']>;
  discount_desc?: Maybe<Scalars['String']>;
  discount_name?: Maybe<Scalars['String']>;
  discount_percent?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  addresses?: Maybe<Array<Address>>;
  categories: Array<ProductCategory>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  products?: Maybe<Array<ProductResponse>>;
};

export type RegisterInput = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  phone_number: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateAddressInput = {
  address_line1?: InputMaybe<Scalars['String']>;
  address_line2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  postal_code?: InputMaybe<Scalars['String']>;
};

export type UpdateCategoryInput = {
  desc?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateDiscountInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  desc?: InputMaybe<Scalars['String']>;
  discount_percent?: InputMaybe<Scalars['Float']>;
  id: Scalars['Float'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateProductInput = {
  category_id?: InputMaybe<Scalars['Float']>;
  desc?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  quantity?: InputMaybe<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['String'];
  email: Scalars['String'];
  email_verified: Scalars['Boolean'];
  first_name: Scalars['String'];
  id: Scalars['Int'];
  last_name: Scalars['String'];
  phone_number: Scalars['String'];
  phone_number_verified: Scalars['Boolean'];
  updated_at: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type HelloQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQueryQuery = { __typename?: 'Query', hello: string };


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
export function useHelloQueryQuery(baseOptions?: Apollo.QueryHookOptions<HelloQueryQuery, HelloQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQueryQuery, HelloQueryQueryVariables>(HelloQueryDocument, options);
      }
export function useHelloQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQueryQuery, HelloQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQueryQuery, HelloQueryQueryVariables>(HelloQueryDocument, options);
        }
export type HelloQueryQueryHookResult = ReturnType<typeof useHelloQueryQuery>;
export type HelloQueryLazyQueryHookResult = ReturnType<typeof useHelloQueryLazyQuery>;
export type HelloQueryQueryResult = Apollo.QueryResult<HelloQueryQuery, HelloQueryQueryVariables>;