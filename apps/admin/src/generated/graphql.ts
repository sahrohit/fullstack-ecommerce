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
	address: Scalars["String"];
	city: Scalars["String"];
	country: Scalars["String"];
	created_at: Scalars["String"];
	id: Scalars["Int"];
	isDefault: Scalars["Boolean"];
	name: Scalars["String"];
	phone_number: Scalars["String"];
	state: Scalars["String"];
	type: Scalars["String"];
	updated_at: Scalars["String"];
	userId: Scalars["Float"];
	zip: Scalars["String"];
};

export type AddressInput = {
	address: Scalars["String"];
	city: Scalars["String"];
	country: Scalars["String"];
	name: Scalars["String"];
	phone_number: Scalars["String"];
	state: Scalars["String"];
	type: Scalars["String"];
	zip: Scalars["String"];
};

export type Cart = {
	__typename?: "Cart";
	created_at: Scalars["String"];
	id: Scalars["Int"];
	inventory?: Maybe<ProductInventory>;
	inventoryId: Scalars["Int"];
	quantity: Scalars["Int"];
	updated_at: Scalars["String"];
	userId: Scalars["Int"];
};

export type CreateOrderInput = {
	addressId: Scalars["Float"];
	promoCode: Scalars["String"];
	shippingMethod: Scalars["String"];
};

export type CreatePaymentInput = {
	orderId: Scalars["String"];
	pidx: Scalars["String"];
	promoCode: Scalars["String"];
	provider: Scalars["String"];
};

export type Discount = {
	__typename?: "Discount";
	active: Scalars["Boolean"];
	created_at: Scalars["String"];
	desc: Scalars["String"];
	discount_percent: Scalars["Float"];
	id: Scalars["Int"];
	name: Scalars["String"];
	updated_at: Scalars["String"];
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
	addToCart: Cart;
	changePassword: UserResponse;
	clearCart: Scalars["Boolean"];
	createOrder: Scalars["String"];
	createPayment: PaymentDetail;
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
	updateStatus: OrderDetail;
	verifyEmail: Scalars["Boolean"];
};

export type MutationAddAddressArgs = {
	input: AddressInput;
};

export type MutationAddCategoryArgs = {
	desc: Scalars["String"];
	identifier: Scalars["String"];
	name: Scalars["String"];
};

export type MutationAddDiscountArgs = {
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

export type MutationCreateOrderArgs = {
	options: CreateOrderInput;
};

export type MutationCreatePaymentArgs = {
	options: CreatePaymentInput;
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
	input: AddressInput;
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

export type MutationUpdateStatusArgs = {
	orderId: Scalars["String"];
	pidx: Scalars["String"];
};

export type MutationVerifyEmailArgs = {
	token: Scalars["String"];
};

export type OrderDetail = {
	__typename?: "OrderDetail";
	address: Address;
	addressId: Scalars["Int"];
	created_at: Scalars["String"];
	id: Scalars["String"];
	orderitems: Array<OrderItem>;
	paymentdetails?: Maybe<Array<PaymentDetail>>;
	promo?: Maybe<Promo>;
	promoId?: Maybe<Scalars["Int"]>;
	status: Scalars["String"];
	updated_at: Scalars["String"];
	userId: Scalars["Int"];
};

export type OrderItem = {
	__typename?: "OrderItem";
	created_at: Scalars["String"];
	id: Scalars["Int"];
	inventory?: Maybe<ProductInventory>;
	inventoryId: Scalars["Int"];
	orderId: Scalars["String"];
	orderdetail: OrderDetail;
	quantity: Scalars["Int"];
	updated_at: Scalars["String"];
};

export type PaymentDetail = {
	__typename?: "PaymentDetail";
	amount: Scalars["Float"];
	created_at: Scalars["String"];
	id: Scalars["String"];
	orderId: Scalars["String"];
	orderdetail: OrderDetail;
	provider: Scalars["String"];
	status: Scalars["String"];
	transactionId?: Maybe<Scalars["String"]>;
	updated_at: Scalars["String"];
};

export type Product = {
	__typename?: "Product";
	category: ProductCategory;
	categoryId: Scalars["Int"];
	created_at: Scalars["String"];
	desc: Scalars["String"];
	discount?: Maybe<Discount>;
	discountId?: Maybe<Scalars["Float"]>;
	id: Scalars["Int"];
	identifier: Scalars["String"];
	images: Array<ProductImage>;
	inventories?: Maybe<Array<ProductInventory>>;
	name: Scalars["String"];
	updated_at: Scalars["String"];
};

export type ProductCategory = {
	__typename?: "ProductCategory";
	created_at: Scalars["String"];
	desc: Scalars["String"];
	id: Scalars["Int"];
	identifier: Scalars["String"];
	imageURL: Scalars["String"];
	name: Scalars["String"];
	products?: Maybe<Array<Product>>;
	updated_at: Scalars["String"];
};

export type ProductCategoryWithProductCount = {
	__typename?: "ProductCategoryWithProductCount";
	created_at: Scalars["String"];
	desc: Scalars["String"];
	id: Scalars["Int"];
	identifier: Scalars["String"];
	imageURL: Scalars["String"];
	name: Scalars["String"];
	product_count: Scalars["Int"];
	products?: Maybe<Array<Product>>;
	updated_at: Scalars["String"];
};

export type ProductImage = {
	__typename?: "ProductImage";
	created_at: Scalars["String"];
	id: Scalars["Int"];
	imageURL: Scalars["String"];
	productId: Scalars["Float"];
	updated_at: Scalars["String"];
};

export type ProductImageInput = {
	imageURL: Scalars["String"];
};

export type ProductInventory = {
	__typename?: "ProductInventory";
	carts?: Maybe<Array<Cart>>;
	created_at: Scalars["String"];
	inventory_id: Scalars["Int"];
	isPublished: Scalars["Boolean"];
	orderitems?: Maybe<Array<OrderItem>>;
	price: Scalars["Int"];
	product: Product;
	quantity: Scalars["Int"];
	updated_at: Scalars["String"];
	variants?: Maybe<Array<ProductVariant>>;
};

export type ProductVariant = {
	__typename?: "ProductVariant";
	created_at: Scalars["String"];
	product_variant_id: Scalars["Int"];
	updated_at: Scalars["String"];
	variant_value: VariantValue;
};

export type ProductVariantInput = {
	price: Scalars["Float"];
	quantity: Scalars["Int"];
	variant: Scalars["String"];
};

export type Promo = {
	__typename?: "Promo";
	code: Scalars["String"];
	created_at: Scalars["String"];
	discount_amount: Scalars["Int"];
	expires_at: Scalars["String"];
	id: Scalars["Int"];
	isDiscountAmountPercentage: Scalars["Boolean"];
	name: Scalars["String"];
	order?: Maybe<OrderDetail>;
	starts_at: Scalars["String"];
	updated_at: Scalars["String"];
};

export type Query = {
	__typename?: "Query";
	addresses?: Maybe<Array<Address>>;
	categories: Array<ProductCategory>;
	categoriesSummary?: Maybe<Array<ProductCategoryWithProductCount>>;
	fetchCartItems?: Maybe<Array<Cart>>;
	hello: Scalars["String"];
	me?: Maybe<User>;
	orderById?: Maybe<OrderDetail>;
	orders?: Maybe<Array<OrderDetail>>;
	product?: Maybe<Product>;
	products?: Maybe<Array<Product>>;
	promo?: Maybe<Promo>;
	roles: Array<UserRole>;
};

export type QueryOrderByIdArgs = {
	orderId: Scalars["String"];
};

export type QueryProductArgs = {
	identifier: Scalars["String"];
};

export type QueryPromoArgs = {
	code: Scalars["String"];
};

export type RegisterInput = {
	email: Scalars["String"];
	first_name: Scalars["String"];
	last_name: Scalars["String"];
	password: Scalars["String"];
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

export type Variant = {
	__typename?: "Variant";
	created_at: Scalars["String"];
	updated_at: Scalars["String"];
	variant_id: Scalars["Int"];
	variant_name: Scalars["String"];
};

export type VariantValue = {
	__typename?: "VariantValue";
	created_at: Scalars["String"];
	updated_at: Scalars["String"];
	value: Scalars["String"];
	value_id: Scalars["Int"];
	variant: Variant;
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
