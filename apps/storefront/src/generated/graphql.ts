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

export type Favourite = {
	__typename?: "Favourite";
	created_at: Scalars["String"];
	id: Scalars["Int"];
	product: Product;
	productId: Scalars["Int"];
	updated_at: Scalars["String"];
	user?: Maybe<User>;
	userId: Scalars["Int"];
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
	addToFavourite: Favourite;
	changePassword: UserResponse;
	clearCart: Scalars["Boolean"];
	createOrder: Scalars["String"];
	createPayment: Scalars["String"];
	deleteAddress: Scalars["Boolean"];
	deleteCategory: Scalars["Boolean"];
	deleteDiscount?: Maybe<Scalars["Boolean"]>;
	deleteFromCart: Scalars["Boolean"];
	forgotPassword: Scalars["Boolean"];
	login: UserResponse;
	logout: Scalars["Boolean"];
	register: UserResponse;
	removeFromFavourite: Scalars["Boolean"];
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

export type MutationAddToFavouriteArgs = {
	productId: Scalars["Int"];
};

export type MutationChangePasswordArgs = {
	newPassword: Scalars["String"];
	token: Scalars["String"];
};

export type MutationCreateOrderArgs = {
	options: CreateOrderInput;
};

export type MutationCreatePaymentArgs = {
	orderId: Scalars["String"];
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

export type MutationRemoveFromFavouriteArgs = {
	productId: Scalars["Int"];
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
	amount: Scalars["Int"];
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
	favourites?: Maybe<Array<Favourite>>;
	id: Scalars["Int"];
	identifier: Scalars["String"];
	images: Array<ProductImage>;
	inventories?: Maybe<Array<ProductInventory>>;
	name: Scalars["String"];
	reviews: Array<ProductReview>;
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
	sequence: Scalars["Float"];
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

export type ProductReview = {
	__typename?: "ProductReview";
	created_at: Scalars["String"];
	desc: Scalars["String"];
	id: Scalars["Int"];
	isAnonymous: Scalars["Boolean"];
	productId: Scalars["Int"];
	rating: Scalars["Float"];
	review: Scalars["String"];
	updated_at: Scalars["String"];
	user?: Maybe<User>;
	userId: Scalars["Int"];
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
	favourites: Array<Favourite>;
	favouritesWithProduct: Array<Favourite>;
	fetchCartItems?: Maybe<Array<Cart>>;
	hello: Scalars["String"];
	me?: Maybe<User>;
	orderById?: Maybe<OrderDetail>;
	orders?: Maybe<Array<OrderDetail>>;
	product?: Maybe<Product>;
	products?: Maybe<Array<Product>>;
	promo?: Maybe<Promo>;
	reviews?: Maybe<Array<ProductReview>>;
	roles: Array<UserRole>;
	variants: Array<Variant>;
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

export type QueryReviewsArgs = {
	productId: Scalars["Int"];
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
	variant_values: Array<VariantValue>;
};

export type VariantValue = {
	__typename?: "VariantValue";
	created_at: Scalars["String"];
	updated_at: Scalars["String"];
	value: Scalars["String"];
	value_id: Scalars["Int"];
	variant: Variant;
};

export type AddressFragmentFragment = {
	__typename?: "Address";
	id: number;
	type: string;
	isDefault: boolean;
	name: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	phone_number: string;
	userId: number;
	created_at: string;
	updated_at: string;
};

export type CartFragmentFragment = {
	__typename?: "Cart";
	id: number;
	userId: number;
	quantity: number;
	inventoryId: number;
	created_at: string;
	updated_at: string;
};

export type CategoryFragmentFragment = {
	__typename?: "ProductCategory";
	id: number;
	name: string;
	identifier: string;
	desc: string;
	imageURL: string;
	created_at: string;
	updated_at: string;
};

export type DiscountFragmentFragment = {
	__typename?: "Discount";
	id: number;
	name: string;
	desc: string;
	discount_percent: number;
	active: boolean;
	created_at: string;
	updated_at: string;
};

export type ImageFragmentFragment = {
	__typename?: "ProductImage";
	id: number;
	imageURL: string;
	productId: number;
	sequence: number;
	created_at: string;
	updated_at: string;
};

export type OrderDetailFragmentFragment = {
	__typename?: "OrderDetail";
	id: string;
	userId: number;
	addressId: number;
	promoId?: number | null;
	status: string;
	created_at: string;
	updated_at: string;
	address: {
		__typename?: "Address";
		id: number;
		type: string;
		isDefault: boolean;
		name: string;
		address: string;
		city: string;
		state: string;
		zip: string;
		country: string;
		phone_number: string;
		userId: number;
		created_at: string;
		updated_at: string;
	};
	promo?: {
		__typename?: "Promo";
		id: number;
		name: string;
		code: string;
		discount_amount: number;
		isDiscountAmountPercentage: boolean;
		starts_at: string;
		expires_at: string;
		created_at: string;
		updated_at: string;
	} | null;
	paymentdetails?: Array<{
		__typename?: "PaymentDetail";
		orderId: string;
		amount: number;
		provider: string;
		status: string;
		created_at: string;
		updated_at: string;
	}> | null;
	orderitems: Array<{
		__typename?: "OrderItem";
		id: number;
		quantity: number;
		created_at: string;
		updated_at: string;
		inventory?: {
			__typename?: "ProductInventory";
			inventory_id: number;
			quantity: number;
			price: number;
			created_at: string;
			updated_at: string;
			product: {
				__typename?: "Product";
				id: number;
				identifier: string;
				name: string;
				desc: string;
				categoryId: number;
				discountId?: number | null;
				created_at: string;
				updated_at: string;
				images: Array<{
					__typename?: "ProductImage";
					id: number;
					imageURL: string;
					productId: number;
					sequence: number;
					created_at: string;
					updated_at: string;
				}>;
				category: {
					__typename?: "ProductCategory";
					id: number;
					name: string;
					identifier: string;
					desc: string;
					imageURL: string;
					created_at: string;
					updated_at: string;
				};
				discount?: {
					__typename?: "Discount";
					id: number;
					name: string;
					desc: string;
					discount_percent: number;
					active: boolean;
					created_at: string;
					updated_at: string;
				} | null;
			};
			variants?: Array<{
				__typename?: "ProductVariant";
				product_variant_id: number;
				created_at: string;
				updated_at: string;
				variant_value: {
					__typename?: "VariantValue";
					value_id: number;
					value: string;
					created_at: string;
					updated_at: string;
					variant: {
						__typename?: "Variant";
						variant_id: number;
						variant_name: string;
						created_at: string;
						updated_at: string;
					};
				};
			}> | null;
			carts?: Array<{
				__typename?: "Cart";
				id: number;
				userId: number;
				quantity: number;
				inventoryId: number;
				created_at: string;
				updated_at: string;
			}> | null;
		} | null;
	}>;
};

export type OrderItemFragmentFragment = {
	__typename?: "OrderItem";
	id: number;
	quantity: number;
	created_at: string;
	updated_at: string;
	inventory?: {
		__typename?: "ProductInventory";
		inventory_id: number;
		quantity: number;
		price: number;
		created_at: string;
		updated_at: string;
		product: {
			__typename?: "Product";
			id: number;
			identifier: string;
			name: string;
			desc: string;
			categoryId: number;
			discountId?: number | null;
			created_at: string;
			updated_at: string;
			images: Array<{
				__typename?: "ProductImage";
				id: number;
				imageURL: string;
				productId: number;
				sequence: number;
				created_at: string;
				updated_at: string;
			}>;
			category: {
				__typename?: "ProductCategory";
				id: number;
				name: string;
				identifier: string;
				desc: string;
				imageURL: string;
				created_at: string;
				updated_at: string;
			};
			discount?: {
				__typename?: "Discount";
				id: number;
				name: string;
				desc: string;
				discount_percent: number;
				active: boolean;
				created_at: string;
				updated_at: string;
			} | null;
		};
		variants?: Array<{
			__typename?: "ProductVariant";
			product_variant_id: number;
			created_at: string;
			updated_at: string;
			variant_value: {
				__typename?: "VariantValue";
				value_id: number;
				value: string;
				created_at: string;
				updated_at: string;
				variant: {
					__typename?: "Variant";
					variant_id: number;
					variant_name: string;
					created_at: string;
					updated_at: string;
				};
			};
		}> | null;
		carts?: Array<{
			__typename?: "Cart";
			id: number;
			userId: number;
			quantity: number;
			inventoryId: number;
			created_at: string;
			updated_at: string;
		}> | null;
	} | null;
};

export type ProductFragmentFragment = {
	__typename?: "Product";
	id: number;
	identifier: string;
	name: string;
	desc: string;
	categoryId: number;
	discountId?: number | null;
	created_at: string;
	updated_at: string;
	images: Array<{
		__typename?: "ProductImage";
		id: number;
		imageURL: string;
		productId: number;
		sequence: number;
		created_at: string;
		updated_at: string;
	}>;
	category: {
		__typename?: "ProductCategory";
		id: number;
		name: string;
		identifier: string;
		desc: string;
		imageURL: string;
		created_at: string;
		updated_at: string;
	};
	inventories?: Array<{
		__typename?: "ProductInventory";
		inventory_id: number;
		quantity: number;
		price: number;
		created_at: string;
		updated_at: string;
		variants?: Array<{
			__typename?: "ProductVariant";
			product_variant_id: number;
			created_at: string;
			updated_at: string;
			variant_value: {
				__typename?: "VariantValue";
				value_id: number;
				value: string;
				created_at: string;
				updated_at: string;
				variant: {
					__typename?: "Variant";
					variant_id: number;
					variant_name: string;
					created_at: string;
					updated_at: string;
				};
			};
		}> | null;
		carts?: Array<{
			__typename?: "Cart";
			id: number;
			userId: number;
			quantity: number;
			inventoryId: number;
			created_at: string;
			updated_at: string;
		}> | null;
	}> | null;
	discount?: {
		__typename?: "Discount";
		id: number;
		name: string;
		desc: string;
		discount_percent: number;
		active: boolean;
		created_at: string;
		updated_at: string;
	} | null;
};

export type ProductInventoryFragmentFragment = {
	__typename?: "ProductInventory";
	inventory_id: number;
	quantity: number;
	price: number;
	created_at: string;
	updated_at: string;
	variants?: Array<{
		__typename?: "ProductVariant";
		product_variant_id: number;
		created_at: string;
		updated_at: string;
		variant_value: {
			__typename?: "VariantValue";
			value_id: number;
			value: string;
			created_at: string;
			updated_at: string;
			variant: {
				__typename?: "Variant";
				variant_id: number;
				variant_name: string;
				created_at: string;
				updated_at: string;
			};
		};
	}> | null;
	carts?: Array<{
		__typename?: "Cart";
		id: number;
		userId: number;
		quantity: number;
		inventoryId: number;
		created_at: string;
		updated_at: string;
	}> | null;
};

export type ProductVariantFragmentFragment = {
	__typename?: "ProductVariant";
	product_variant_id: number;
	created_at: string;
	updated_at: string;
	variant_value: {
		__typename?: "VariantValue";
		value_id: number;
		value: string;
		created_at: string;
		updated_at: string;
		variant: {
			__typename?: "Variant";
			variant_id: number;
			variant_name: string;
			created_at: string;
			updated_at: string;
		};
	};
};

export type PromoFragmentFragment = {
	__typename?: "Promo";
	id: number;
	name: string;
	code: string;
	discount_amount: number;
	isDiscountAmountPercentage: boolean;
	starts_at: string;
	expires_at: string;
	created_at: string;
	updated_at: string;
};

export type RegularErrorFragment = {
	__typename?: "FieldError";
	field: string;
	message: string;
};

export type ReviewFragmentFragment = {
	__typename?: "ProductReview";
	id: number;
	productId: number;
	userId: number;
	rating: number;
	review: string;
	isAnonymous: boolean;
	created_at: string;
	updated_at: string;
	user?: { __typename?: "User"; first_name: string; last_name: string } | null;
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
	imageUrl?: string | null;
	roleId: number;
	created_at: string;
	updated_at: string;
};

export type VariantFragmentFragment = {
	__typename?: "Variant";
	variant_id: number;
	variant_name: string;
	created_at: string;
	updated_at: string;
};

export type VariantValueFragmentFragment = {
	__typename?: "VariantValue";
	value_id: number;
	value: string;
	created_at: string;
	updated_at: string;
	variant: {
		__typename?: "Variant";
		variant_id: number;
		variant_name: string;
		created_at: string;
		updated_at: string;
	};
};

export type AddAddressMutationVariables = Exact<{
	input: AddressInput;
}>;

export type AddAddressMutation = {
	__typename?: "Mutation";
	addAddress: {
		__typename?: "Address";
		id: number;
		type: string;
		isDefault: boolean;
		name: string;
		address: string;
		city: string;
		state: string;
		zip: string;
		country: string;
		phone_number: string;
		userId: number;
		created_at: string;
		updated_at: string;
	};
};

export type DeleteAddressMutationVariables = Exact<{
	deleteAddressId: Scalars["Int"];
}>;

export type DeleteAddressMutation = {
	__typename?: "Mutation";
	deleteAddress: boolean;
};

export type UpdateAddressMutationVariables = Exact<{
	input: AddressInput;
	updateAddressId: Scalars["Int"];
}>;

export type UpdateAddressMutation = {
	__typename?: "Mutation";
	updateAddress: {
		__typename?: "Address";
		id: number;
		type: string;
		isDefault: boolean;
		name: string;
		address: string;
		city: string;
		state: string;
		zip: string;
		country: string;
		phone_number: string;
		userId: number;
		created_at: string;
		updated_at: string;
	};
};

export type AddToCartMutationVariables = Exact<{
	quantity: Scalars["Int"];
	inventoryId: Scalars["Int"];
}>;

export type AddToCartMutation = {
	__typename?: "Mutation";
	addToCart: {
		__typename?: "Cart";
		id: number;
		userId: number;
		quantity: number;
		inventoryId: number;
		created_at: string;
		updated_at: string;
	};
};

export type ClearCartMutationVariables = Exact<{ [key: string]: never }>;

export type ClearCartMutation = { __typename?: "Mutation"; clearCart: boolean };

export type DeleteFromCartMutationVariables = Exact<{
	quantity: Scalars["Int"];
	inventoryId: Scalars["Int"];
}>;

export type DeleteFromCartMutation = {
	__typename?: "Mutation";
	deleteFromCart: boolean;
};

export type UpdateCartMutationVariables = Exact<{
	quantity: Scalars["Int"];
	inventoryId: Scalars["Int"];
}>;

export type UpdateCartMutation = {
	__typename?: "Mutation";
	updateCart: {
		__typename?: "Cart";
		id: number;
		userId: number;
		quantity: number;
		inventoryId: number;
		created_at: string;
		updated_at: string;
		inventory?: {
			__typename?: "ProductInventory";
			inventory_id: number;
			quantity: number;
			price: number;
			created_at: string;
			updated_at: string;
			variants?: Array<{
				__typename?: "ProductVariant";
				product_variant_id: number;
				created_at: string;
				updated_at: string;
				variant_value: {
					__typename?: "VariantValue";
					value_id: number;
					value: string;
					created_at: string;
					updated_at: string;
					variant: {
						__typename?: "Variant";
						variant_id: number;
						variant_name: string;
						created_at: string;
						updated_at: string;
					};
				};
			}> | null;
			carts?: Array<{
				__typename?: "Cart";
				id: number;
				userId: number;
				quantity: number;
				inventoryId: number;
				created_at: string;
				updated_at: string;
			}> | null;
		} | null;
	};
};

export type AddToFavouriteMutationVariables = Exact<{
	productId: Scalars["Int"];
}>;

export type AddToFavouriteMutation = {
	__typename?: "Mutation";
	addToFavourite: {
		__typename?: "Favourite";
		id: number;
		userId: number;
		productId: number;
		created_at: string;
		updated_at: string;
	};
};

export type RemoveFromFavouriteMutationVariables = Exact<{
	productId: Scalars["Int"];
}>;

export type RemoveFromFavouriteMutation = {
	__typename?: "Mutation";
	removeFromFavourite: boolean;
};

export type CreateOrderMutationVariables = Exact<{
	options: CreateOrderInput;
}>;

export type CreateOrderMutation = {
	__typename?: "Mutation";
	createOrder: string;
};

export type CreatePaymentMutationVariables = Exact<{
	orderId: Scalars["String"];
}>;

export type CreatePaymentMutation = {
	__typename?: "Mutation";
	createPayment: string;
};

export type UpdateStatusMutationVariables = Exact<{
	pidx: Scalars["String"];
	orderId: Scalars["String"];
}>;

export type UpdateStatusMutation = {
	__typename?: "Mutation";
	updateStatus: {
		__typename?: "OrderDetail";
		id: string;
		userId: number;
		addressId: number;
		promoId?: number | null;
		status: string;
		created_at: string;
		updated_at: string;
		address: {
			__typename?: "Address";
			id: number;
			type: string;
			isDefault: boolean;
			name: string;
			address: string;
			city: string;
			state: string;
			zip: string;
			country: string;
			phone_number: string;
			userId: number;
			created_at: string;
			updated_at: string;
		};
		promo?: {
			__typename?: "Promo";
			id: number;
			name: string;
			code: string;
			discount_amount: number;
			isDiscountAmountPercentage: boolean;
			starts_at: string;
			expires_at: string;
			created_at: string;
			updated_at: string;
		} | null;
		paymentdetails?: Array<{
			__typename?: "PaymentDetail";
			orderId: string;
			amount: number;
			provider: string;
			status: string;
			created_at: string;
			updated_at: string;
		}> | null;
		orderitems: Array<{
			__typename?: "OrderItem";
			id: number;
			quantity: number;
			created_at: string;
			updated_at: string;
			inventory?: {
				__typename?: "ProductInventory";
				inventory_id: number;
				quantity: number;
				price: number;
				created_at: string;
				updated_at: string;
				product: {
					__typename?: "Product";
					id: number;
					identifier: string;
					name: string;
					desc: string;
					categoryId: number;
					discountId?: number | null;
					created_at: string;
					updated_at: string;
					images: Array<{
						__typename?: "ProductImage";
						id: number;
						imageURL: string;
						productId: number;
						sequence: number;
						created_at: string;
						updated_at: string;
					}>;
					category: {
						__typename?: "ProductCategory";
						id: number;
						name: string;
						identifier: string;
						desc: string;
						imageURL: string;
						created_at: string;
						updated_at: string;
					};
					discount?: {
						__typename?: "Discount";
						id: number;
						name: string;
						desc: string;
						discount_percent: number;
						active: boolean;
						created_at: string;
						updated_at: string;
					} | null;
				};
				variants?: Array<{
					__typename?: "ProductVariant";
					product_variant_id: number;
					created_at: string;
					updated_at: string;
					variant_value: {
						__typename?: "VariantValue";
						value_id: number;
						value: string;
						created_at: string;
						updated_at: string;
						variant: {
							__typename?: "Variant";
							variant_id: number;
							variant_name: string;
							created_at: string;
							updated_at: string;
						};
					};
				}> | null;
				carts?: Array<{
					__typename?: "Cart";
					id: number;
					userId: number;
					quantity: number;
					inventoryId: number;
					created_at: string;
					updated_at: string;
				}> | null;
			} | null;
		}>;
	};
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
			imageUrl?: string | null;
			roleId: number;
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
			imageUrl?: string | null;
			roleId: number;
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

export type VerifyEmailMutationVariables = Exact<{
	token: Scalars["String"];
}>;

export type VerifyEmailMutation = {
	__typename?: "Mutation";
	verifyEmail: boolean;
};

export type AddressesQueryVariables = Exact<{ [key: string]: never }>;

export type AddressesQuery = {
	__typename?: "Query";
	addresses?: Array<{
		__typename?: "Address";
		id: number;
		type: string;
		isDefault: boolean;
		name: string;
		address: string;
		city: string;
		state: string;
		zip: string;
		country: string;
		phone_number: string;
		userId: number;
		created_at: string;
		updated_at: string;
	}> | null;
};

export type FetchCartItemsQueryVariables = Exact<{ [key: string]: never }>;

export type FetchCartItemsQuery = {
	__typename?: "Query";
	fetchCartItems?: Array<{
		__typename?: "Cart";
		id: number;
		userId: number;
		quantity: number;
		inventoryId: number;
		created_at: string;
		updated_at: string;
		inventory?: {
			__typename?: "ProductInventory";
			inventory_id: number;
			quantity: number;
			price: number;
			created_at: string;
			updated_at: string;
			product: {
				__typename?: "Product";
				id: number;
				identifier: string;
				name: string;
				desc: string;
				categoryId: number;
				discountId?: number | null;
				created_at: string;
				updated_at: string;
				images: Array<{
					__typename?: "ProductImage";
					id: number;
					imageURL: string;
					productId: number;
					sequence: number;
					created_at: string;
					updated_at: string;
				}>;
				category: {
					__typename?: "ProductCategory";
					id: number;
					name: string;
					identifier: string;
					desc: string;
					imageURL: string;
					created_at: string;
					updated_at: string;
				};
				discount?: {
					__typename?: "Discount";
					id: number;
					name: string;
					desc: string;
					discount_percent: number;
					active: boolean;
					created_at: string;
					updated_at: string;
				} | null;
			};
			variants?: Array<{
				__typename?: "ProductVariant";
				product_variant_id: number;
				created_at: string;
				updated_at: string;
				variant_value: {
					__typename?: "VariantValue";
					value_id: number;
					value: string;
					created_at: string;
					updated_at: string;
					variant: {
						__typename?: "Variant";
						variant_id: number;
						variant_name: string;
						created_at: string;
						updated_at: string;
					};
				};
			}> | null;
			carts?: Array<{
				__typename?: "Cart";
				id: number;
				userId: number;
				quantity: number;
				inventoryId: number;
				created_at: string;
				updated_at: string;
			}> | null;
		} | null;
	}> | null;
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = {
	__typename?: "Query";
	categories: Array<{
		__typename?: "ProductCategory";
		id: number;
		name: string;
		identifier: string;
		desc: string;
		imageURL: string;
		created_at: string;
		updated_at: string;
	}>;
};

export type FavouritesQueryVariables = Exact<{ [key: string]: never }>;

export type FavouritesQuery = {
	__typename?: "Query";
	favourites: Array<{
		__typename?: "Favourite";
		id: number;
		userId: number;
		productId: number;
		created_at: string;
		updated_at: string;
	}>;
};

export type FavouritesWithProductQueryVariables = Exact<{
	[key: string]: never;
}>;

export type FavouritesWithProductQuery = {
	__typename?: "Query";
	favouritesWithProduct: Array<{
		__typename?: "Favourite";
		id: number;
		userId: number;
		productId: number;
		created_at: string;
		updated_at: string;
		product: {
			__typename?: "Product";
			id: number;
			identifier: string;
			name: string;
			desc: string;
			categoryId: number;
			discountId?: number | null;
			created_at: string;
			updated_at: string;
			images: Array<{
				__typename?: "ProductImage";
				id: number;
				imageURL: string;
				productId: number;
				sequence: number;
				created_at: string;
				updated_at: string;
			}>;
			category: {
				__typename?: "ProductCategory";
				id: number;
				name: string;
				identifier: string;
				desc: string;
				imageURL: string;
				created_at: string;
				updated_at: string;
			};
			inventories?: Array<{
				__typename?: "ProductInventory";
				inventory_id: number;
				quantity: number;
				price: number;
				created_at: string;
				updated_at: string;
				variants?: Array<{
					__typename?: "ProductVariant";
					product_variant_id: number;
					created_at: string;
					updated_at: string;
					variant_value: {
						__typename?: "VariantValue";
						value_id: number;
						value: string;
						created_at: string;
						updated_at: string;
						variant: {
							__typename?: "Variant";
							variant_id: number;
							variant_name: string;
							created_at: string;
							updated_at: string;
						};
					};
				}> | null;
				carts?: Array<{
					__typename?: "Cart";
					id: number;
					userId: number;
					quantity: number;
					inventoryId: number;
					created_at: string;
					updated_at: string;
				}> | null;
			}> | null;
			discount?: {
				__typename?: "Discount";
				id: number;
				name: string;
				desc: string;
				discount_percent: number;
				active: boolean;
				created_at: string;
				updated_at: string;
			} | null;
		};
	}>;
};

export type OrderByIdQueryVariables = Exact<{
	orderId: Scalars["String"];
}>;

export type OrderByIdQuery = {
	__typename?: "Query";
	orderById?: {
		__typename?: "OrderDetail";
		id: string;
		userId: number;
		addressId: number;
		promoId?: number | null;
		status: string;
		created_at: string;
		updated_at: string;
		address: {
			__typename?: "Address";
			id: number;
			type: string;
			isDefault: boolean;
			name: string;
			address: string;
			city: string;
			state: string;
			zip: string;
			country: string;
			phone_number: string;
			userId: number;
			created_at: string;
			updated_at: string;
		};
		promo?: {
			__typename?: "Promo";
			id: number;
			name: string;
			code: string;
			discount_amount: number;
			isDiscountAmountPercentage: boolean;
			starts_at: string;
			expires_at: string;
			created_at: string;
			updated_at: string;
		} | null;
		paymentdetails?: Array<{
			__typename?: "PaymentDetail";
			orderId: string;
			amount: number;
			provider: string;
			status: string;
			created_at: string;
			updated_at: string;
		}> | null;
		orderitems: Array<{
			__typename?: "OrderItem";
			id: number;
			quantity: number;
			created_at: string;
			updated_at: string;
			inventory?: {
				__typename?: "ProductInventory";
				inventory_id: number;
				quantity: number;
				price: number;
				created_at: string;
				updated_at: string;
				product: {
					__typename?: "Product";
					id: number;
					identifier: string;
					name: string;
					desc: string;
					categoryId: number;
					discountId?: number | null;
					created_at: string;
					updated_at: string;
					images: Array<{
						__typename?: "ProductImage";
						id: number;
						imageURL: string;
						productId: number;
						sequence: number;
						created_at: string;
						updated_at: string;
					}>;
					category: {
						__typename?: "ProductCategory";
						id: number;
						name: string;
						identifier: string;
						desc: string;
						imageURL: string;
						created_at: string;
						updated_at: string;
					};
					discount?: {
						__typename?: "Discount";
						id: number;
						name: string;
						desc: string;
						discount_percent: number;
						active: boolean;
						created_at: string;
						updated_at: string;
					} | null;
				};
				variants?: Array<{
					__typename?: "ProductVariant";
					product_variant_id: number;
					created_at: string;
					updated_at: string;
					variant_value: {
						__typename?: "VariantValue";
						value_id: number;
						value: string;
						created_at: string;
						updated_at: string;
						variant: {
							__typename?: "Variant";
							variant_id: number;
							variant_name: string;
							created_at: string;
							updated_at: string;
						};
					};
				}> | null;
				carts?: Array<{
					__typename?: "Cart";
					id: number;
					userId: number;
					quantity: number;
					inventoryId: number;
					created_at: string;
					updated_at: string;
				}> | null;
			} | null;
		}>;
	} | null;
};

export type OrdersQueryVariables = Exact<{ [key: string]: never }>;

export type OrdersQuery = {
	__typename?: "Query";
	orders?: Array<{
		__typename?: "OrderDetail";
		id: string;
		userId: number;
		addressId: number;
		promoId?: number | null;
		status: string;
		created_at: string;
		updated_at: string;
		address: {
			__typename?: "Address";
			id: number;
			type: string;
			isDefault: boolean;
			name: string;
			address: string;
			city: string;
			state: string;
			zip: string;
			country: string;
			phone_number: string;
			userId: number;
			created_at: string;
			updated_at: string;
		};
		promo?: {
			__typename?: "Promo";
			id: number;
			name: string;
			code: string;
			discount_amount: number;
			isDiscountAmountPercentage: boolean;
			starts_at: string;
			expires_at: string;
			created_at: string;
			updated_at: string;
		} | null;
		paymentdetails?: Array<{
			__typename?: "PaymentDetail";
			orderId: string;
			amount: number;
			provider: string;
			status: string;
			created_at: string;
			updated_at: string;
		}> | null;
		orderitems: Array<{
			__typename?: "OrderItem";
			id: number;
			quantity: number;
			created_at: string;
			updated_at: string;
			inventory?: {
				__typename?: "ProductInventory";
				inventory_id: number;
				quantity: number;
				price: number;
				created_at: string;
				updated_at: string;
				product: {
					__typename?: "Product";
					id: number;
					identifier: string;
					name: string;
					desc: string;
					categoryId: number;
					discountId?: number | null;
					created_at: string;
					updated_at: string;
					images: Array<{
						__typename?: "ProductImage";
						id: number;
						imageURL: string;
						productId: number;
						sequence: number;
						created_at: string;
						updated_at: string;
					}>;
					category: {
						__typename?: "ProductCategory";
						id: number;
						name: string;
						identifier: string;
						desc: string;
						imageURL: string;
						created_at: string;
						updated_at: string;
					};
					discount?: {
						__typename?: "Discount";
						id: number;
						name: string;
						desc: string;
						discount_percent: number;
						active: boolean;
						created_at: string;
						updated_at: string;
					} | null;
				};
				variants?: Array<{
					__typename?: "ProductVariant";
					product_variant_id: number;
					created_at: string;
					updated_at: string;
					variant_value: {
						__typename?: "VariantValue";
						value_id: number;
						value: string;
						created_at: string;
						updated_at: string;
						variant: {
							__typename?: "Variant";
							variant_id: number;
							variant_name: string;
							created_at: string;
							updated_at: string;
						};
					};
				}> | null;
				carts?: Array<{
					__typename?: "Cart";
					id: number;
					userId: number;
					quantity: number;
					inventoryId: number;
					created_at: string;
					updated_at: string;
				}> | null;
			} | null;
		}>;
	}> | null;
};

export type ProductByIdQueryVariables = Exact<{
	identifier: Scalars["String"];
}>;

export type ProductByIdQuery = {
	__typename?: "Query";
	product?: {
		__typename?: "Product";
		id: number;
		identifier: string;
		name: string;
		desc: string;
		categoryId: number;
		discountId?: number | null;
		created_at: string;
		updated_at: string;
		images: Array<{
			__typename?: "ProductImage";
			id: number;
			imageURL: string;
			productId: number;
			sequence: number;
			created_at: string;
			updated_at: string;
		}>;
		category: {
			__typename?: "ProductCategory";
			id: number;
			name: string;
			identifier: string;
			desc: string;
			imageURL: string;
			created_at: string;
			updated_at: string;
		};
		inventories?: Array<{
			__typename?: "ProductInventory";
			inventory_id: number;
			quantity: number;
			price: number;
			created_at: string;
			updated_at: string;
			variants?: Array<{
				__typename?: "ProductVariant";
				product_variant_id: number;
				created_at: string;
				updated_at: string;
				variant_value: {
					__typename?: "VariantValue";
					value_id: number;
					value: string;
					created_at: string;
					updated_at: string;
					variant: {
						__typename?: "Variant";
						variant_id: number;
						variant_name: string;
						created_at: string;
						updated_at: string;
					};
				};
			}> | null;
			carts?: Array<{
				__typename?: "Cart";
				id: number;
				userId: number;
				quantity: number;
				inventoryId: number;
				created_at: string;
				updated_at: string;
			}> | null;
		}> | null;
		discount?: {
			__typename?: "Discount";
			id: number;
			name: string;
			desc: string;
			discount_percent: number;
			active: boolean;
			created_at: string;
			updated_at: string;
		} | null;
	} | null;
};

export type ProductsQueryVariables = Exact<{ [key: string]: never }>;

export type ProductsQuery = {
	__typename?: "Query";
	products?: Array<{
		__typename?: "Product";
		id: number;
		identifier: string;
		name: string;
		desc: string;
		categoryId: number;
		discountId?: number | null;
		created_at: string;
		updated_at: string;
		images: Array<{
			__typename?: "ProductImage";
			id: number;
			imageURL: string;
			productId: number;
			sequence: number;
			created_at: string;
			updated_at: string;
		}>;
		category: {
			__typename?: "ProductCategory";
			id: number;
			name: string;
			identifier: string;
			desc: string;
			imageURL: string;
			created_at: string;
			updated_at: string;
		};
		inventories?: Array<{
			__typename?: "ProductInventory";
			inventory_id: number;
			quantity: number;
			price: number;
			created_at: string;
			updated_at: string;
			variants?: Array<{
				__typename?: "ProductVariant";
				product_variant_id: number;
				created_at: string;
				updated_at: string;
				variant_value: {
					__typename?: "VariantValue";
					value_id: number;
					value: string;
					created_at: string;
					updated_at: string;
					variant: {
						__typename?: "Variant";
						variant_id: number;
						variant_name: string;
						created_at: string;
						updated_at: string;
					};
				};
			}> | null;
			carts?: Array<{
				__typename?: "Cart";
				id: number;
				userId: number;
				quantity: number;
				inventoryId: number;
				created_at: string;
				updated_at: string;
			}> | null;
		}> | null;
		discount?: {
			__typename?: "Discount";
			id: number;
			name: string;
			desc: string;
			discount_percent: number;
			active: boolean;
			created_at: string;
			updated_at: string;
		} | null;
	}> | null;
};

export type PromoQueryVariables = Exact<{
	code: Scalars["String"];
}>;

export type PromoQuery = {
	__typename?: "Query";
	promo?: {
		__typename?: "Promo";
		id: number;
		name: string;
		code: string;
		discount_amount: number;
		isDiscountAmountPercentage: boolean;
		starts_at: string;
		expires_at: string;
		created_at: string;
		updated_at: string;
	} | null;
};

export type ReviewsQueryVariables = Exact<{
	productId: Scalars["Int"];
}>;

export type ReviewsQuery = {
	__typename?: "Query";
	reviews?: Array<{
		__typename?: "ProductReview";
		id: number;
		productId: number;
		userId: number;
		rating: number;
		desc: string;
		review: string;
		isAnonymous: boolean;
		created_at: string;
		updated_at: string;
		user?: {
			__typename?: "User";
			first_name: string;
			last_name: string;
		} | null;
	}> | null;
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

export type VariantsQueryVariables = Exact<{ [key: string]: never }>;

export type VariantsQuery = {
	__typename?: "Query";
	variants: Array<{
		__typename?: "Variant";
		variant_id: number;
		variant_name: string;
		created_at: string;
		updated_at: string;
		variant_values: Array<{
			__typename?: "VariantValue";
			value_id: number;
			value: string;
			created_at: string;
			updated_at: string;
		}>;
	}>;
};

export const AddressFragmentFragmentDoc = gql`
	fragment AddressFragment on Address {
		id
		type
		isDefault
		name
		address
		city
		state
		zip
		country
		phone_number
		userId
		created_at
		updated_at
	}
`;
export const PromoFragmentFragmentDoc = gql`
	fragment PromoFragment on Promo {
		id
		name
		code
		discount_amount
		isDiscountAmountPercentage
		starts_at
		expires_at
		created_at
		updated_at
	}
`;
export const VariantFragmentFragmentDoc = gql`
	fragment VariantFragment on Variant {
		variant_id
		variant_name
		created_at
		updated_at
	}
`;
export const VariantValueFragmentFragmentDoc = gql`
	fragment VariantValueFragment on VariantValue {
		value_id
		variant {
			...VariantFragment
		}
		value
		created_at
		updated_at
	}
	${VariantFragmentFragmentDoc}
`;
export const ProductVariantFragmentFragmentDoc = gql`
	fragment ProductVariantFragment on ProductVariant {
		product_variant_id
		variant_value {
			...VariantValueFragment
		}
		created_at
		updated_at
	}
	${VariantValueFragmentFragmentDoc}
`;
export const CartFragmentFragmentDoc = gql`
	fragment CartFragment on Cart {
		id
		userId
		quantity
		inventoryId
		created_at
		updated_at
	}
`;
export const ProductInventoryFragmentFragmentDoc = gql`
	fragment ProductInventoryFragment on ProductInventory {
		inventory_id
		quantity
		price
		variants {
			...ProductVariantFragment
		}
		carts {
			...CartFragment
		}
		created_at
		updated_at
	}
	${ProductVariantFragmentFragmentDoc}
	${CartFragmentFragmentDoc}
`;
export const ImageFragmentFragmentDoc = gql`
	fragment ImageFragment on ProductImage {
		id
		imageURL
		productId
		sequence
		created_at
		updated_at
	}
`;
export const CategoryFragmentFragmentDoc = gql`
	fragment CategoryFragment on ProductCategory {
		id
		name
		identifier
		desc
		imageURL
		created_at
		updated_at
	}
`;
export const DiscountFragmentFragmentDoc = gql`
	fragment DiscountFragment on Discount {
		id
		name
		desc
		discount_percent
		active
		created_at
		updated_at
	}
`;
export const OrderItemFragmentFragmentDoc = gql`
	fragment OrderItemFragment on OrderItem {
		id
		inventory {
			...ProductInventoryFragment
			product {
				id
				identifier
				name
				desc
				categoryId
				discountId
				images {
					...ImageFragment
				}
				category {
					...CategoryFragment
				}
				discount {
					...DiscountFragment
				}
				created_at
				updated_at
			}
		}
		quantity
		created_at
		updated_at
	}
	${ProductInventoryFragmentFragmentDoc}
	${ImageFragmentFragmentDoc}
	${CategoryFragmentFragmentDoc}
	${DiscountFragmentFragmentDoc}
`;
export const OrderDetailFragmentFragmentDoc = gql`
	fragment OrderDetailFragment on OrderDetail {
		id
		userId
		addressId
		address {
			...AddressFragment
		}
		promoId
		promo {
			...PromoFragment
		}
		status
		paymentdetails {
			orderId
			amount
			provider
			status
			created_at
			updated_at
		}
		orderitems {
			...OrderItemFragment
		}
		created_at
		updated_at
	}
	${AddressFragmentFragmentDoc}
	${PromoFragmentFragmentDoc}
	${OrderItemFragmentFragmentDoc}
`;
export const ProductFragmentFragmentDoc = gql`
	fragment ProductFragment on Product {
		id
		identifier
		name
		desc
		categoryId
		discountId
		images {
			...ImageFragment
		}
		category {
			...CategoryFragment
		}
		inventories {
			...ProductInventoryFragment
		}
		discount {
			...DiscountFragment
		}
		created_at
		updated_at
	}
	${ImageFragmentFragmentDoc}
	${CategoryFragmentFragmentDoc}
	${ProductInventoryFragmentFragmentDoc}
	${DiscountFragmentFragmentDoc}
`;
export const RegularErrorFragmentDoc = gql`
	fragment RegularError on FieldError {
		field
		message
	}
`;
export const ReviewFragmentFragmentDoc = gql`
	fragment ReviewFragment on ProductReview {
		id
		productId
		userId
		rating
		review
		isAnonymous
		created_at
		updated_at
		user {
			first_name
			last_name
		}
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
		imageUrl
		roleId
		created_at
		updated_at
	}
`;
export const AddAddressDocument = gql`
	mutation AddAddress($input: AddressInput!) {
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
export const UpdateAddressDocument = gql`
	mutation UpdateAddress($input: AddressInput!, $updateAddressId: Int!) {
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
export const AddToCartDocument = gql`
	mutation AddToCart($quantity: Int!, $inventoryId: Int!) {
		addToCart(quantity: $quantity, inventoryId: $inventoryId) {
			id
			userId
			quantity
			inventoryId
			created_at
			updated_at
		}
	}
`;
export type AddToCartMutationFn = Apollo.MutationFunction<
	AddToCartMutation,
	AddToCartMutationVariables
>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      quantity: // value for 'quantity'
 *      inventoryId: // value for 'inventoryId'
 *   },
 * });
 */
export function useAddToCartMutation(
	baseOptions?: Apollo.MutationHookOptions<
		AddToCartMutation,
		AddToCartMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<AddToCartMutation, AddToCartMutationVariables>(
		AddToCartDocument,
		options
	);
}
export type AddToCartMutationHookResult = ReturnType<
	typeof useAddToCartMutation
>;
export type AddToCartMutationResult = Apollo.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<
	AddToCartMutation,
	AddToCartMutationVariables
>;
export const ClearCartDocument = gql`
	mutation ClearCart {
		clearCart
	}
`;
export type ClearCartMutationFn = Apollo.MutationFunction<
	ClearCartMutation,
	ClearCartMutationVariables
>;

/**
 * __useClearCartMutation__
 *
 * To run a mutation, you first call `useClearCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearCartMutation, { data, loading, error }] = useClearCartMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearCartMutation(
	baseOptions?: Apollo.MutationHookOptions<
		ClearCartMutation,
		ClearCartMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<ClearCartMutation, ClearCartMutationVariables>(
		ClearCartDocument,
		options
	);
}
export type ClearCartMutationHookResult = ReturnType<
	typeof useClearCartMutation
>;
export type ClearCartMutationResult = Apollo.MutationResult<ClearCartMutation>;
export type ClearCartMutationOptions = Apollo.BaseMutationOptions<
	ClearCartMutation,
	ClearCartMutationVariables
>;
export const DeleteFromCartDocument = gql`
	mutation DeleteFromCart($quantity: Int!, $inventoryId: Int!) {
		deleteFromCart(quantity: $quantity, inventoryId: $inventoryId)
	}
`;
export type DeleteFromCartMutationFn = Apollo.MutationFunction<
	DeleteFromCartMutation,
	DeleteFromCartMutationVariables
>;

/**
 * __useDeleteFromCartMutation__
 *
 * To run a mutation, you first call `useDeleteFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFromCartMutation, { data, loading, error }] = useDeleteFromCartMutation({
 *   variables: {
 *      quantity: // value for 'quantity'
 *      inventoryId: // value for 'inventoryId'
 *   },
 * });
 */
export function useDeleteFromCartMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteFromCartMutation,
		DeleteFromCartMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		DeleteFromCartMutation,
		DeleteFromCartMutationVariables
	>(DeleteFromCartDocument, options);
}
export type DeleteFromCartMutationHookResult = ReturnType<
	typeof useDeleteFromCartMutation
>;
export type DeleteFromCartMutationResult =
	Apollo.MutationResult<DeleteFromCartMutation>;
export type DeleteFromCartMutationOptions = Apollo.BaseMutationOptions<
	DeleteFromCartMutation,
	DeleteFromCartMutationVariables
>;
export const UpdateCartDocument = gql`
	mutation UpdateCart($quantity: Int!, $inventoryId: Int!) {
		updateCart(quantity: $quantity, inventoryId: $inventoryId) {
			id
			userId
			quantity
			inventoryId
			inventory {
				...ProductInventoryFragment
			}
			created_at
			updated_at
		}
	}
	${ProductInventoryFragmentFragmentDoc}
`;
export type UpdateCartMutationFn = Apollo.MutationFunction<
	UpdateCartMutation,
	UpdateCartMutationVariables
>;

/**
 * __useUpdateCartMutation__
 *
 * To run a mutation, you first call `useUpdateCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartMutation, { data, loading, error }] = useUpdateCartMutation({
 *   variables: {
 *      quantity: // value for 'quantity'
 *      inventoryId: // value for 'inventoryId'
 *   },
 * });
 */
export function useUpdateCartMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateCartMutation,
		UpdateCartMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<UpdateCartMutation, UpdateCartMutationVariables>(
		UpdateCartDocument,
		options
	);
}
export type UpdateCartMutationHookResult = ReturnType<
	typeof useUpdateCartMutation
>;
export type UpdateCartMutationResult =
	Apollo.MutationResult<UpdateCartMutation>;
export type UpdateCartMutationOptions = Apollo.BaseMutationOptions<
	UpdateCartMutation,
	UpdateCartMutationVariables
>;
export const AddToFavouriteDocument = gql`
	mutation AddToFavourite($productId: Int!) {
		addToFavourite(productId: $productId) {
			id
			userId
			productId
			created_at
			updated_at
		}
	}
`;
export type AddToFavouriteMutationFn = Apollo.MutationFunction<
	AddToFavouriteMutation,
	AddToFavouriteMutationVariables
>;

/**
 * __useAddToFavouriteMutation__
 *
 * To run a mutation, you first call `useAddToFavouriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToFavouriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToFavouriteMutation, { data, loading, error }] = useAddToFavouriteMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useAddToFavouriteMutation(
	baseOptions?: Apollo.MutationHookOptions<
		AddToFavouriteMutation,
		AddToFavouriteMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		AddToFavouriteMutation,
		AddToFavouriteMutationVariables
	>(AddToFavouriteDocument, options);
}
export type AddToFavouriteMutationHookResult = ReturnType<
	typeof useAddToFavouriteMutation
>;
export type AddToFavouriteMutationResult =
	Apollo.MutationResult<AddToFavouriteMutation>;
export type AddToFavouriteMutationOptions = Apollo.BaseMutationOptions<
	AddToFavouriteMutation,
	AddToFavouriteMutationVariables
>;
export const RemoveFromFavouriteDocument = gql`
	mutation RemoveFromFavourite($productId: Int!) {
		removeFromFavourite(productId: $productId)
	}
`;
export type RemoveFromFavouriteMutationFn = Apollo.MutationFunction<
	RemoveFromFavouriteMutation,
	RemoveFromFavouriteMutationVariables
>;

/**
 * __useRemoveFromFavouriteMutation__
 *
 * To run a mutation, you first call `useRemoveFromFavouriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromFavouriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromFavouriteMutation, { data, loading, error }] = useRemoveFromFavouriteMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRemoveFromFavouriteMutation(
	baseOptions?: Apollo.MutationHookOptions<
		RemoveFromFavouriteMutation,
		RemoveFromFavouriteMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		RemoveFromFavouriteMutation,
		RemoveFromFavouriteMutationVariables
	>(RemoveFromFavouriteDocument, options);
}
export type RemoveFromFavouriteMutationHookResult = ReturnType<
	typeof useRemoveFromFavouriteMutation
>;
export type RemoveFromFavouriteMutationResult =
	Apollo.MutationResult<RemoveFromFavouriteMutation>;
export type RemoveFromFavouriteMutationOptions = Apollo.BaseMutationOptions<
	RemoveFromFavouriteMutation,
	RemoveFromFavouriteMutationVariables
>;
export const CreateOrderDocument = gql`
	mutation CreateOrder($options: CreateOrderInput!) {
		createOrder(options: $options)
	}
`;
export type CreateOrderMutationFn = Apollo.MutationFunction<
	CreateOrderMutation,
	CreateOrderMutationVariables
>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOrderMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreateOrderMutation,
		CreateOrderMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(
		CreateOrderDocument,
		options
	);
}
export type CreateOrderMutationHookResult = ReturnType<
	typeof useCreateOrderMutation
>;
export type CreateOrderMutationResult =
	Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<
	CreateOrderMutation,
	CreateOrderMutationVariables
>;
export const CreatePaymentDocument = gql`
	mutation CreatePayment($orderId: String!) {
		createPayment(orderId: $orderId)
	}
`;
export type CreatePaymentMutationFn = Apollo.MutationFunction<
	CreatePaymentMutation,
	CreatePaymentMutationVariables
>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useCreatePaymentMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreatePaymentMutation,
		CreatePaymentMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		CreatePaymentMutation,
		CreatePaymentMutationVariables
	>(CreatePaymentDocument, options);
}
export type CreatePaymentMutationHookResult = ReturnType<
	typeof useCreatePaymentMutation
>;
export type CreatePaymentMutationResult =
	Apollo.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = Apollo.BaseMutationOptions<
	CreatePaymentMutation,
	CreatePaymentMutationVariables
>;
export const UpdateStatusDocument = gql`
	mutation UpdateStatus($pidx: String!, $orderId: String!) {
		updateStatus(pidx: $pidx, orderId: $orderId) {
			...OrderDetailFragment
		}
	}
	${OrderDetailFragmentFragmentDoc}
`;
export type UpdateStatusMutationFn = Apollo.MutationFunction<
	UpdateStatusMutation,
	UpdateStatusMutationVariables
>;

/**
 * __useUpdateStatusMutation__
 *
 * To run a mutation, you first call `useUpdateStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStatusMutation, { data, loading, error }] = useUpdateStatusMutation({
 *   variables: {
 *      pidx: // value for 'pidx'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useUpdateStatusMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateStatusMutation,
		UpdateStatusMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateStatusMutation,
		UpdateStatusMutationVariables
	>(UpdateStatusDocument, options);
}
export type UpdateStatusMutationHookResult = ReturnType<
	typeof useUpdateStatusMutation
>;
export type UpdateStatusMutationResult =
	Apollo.MutationResult<UpdateStatusMutation>;
export type UpdateStatusMutationOptions = Apollo.BaseMutationOptions<
	UpdateStatusMutation,
	UpdateStatusMutationVariables
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
export const AddressesDocument = gql`
	query Addresses {
		addresses {
			...AddressFragment
		}
	}
	${AddressFragmentFragmentDoc}
`;

/**
 * __useAddressesQuery__
 *
 * To run a query within a React component, call `useAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAddressesQuery(
	baseOptions?: Apollo.QueryHookOptions<AddressesQuery, AddressesQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<AddressesQuery, AddressesQueryVariables>(
		AddressesDocument,
		options
	);
}
export function useAddressesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		AddressesQuery,
		AddressesQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<AddressesQuery, AddressesQueryVariables>(
		AddressesDocument,
		options
	);
}
export type AddressesQueryHookResult = ReturnType<typeof useAddressesQuery>;
export type AddressesLazyQueryHookResult = ReturnType<
	typeof useAddressesLazyQuery
>;
export type AddressesQueryResult = Apollo.QueryResult<
	AddressesQuery,
	AddressesQueryVariables
>;
export const FetchCartItemsDocument = gql`
	query FetchCartItems {
		fetchCartItems {
			id
			userId
			quantity
			inventoryId
			inventory {
				...ProductInventoryFragment
				product {
					id
					identifier
					name
					desc
					categoryId
					discountId
					images {
						...ImageFragment
					}
					category {
						...CategoryFragment
					}
					discount {
						...DiscountFragment
					}
					created_at
					updated_at
				}
			}
			created_at
			updated_at
		}
	}
	${ProductInventoryFragmentFragmentDoc}
	${ImageFragmentFragmentDoc}
	${CategoryFragmentFragmentDoc}
	${DiscountFragmentFragmentDoc}
`;

/**
 * __useFetchCartItemsQuery__
 *
 * To run a query within a React component, call `useFetchCartItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCartItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCartItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchCartItemsQuery(
	baseOptions?: Apollo.QueryHookOptions<
		FetchCartItemsQuery,
		FetchCartItemsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<FetchCartItemsQuery, FetchCartItemsQueryVariables>(
		FetchCartItemsDocument,
		options
	);
}
export function useFetchCartItemsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		FetchCartItemsQuery,
		FetchCartItemsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<FetchCartItemsQuery, FetchCartItemsQueryVariables>(
		FetchCartItemsDocument,
		options
	);
}
export type FetchCartItemsQueryHookResult = ReturnType<
	typeof useFetchCartItemsQuery
>;
export type FetchCartItemsLazyQueryHookResult = ReturnType<
	typeof useFetchCartItemsLazyQuery
>;
export type FetchCartItemsQueryResult = Apollo.QueryResult<
	FetchCartItemsQuery,
	FetchCartItemsQueryVariables
>;
export const CategoriesDocument = gql`
	query Categories {
		categories {
			...CategoryFragment
		}
	}
	${CategoryFragmentFragmentDoc}
`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(
	baseOptions?: Apollo.QueryHookOptions<
		CategoriesQuery,
		CategoriesQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(
		CategoriesDocument,
		options
	);
}
export function useCategoriesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		CategoriesQuery,
		CategoriesQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(
		CategoriesDocument,
		options
	);
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<
	typeof useCategoriesLazyQuery
>;
export type CategoriesQueryResult = Apollo.QueryResult<
	CategoriesQuery,
	CategoriesQueryVariables
>;
export const FavouritesDocument = gql`
	query Favourites {
		favourites {
			id
			userId
			productId
			created_at
			updated_at
		}
	}
`;

/**
 * __useFavouritesQuery__
 *
 * To run a query within a React component, call `useFavouritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavouritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavouritesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFavouritesQuery(
	baseOptions?: Apollo.QueryHookOptions<
		FavouritesQuery,
		FavouritesQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<FavouritesQuery, FavouritesQueryVariables>(
		FavouritesDocument,
		options
	);
}
export function useFavouritesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		FavouritesQuery,
		FavouritesQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<FavouritesQuery, FavouritesQueryVariables>(
		FavouritesDocument,
		options
	);
}
export type FavouritesQueryHookResult = ReturnType<typeof useFavouritesQuery>;
export type FavouritesLazyQueryHookResult = ReturnType<
	typeof useFavouritesLazyQuery
>;
export type FavouritesQueryResult = Apollo.QueryResult<
	FavouritesQuery,
	FavouritesQueryVariables
>;
export const FavouritesWithProductDocument = gql`
	query FavouritesWithProduct {
		favouritesWithProduct {
			id
			userId
			productId
			created_at
			updated_at
			product {
				...ProductFragment
			}
		}
	}
	${ProductFragmentFragmentDoc}
`;

/**
 * __useFavouritesWithProductQuery__
 *
 * To run a query within a React component, call `useFavouritesWithProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavouritesWithProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavouritesWithProductQuery({
 *   variables: {
 *   },
 * });
 */
export function useFavouritesWithProductQuery(
	baseOptions?: Apollo.QueryHookOptions<
		FavouritesWithProductQuery,
		FavouritesWithProductQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<
		FavouritesWithProductQuery,
		FavouritesWithProductQueryVariables
	>(FavouritesWithProductDocument, options);
}
export function useFavouritesWithProductLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		FavouritesWithProductQuery,
		FavouritesWithProductQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		FavouritesWithProductQuery,
		FavouritesWithProductQueryVariables
	>(FavouritesWithProductDocument, options);
}
export type FavouritesWithProductQueryHookResult = ReturnType<
	typeof useFavouritesWithProductQuery
>;
export type FavouritesWithProductLazyQueryHookResult = ReturnType<
	typeof useFavouritesWithProductLazyQuery
>;
export type FavouritesWithProductQueryResult = Apollo.QueryResult<
	FavouritesWithProductQuery,
	FavouritesWithProductQueryVariables
>;
export const OrderByIdDocument = gql`
	query OrderById($orderId: String!) {
		orderById(orderId: $orderId) {
			...OrderDetailFragment
		}
	}
	${OrderDetailFragmentFragmentDoc}
`;

/**
 * __useOrderByIdQuery__
 *
 * To run a query within a React component, call `useOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderByIdQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useOrderByIdQuery(
	baseOptions: Apollo.QueryHookOptions<OrderByIdQuery, OrderByIdQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<OrderByIdQuery, OrderByIdQueryVariables>(
		OrderByIdDocument,
		options
	);
}
export function useOrderByIdLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		OrderByIdQuery,
		OrderByIdQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<OrderByIdQuery, OrderByIdQueryVariables>(
		OrderByIdDocument,
		options
	);
}
export type OrderByIdQueryHookResult = ReturnType<typeof useOrderByIdQuery>;
export type OrderByIdLazyQueryHookResult = ReturnType<
	typeof useOrderByIdLazyQuery
>;
export type OrderByIdQueryResult = Apollo.QueryResult<
	OrderByIdQuery,
	OrderByIdQueryVariables
>;
export const OrdersDocument = gql`
	query Orders {
		orders {
			...OrderDetailFragment
		}
	}
	${OrderDetailFragmentFragmentDoc}
`;

/**
 * __useOrdersQuery__
 *
 * To run a query within a React component, call `useOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrdersQuery(
	baseOptions?: Apollo.QueryHookOptions<OrdersQuery, OrdersQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<OrdersQuery, OrdersQueryVariables>(
		OrdersDocument,
		options
	);
}
export function useOrdersLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<OrdersQuery, OrdersQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<OrdersQuery, OrdersQueryVariables>(
		OrdersDocument,
		options
	);
}
export type OrdersQueryHookResult = ReturnType<typeof useOrdersQuery>;
export type OrdersLazyQueryHookResult = ReturnType<typeof useOrdersLazyQuery>;
export type OrdersQueryResult = Apollo.QueryResult<
	OrdersQuery,
	OrdersQueryVariables
>;
export const ProductByIdDocument = gql`
	query ProductById($identifier: String!) {
		product(identifier: $identifier) {
			id
			identifier
			name
			desc
			categoryId
			discountId
			images {
				...ImageFragment
			}
			category {
				...CategoryFragment
			}
			inventories {
				...ProductInventoryFragment
			}
			discount {
				...DiscountFragment
			}
			created_at
			updated_at
		}
	}
	${ImageFragmentFragmentDoc}
	${CategoryFragmentFragmentDoc}
	${ProductInventoryFragmentFragmentDoc}
	${DiscountFragmentFragmentDoc}
`;

/**
 * __useProductByIdQuery__
 *
 * To run a query within a React component, call `useProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductByIdQuery({
 *   variables: {
 *      identifier: // value for 'identifier'
 *   },
 * });
 */
export function useProductByIdQuery(
	baseOptions: Apollo.QueryHookOptions<
		ProductByIdQuery,
		ProductByIdQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<ProductByIdQuery, ProductByIdQueryVariables>(
		ProductByIdDocument,
		options
	);
}
export function useProductByIdLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		ProductByIdQuery,
		ProductByIdQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<ProductByIdQuery, ProductByIdQueryVariables>(
		ProductByIdDocument,
		options
	);
}
export type ProductByIdQueryHookResult = ReturnType<typeof useProductByIdQuery>;
export type ProductByIdLazyQueryHookResult = ReturnType<
	typeof useProductByIdLazyQuery
>;
export type ProductByIdQueryResult = Apollo.QueryResult<
	ProductByIdQuery,
	ProductByIdQueryVariables
>;
export const ProductsDocument = gql`
	query Products {
		products {
			id
			identifier
			name
			desc
			categoryId
			discountId
			images {
				...ImageFragment
			}
			category {
				...CategoryFragment
			}
			inventories {
				...ProductInventoryFragment
			}
			discount {
				...DiscountFragment
			}
			created_at
			updated_at
		}
	}
	${ImageFragmentFragmentDoc}
	${CategoryFragmentFragmentDoc}
	${ProductInventoryFragmentFragmentDoc}
	${DiscountFragmentFragmentDoc}
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
export const PromoDocument = gql`
	query Promo($code: String!) {
		promo(code: $code) {
			id
			name
			code
			discount_amount
			isDiscountAmountPercentage
			starts_at
			expires_at
			created_at
			updated_at
		}
	}
`;

/**
 * __usePromoQuery__
 *
 * To run a query within a React component, call `usePromoQuery` and pass it any options that fit your needs.
 * When your component renders, `usePromoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePromoQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function usePromoQuery(
	baseOptions: Apollo.QueryHookOptions<PromoQuery, PromoQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<PromoQuery, PromoQueryVariables>(
		PromoDocument,
		options
	);
}
export function usePromoLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<PromoQuery, PromoQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<PromoQuery, PromoQueryVariables>(
		PromoDocument,
		options
	);
}
export type PromoQueryHookResult = ReturnType<typeof usePromoQuery>;
export type PromoLazyQueryHookResult = ReturnType<typeof usePromoLazyQuery>;
export type PromoQueryResult = Apollo.QueryResult<
	PromoQuery,
	PromoQueryVariables
>;
export const ReviewsDocument = gql`
	query Reviews($productId: Int!) {
		reviews(productId: $productId) {
			id
			productId
			userId
			rating
			desc
			review
			isAnonymous
			created_at
			updated_at
			user {
				first_name
				last_name
			}
		}
	}
`;

/**
 * __useReviewsQuery__
 *
 * To run a query within a React component, call `useReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useReviewsQuery(
	baseOptions: Apollo.QueryHookOptions<ReviewsQuery, ReviewsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<ReviewsQuery, ReviewsQueryVariables>(
		ReviewsDocument,
		options
	);
}
export function useReviewsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<ReviewsQuery, ReviewsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<ReviewsQuery, ReviewsQueryVariables>(
		ReviewsDocument,
		options
	);
}
export type ReviewsQueryHookResult = ReturnType<typeof useReviewsQuery>;
export type ReviewsLazyQueryHookResult = ReturnType<typeof useReviewsLazyQuery>;
export type ReviewsQueryResult = Apollo.QueryResult<
	ReviewsQuery,
	ReviewsQueryVariables
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
export const VariantsDocument = gql`
	query Variants {
		variants {
			...VariantFragment
			variant_values {
				value_id
				value
				created_at
				updated_at
			}
		}
	}
	${VariantFragmentFragmentDoc}
`;

/**
 * __useVariantsQuery__
 *
 * To run a query within a React component, call `useVariantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVariantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVariantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useVariantsQuery(
	baseOptions?: Apollo.QueryHookOptions<VariantsQuery, VariantsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<VariantsQuery, VariantsQueryVariables>(
		VariantsDocument,
		options
	);
}
export function useVariantsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		VariantsQuery,
		VariantsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<VariantsQuery, VariantsQueryVariables>(
		VariantsDocument,
		options
	);
}
export type VariantsQueryHookResult = ReturnType<typeof useVariantsQuery>;
export type VariantsLazyQueryHookResult = ReturnType<
	typeof useVariantsLazyQuery
>;
export type VariantsQueryResult = Apollo.QueryResult<
	VariantsQuery,
	VariantsQueryVariables
>;
