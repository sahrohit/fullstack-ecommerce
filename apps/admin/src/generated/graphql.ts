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

export type Account = {
	__typename?: "Account";
	access_token?: Maybe<Scalars["String"]>;
	created_at: Scalars["String"];
	expires_at?: Maybe<Scalars["Float"]>;
	id: Scalars["Int"];
	id_token?: Maybe<Scalars["String"]>;
	provider: Scalars["String"];
	providerAccountId: Scalars["String"];
	refresh_token?: Maybe<Scalars["String"]>;
	scope?: Maybe<Scalars["String"]>;
	session_state?: Maybe<Scalars["String"]>;
	token_type?: Maybe<Scalars["String"]>;
	type: Scalars["String"];
	updated_at: Scalars["String"];
	user: User;
	userId: Scalars["Float"];
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

export type AdminRegisterInput = {
	email: Scalars["String"];
	first_name: Scalars["String"];
	last_name: Scalars["String"];
	password: Scalars["String"];
	subdomain: Scalars["String"];
	tenant_category_id: Scalars["Float"];
	tenant_name: Scalars["String"];
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
	shippingId: Scalars["Float"];
};

export type CreatePaymentResponse = {
	__typename?: "CreatePaymentResponse";
	amt?: Maybe<Scalars["Int"]>;
	paymentId?: Maybe<Scalars["String"]>;
	paymentUrl?: Maybe<Scalars["String"]>;
	pdc?: Maybe<Scalars["Int"]>;
	pid?: Maybe<Scalars["String"]>;
	provider: Scalars["String"];
	psc?: Maybe<Scalars["Int"]>;
	scd?: Maybe<Scalars["String"]>;
	tAmt?: Maybe<Scalars["Int"]>;
	txAmt?: Maybe<Scalars["Int"]>;
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

export type Issue = {
	__typename?: "Issue";
	category: IssueCategory;
	categoryId: Scalars["Int"];
	comments?: Maybe<Array<IssueComment>>;
	completed_at?: Maybe<Scalars["String"]>;
	content: Scalars["String"];
	created_at: Scalars["String"];
	html?: Maybe<Scalars["String"]>;
	id: Scalars["Int"];
	status: Scalars["String"];
	subject: Scalars["String"];
	updated_at: Scalars["String"];
	user: User;
	userId: Scalars["Float"];
};

export type IssueCategory = {
	__typename?: "IssueCategory";
	created_at: Scalars["String"];
	desc: Scalars["String"];
	id: Scalars["Int"];
	identifier: Scalars["String"];
	issues?: Maybe<Array<Issue>>;
	name: Scalars["String"];
	updated_at: Scalars["String"];
};

export type IssueComment = {
	__typename?: "IssueComment";
	completed_at?: Maybe<Scalars["String"]>;
	content: Scalars["String"];
	created_at: Scalars["String"];
	html?: Maybe<Scalars["String"]>;
	id: Scalars["Int"];
	issue: Issue;
	issueId: Scalars["Int"];
	updated_at: Scalars["String"];
	user: User;
	userId: Scalars["Float"];
};

export type IssueInput = {
	categoryId: Scalars["Float"];
	content: Scalars["String"];
	html: Scalars["String"];
	subject: Scalars["String"];
};

export type Mutation = {
	__typename?: "Mutation";
	addAddress: Address;
	addCategory: ProductCategory;
	addDiscount?: Maybe<DiscountResponse>;
	addReview?: Maybe<ProductReview>;
	addStaff: Staff;
	addToCart: Cart;
	addToFavourite: Favourite;
	adminLogin: UserResponse;
	adminRegister: UserResponse;
	changePassword: UserResponse;
	clearCart: Scalars["Boolean"];
	createComment: IssueComment;
	createIssue: Issue;
	createOrder: OrderDetail;
	createPayment: CreatePaymentResponse;
	deleteAddress: Scalars["Boolean"];
	deleteCategory: Scalars["Boolean"];
	deleteDiscount?: Maybe<Scalars["Boolean"]>;
	deleteFromCart: Scalars["Boolean"];
	deleteStaff: Scalars["Boolean"];
	emailInvoice: Scalars["Boolean"];
	forgotPassword: Scalars["Boolean"];
	generateInvoice?: Maybe<Scalars["String"]>;
	login: UserResponse;
	logout: Scalars["Boolean"];
	register: UserResponse;
	removeFromFavourite: Scalars["Boolean"];
	resendVerificationEmail: Scalars["Boolean"];
	resolveByCustomer: Scalars["Boolean"];
	updateAddress: Address;
	updateCart: Cart;
	updateCategory: ProductCategory;
	updateDiscount?: Maybe<DiscountResponse>;
	updateIssue: Issue;
	updateLanguagePreference: Scalars["Boolean"];
	updateMarketingPreference: Scalars["Boolean"];
	updatePassword: UserResponse;
	updateProfile: User;
	updateReview?: Maybe<ProductReview>;
	updateRole: Staff;
	updateStaffStatus: Staff;
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

export type MutationAddReviewArgs = {
	desc: Scalars["String"];
	isAnonymous: Scalars["Boolean"];
	productId: Scalars["Int"];
	rating: Scalars["Int"];
	review: Scalars["String"];
};

export type MutationAddStaffArgs = {
	roleId: Scalars["Int"];
	userId: Scalars["Int"];
};

export type MutationAddToCartArgs = {
	inventoryId: Scalars["Int"];
	quantity: Scalars["Int"];
};

export type MutationAddToFavouriteArgs = {
	productId: Scalars["Int"];
};

export type MutationAdminLoginArgs = {
	email: Scalars["String"];
	password: Scalars["String"];
};

export type MutationAdminRegisterArgs = {
	options: AdminRegisterInput;
};

export type MutationChangePasswordArgs = {
	newPassword: Scalars["String"];
	token: Scalars["String"];
};

export type MutationCreateCommentArgs = {
	content: Scalars["String"];
	issueId: Scalars["Int"];
};

export type MutationCreateIssueArgs = {
	input: IssueInput;
};

export type MutationCreateOrderArgs = {
	options: CreateOrderInput;
};

export type MutationCreatePaymentArgs = {
	orderId: Scalars["String"];
	provider: Scalars["String"];
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

export type MutationDeleteStaffArgs = {
	userId: Scalars["Int"];
};

export type MutationEmailInvoiceArgs = {
	email: Scalars["String"];
	orderId: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
	email: Scalars["String"];
};

export type MutationGenerateInvoiceArgs = {
	orderId: Scalars["String"];
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

export type MutationResolveByCustomerArgs = {
	issueId: Scalars["Int"];
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

export type MutationUpdateIssueArgs = {
	id: Scalars["Int"];
	input: IssueInput;
};

export type MutationUpdateLanguagePreferenceArgs = {
	currency: Scalars["String"];
	language: Scalars["String"];
};

export type MutationUpdateMarketingPreferenceArgs = {
	marketing_company_news: Scalars["Boolean"];
	marketing_product_news: Scalars["Boolean"];
};

export type MutationUpdatePasswordArgs = {
	confirmPassword: Scalars["String"];
	currentPassword: Scalars["String"];
	newPassword: Scalars["String"];
};

export type MutationUpdateProfileArgs = {
	first_name: Scalars["String"];
	imageUrl: Scalars["String"];
	last_name: Scalars["String"];
};

export type MutationUpdateReviewArgs = {
	desc: Scalars["String"];
	isAnonymous: Scalars["Boolean"];
	productId: Scalars["Int"];
	rating: Scalars["Int"];
	review: Scalars["String"];
};

export type MutationUpdateRoleArgs = {
	newroleId: Scalars["Int"];
	userId: Scalars["Int"];
};

export type MutationUpdateStaffStatusArgs = {
	status: Scalars["String"];
	userId: Scalars["Int"];
};

export type MutationUpdateStatusArgs = {
	orderId: Scalars["String"];
	pidx?: InputMaybe<Scalars["String"]>;
	refId?: InputMaybe<Scalars["String"]>;
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
	orderitems?: Maybe<Array<OrderItem>>;
	paymentdetails?: Maybe<Array<PaymentDetail>>;
	promo?: Maybe<Promo>;
	promoId?: Maybe<Scalars["Int"]>;
	shipping: ShippingMethod;
	shippingId: Scalars["Int"];
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

export type PaginatedProducts = {
	__typename?: "PaginatedProducts";
	hasMore: Scalars["Boolean"];
	products: Array<Product>;
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

export type ProductSummary = {
	__typename?: "ProductSummary";
	count: Scalars["Int"];
	max: Scalars["Int"];
	min: Scalars["Int"];
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
	allReviews?: Maybe<Array<ProductReview>>;
	categories: Array<ProductCategory>;
	categoriesSummary?: Maybe<Array<ProductCategoryWithProductCount>>;
	favourites: Array<Favourite>;
	favouritesWithProduct: Array<Favourite>;
	fetchCartItems?: Maybe<Array<Cart>>;
	hello: Scalars["String"];
	issueCategories: Array<IssueCategory>;
	issues: Array<Issue>;
	issuesWithComments: Issue;
	me?: Maybe<User>;
	meStaff?: Maybe<User>;
	meWithAccount?: Maybe<User>;
	orderById?: Maybe<OrderDetail>;
	orders?: Maybe<Array<OrderDetail>>;
	product?: Maybe<Product>;
	products?: Maybe<Array<Product>>;
	productsSummary?: Maybe<ProductSummary>;
	promo?: Maybe<Promo>;
	queryProducts?: Maybe<PaginatedProducts>;
	reviewByUserAndProduct?: Maybe<ProductReview>;
	reviewSummary?: Maybe<ReviewSummaryResponse>;
	reviews?: Maybe<Array<ProductReview>>;
	roles: Array<UserRole>;
	searchProducts?: Maybe<Array<Product>>;
	shippingmethods: Array<ShippingMethod>;
	staffs?: Maybe<Array<Staff>>;
	tenantCategories: Array<TenantCategory>;
	userByEmail: UserDataResponse;
	variants: Array<Variant>;
};

export type QueryAllReviewsArgs = {
	productId: Scalars["Int"];
};

export type QueryIssuesWithCommentsArgs = {
	issueId: Scalars["Int"];
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

export type QueryQueryProductsArgs = {
	limit?: InputMaybe<Scalars["Float"]>;
	offset?: InputMaybe<Scalars["Float"]>;
	query: Scalars["String"];
	sort?: InputMaybe<Scalars["String"]>;
};

export type QueryReviewByUserAndProductArgs = {
	productId: Scalars["Int"];
};

export type QueryReviewSummaryArgs = {
	productId: Scalars["Int"];
};

export type QueryReviewsArgs = {
	productId: Scalars["Int"];
};

export type QuerySearchProductsArgs = {
	limit?: InputMaybe<Scalars["Int"]>;
	query: Scalars["String"];
};

export type QueryStaffsArgs = {
	roleId?: InputMaybe<Scalars["Int"]>;
};

export type QueryUserByEmailArgs = {
	email: Scalars["String"];
};

export type RegisterInput = {
	email: Scalars["String"];
	first_name: Scalars["String"];
	last_name: Scalars["String"];
	password: Scalars["String"];
};

export type ReviewSummaryResponse = {
	__typename?: "ReviewSummaryResponse";
	count?: Maybe<Scalars["Int"]>;
	rating?: Maybe<Scalars["Float"]>;
};

export type ShippingMethod = {
	__typename?: "ShippingMethod";
	created_at: Scalars["String"];
	dispatch_in: Scalars["Int"];
	id: Scalars["Int"];
	name: Scalars["String"];
	price: Scalars["Int"];
	updated_at: Scalars["String"];
};

export type Staff = {
	__typename?: "Staff";
	created_at: Scalars["String"];
	id: Scalars["Int"];
	status: Scalars["String"];
	tenant?: Maybe<Tenant>;
	tenantId: Scalars["Float"];
	updated_at: Scalars["String"];
	user?: Maybe<User>;
	userId: Scalars["Float"];
};

export type Tenant = {
	__typename?: "Tenant";
	address?: Maybe<Scalars["String"]>;
	category: TenantCategory;
	categoryId: Scalars["Int"];
	created_at: Scalars["String"];
	customDomain?: Maybe<Scalars["String"]>;
	defaultForPreview: Scalars["Boolean"];
	desc?: Maybe<Scalars["String"]>;
	font?: Maybe<Scalars["String"]>;
	id: Scalars["Int"];
	logo?: Maybe<Scalars["String"]>;
	name: Scalars["String"];
	subdomain: Scalars["String"];
	updated_at: Scalars["String"];
	userId: Scalars["Float"];
};

export type TenantCategory = {
	__typename?: "TenantCategory";
	created_at: Scalars["String"];
	desc?: Maybe<Scalars["String"]>;
	id: Scalars["Int"];
	identifier: Scalars["String"];
	name: Scalars["String"];
	tenants?: Maybe<Array<Tenant>>;
	updated_at: Scalars["String"];
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
	accounts?: Maybe<Array<Account>>;
	created_at: Scalars["String"];
	currency: Scalars["String"];
	email: Scalars["String"];
	email_verified: Scalars["Boolean"];
	first_name: Scalars["String"];
	id: Scalars["Int"];
	imageUrl?: Maybe<Scalars["String"]>;
	language: Scalars["String"];
	last_name: Scalars["String"];
	marketing_company_news: Scalars["Boolean"];
	marketing_product_news: Scalars["Boolean"];
	phone_number?: Maybe<Scalars["String"]>;
	phone_number_verified: Scalars["Boolean"];
	role: UserRole;
	roleId: Scalars["Float"];
	staff?: Maybe<Staff>;
	updated_at: Scalars["String"];
};

export type UserDataResponse = {
	__typename?: "UserDataResponse";
	email: Scalars["String"];
	email_verified: Scalars["Boolean"];
	first_name: Scalars["String"];
	id: Scalars["Int"];
	imageUrl?: Maybe<Scalars["String"]>;
	last_name?: Maybe<Scalars["String"]>;
	phone_number?: Maybe<Scalars["String"]>;
	phone_number_verified: Scalars["Boolean"];
	role: UserRole;
	roleId: Scalars["Float"];
	staff?: Maybe<Staff>;
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
	users?: Maybe<Array<User>>;
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

export type RegularErrorFragment = {
	__typename?: "FieldError";
	field: string;
	message: string;
};

export type RoleFragmentFragment = {
	__typename?: "UserRole";
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
};

export type StaffFragmentFragment = {
	__typename?: "Staff";
	id: number;
	userId: number;
	tenantId: number;
	status: string;
	created_at: string;
	updated_at: string;
};

export type TenantFragmentFragment = {
	__typename?: "Tenant";
	id: number;
	name: string;
	desc?: string | null;
	address?: string | null;
	logo?: string | null;
	font?: string | null;
	subdomain: string;
	customDomain?: string | null;
	defaultForPreview: boolean;
	userId: number;
	created_at: string;
	updated_at: string;
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
	language: string;
	currency: string;
	marketing_product_news: boolean;
	marketing_company_news: boolean;
	created_at: string;
	updated_at: string;
};

export type AddStaffMutationVariables = Exact<{
	roleId: Scalars["Int"];
	userId: Scalars["Int"];
}>;

export type AddStaffMutation = {
	__typename?: "Mutation";
	addStaff: {
		__typename?: "Staff";
		id: number;
		userId: number;
		tenantId: number;
		status: string;
		created_at: string;
		updated_at: string;
		tenant?: {
			__typename?: "Tenant";
			id: number;
			name: string;
			desc?: string | null;
			address?: string | null;
			logo?: string | null;
			font?: string | null;
			subdomain: string;
			customDomain?: string | null;
			defaultForPreview: boolean;
			userId: number;
			created_at: string;
			updated_at: string;
		} | null;
		user?: {
			__typename?: "User";
			first_name: string;
			last_name: string;
			email: string;
			imageUrl?: string | null;
			roleId: number;
			created_at: string;
			updated_at: string;
			role: {
				__typename?: "UserRole";
				id: number;
				name: string;
				created_at: string;
				updated_at: string;
			};
		} | null;
	};
};

export type DeleteStaffMutationVariables = Exact<{
	userId: Scalars["Int"];
}>;

export type DeleteStaffMutation = {
	__typename?: "Mutation";
	deleteStaff: boolean;
};

export type UpdateRoleMutationVariables = Exact<{
	newroleId: Scalars["Int"];
	userId: Scalars["Int"];
}>;

export type UpdateRoleMutation = {
	__typename?: "Mutation";
	updateRole: {
		__typename?: "Staff";
		id: number;
		userId: number;
		tenantId: number;
		status: string;
		created_at: string;
		updated_at: string;
		tenant?: {
			__typename?: "Tenant";
			id: number;
			name: string;
			desc?: string | null;
			address?: string | null;
			logo?: string | null;
			font?: string | null;
			subdomain: string;
			customDomain?: string | null;
			defaultForPreview: boolean;
			userId: number;
			created_at: string;
			updated_at: string;
		} | null;
		user?: {
			__typename?: "User";
			first_name: string;
			last_name: string;
			email: string;
			imageUrl?: string | null;
			roleId: number;
			created_at: string;
			updated_at: string;
			role: {
				__typename?: "UserRole";
				id: number;
				name: string;
				created_at: string;
				updated_at: string;
			};
		} | null;
	};
};

export type UpdateStaffStatusMutationVariables = Exact<{
	status: Scalars["String"];
	userId: Scalars["Int"];
}>;

export type UpdateStaffStatusMutation = {
	__typename?: "Mutation";
	updateStaffStatus: {
		__typename?: "Staff";
		id: number;
		userId: number;
		tenantId: number;
		status: string;
		created_at: string;
		updated_at: string;
		tenant?: {
			__typename?: "Tenant";
			id: number;
			name: string;
			desc?: string | null;
			address?: string | null;
			logo?: string | null;
			font?: string | null;
			subdomain: string;
			customDomain?: string | null;
			defaultForPreview: boolean;
			userId: number;
			created_at: string;
			updated_at: string;
		} | null;
		user?: {
			__typename?: "User";
			first_name: string;
			last_name: string;
			email: string;
			imageUrl?: string | null;
			roleId: number;
			created_at: string;
			updated_at: string;
			role: {
				__typename?: "UserRole";
				id: number;
				name: string;
				created_at: string;
				updated_at: string;
			};
		} | null;
	};
};

export type AdminLoginMutationVariables = Exact<{
	email: Scalars["String"];
	password: Scalars["String"];
}>;

export type AdminLoginMutation = {
	__typename?: "Mutation";
	adminLogin: {
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
			language: string;
			currency: string;
			marketing_product_news: boolean;
			marketing_company_news: boolean;
			created_at: string;
			updated_at: string;
			staff?: {
				__typename?: "Staff";
				id: number;
				userId: number;
				tenantId: number;
				status: string;
				created_at: string;
				updated_at: string;
				tenant?: {
					__typename?: "Tenant";
					id: number;
					name: string;
					desc?: string | null;
					address?: string | null;
					logo?: string | null;
					font?: string | null;
					subdomain: string;
					customDomain?: string | null;
					defaultForPreview: boolean;
					userId: number;
					created_at: string;
					updated_at: string;
				} | null;
			} | null;
		} | null;
	};
};

export type AdminRegisterMutationVariables = Exact<{
	options: AdminRegisterInput;
}>;

export type AdminRegisterMutation = {
	__typename?: "Mutation";
	adminRegister: {
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
			language: string;
			currency: string;
			marketing_product_news: boolean;
			marketing_company_news: boolean;
			created_at: string;
			updated_at: string;
			staff?: {
				__typename?: "Staff";
				id: number;
				userId: number;
				tenantId: number;
				status: string;
				created_at: string;
				updated_at: string;
				tenant?: {
					__typename?: "Tenant";
					id: number;
					name: string;
					desc?: string | null;
					address?: string | null;
					logo?: string | null;
					font?: string | null;
					subdomain: string;
					customDomain?: string | null;
					defaultForPreview: boolean;
					userId: number;
					created_at: string;
					updated_at: string;
				} | null;
			} | null;
		} | null;
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
			imageUrl?: string | null;
			roleId: number;
			language: string;
			currency: string;
			marketing_product_news: boolean;
			marketing_company_news: boolean;
			created_at: string;
			updated_at: string;
		} | null;
	};
};

export type ForgotPasswordMutationVariables = Exact<{
	email: Scalars["String"];
}>;

export type ForgotPasswordMutation = {
	__typename?: "Mutation";
	forgotPassword: boolean;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type ResendVerificationEmailMutationVariables = Exact<{
	email: Scalars["String"];
}>;

export type ResendVerificationEmailMutation = {
	__typename?: "Mutation";
	resendVerificationEmail: boolean;
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
			imageUrl?: string | null;
			roleId: number;
			language: string;
			currency: string;
			marketing_product_news: boolean;
			marketing_company_news: boolean;
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

export type MeStaffQueryVariables = Exact<{ [key: string]: never }>;

export type MeStaffQuery = {
	__typename?: "Query";
	meStaff?: {
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
		language: string;
		currency: string;
		marketing_product_news: boolean;
		marketing_company_news: boolean;
		created_at: string;
		updated_at: string;
		staff?: {
			__typename?: "Staff";
			id: number;
			userId: number;
			tenantId: number;
			status: string;
			created_at: string;
			updated_at: string;
			tenant?: {
				__typename?: "Tenant";
				id: number;
				name: string;
				desc?: string | null;
				address?: string | null;
				logo?: string | null;
				font?: string | null;
				subdomain: string;
				customDomain?: string | null;
				defaultForPreview: boolean;
				userId: number;
				created_at: string;
				updated_at: string;
			} | null;
		} | null;
	} | null;
};

export type RolesQueryVariables = Exact<{ [key: string]: never }>;

export type RolesQuery = {
	__typename?: "Query";
	roles: Array<{
		__typename?: "UserRole";
		id: number;
		name: string;
		created_at: string;
		updated_at: string;
	}>;
};

export type StaffsQueryVariables = Exact<{
	roleId?: InputMaybe<Scalars["Int"]>;
}>;

export type StaffsQuery = {
	__typename?: "Query";
	staffs?: Array<{
		__typename?: "Staff";
		id: number;
		userId: number;
		tenantId: number;
		status: string;
		created_at: string;
		updated_at: string;
		tenant?: {
			__typename?: "Tenant";
			id: number;
			name: string;
			desc?: string | null;
			address?: string | null;
			logo?: string | null;
			font?: string | null;
			subdomain: string;
			customDomain?: string | null;
			defaultForPreview: boolean;
			userId: number;
			created_at: string;
			updated_at: string;
		} | null;
		user?: {
			__typename?: "User";
			first_name: string;
			last_name: string;
			email: string;
			imageUrl?: string | null;
			roleId: number;
			created_at: string;
			updated_at: string;
			role: {
				__typename?: "UserRole";
				id: number;
				name: string;
				created_at: string;
				updated_at: string;
			};
		} | null;
	}> | null;
};

export type TenantCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type TenantCategoriesQuery = {
	__typename?: "Query";
	tenantCategories: Array<{
		__typename?: "TenantCategory";
		id: number;
		name: string;
		identifier: string;
		desc?: string | null;
		created_at: string;
		updated_at: string;
	}>;
};

export type UserByEmailQueryVariables = Exact<{
	email: Scalars["String"];
}>;

export type UserByEmailQuery = {
	__typename?: "Query";
	userByEmail: {
		__typename?: "UserDataResponse";
		id: number;
		first_name: string;
		last_name?: string | null;
		email: string;
		email_verified: boolean;
		phone_number?: string | null;
		phone_number_verified: boolean;
		imageUrl?: string | null;
		roleId: number;
		role: { __typename?: "UserRole"; id: number; name: string };
		staff?: {
			__typename?: "Staff";
			id: number;
			userId: number;
			tenantId: number;
			status: string;
			created_at: string;
			updated_at: string;
			tenant?: {
				__typename?: "Tenant";
				id: number;
				name: string;
				desc?: string | null;
				address?: string | null;
				logo?: string | null;
				font?: string | null;
				subdomain: string;
				customDomain?: string | null;
				defaultForPreview: boolean;
				userId: number;
				created_at: string;
				updated_at: string;
			} | null;
		} | null;
	};
};

export const RegularErrorFragmentDoc = gql`
	fragment RegularError on FieldError {
		field
		message
	}
`;
export const RoleFragmentFragmentDoc = gql`
	fragment RoleFragment on UserRole {
		id
		name
		created_at
		updated_at
	}
`;
export const StaffFragmentFragmentDoc = gql`
	fragment StaffFragment on Staff {
		id
		userId
		tenantId
		status
		created_at
		updated_at
	}
`;
export const TenantFragmentFragmentDoc = gql`
	fragment TenantFragment on Tenant {
		id
		name
		desc
		address
		logo
		font
		subdomain
		customDomain
		defaultForPreview
		userId
		created_at
		updated_at
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
		language
		currency
		marketing_product_news
		marketing_company_news
		created_at
		updated_at
	}
`;
export const AddStaffDocument = gql`
	mutation AddStaff($roleId: Int!, $userId: Int!) {
		addStaff(roleId: $roleId, userId: $userId) {
			...StaffFragment
			tenant {
				...TenantFragment
			}
			user {
				first_name
				last_name
				email
				imageUrl
				roleId
				created_at
				updated_at
				role {
					...RoleFragment
				}
			}
		}
	}
	${StaffFragmentFragmentDoc}
	${TenantFragmentFragmentDoc}
	${RoleFragmentFragmentDoc}
`;
export type AddStaffMutationFn = Apollo.MutationFunction<
	AddStaffMutation,
	AddStaffMutationVariables
>;

/**
 * __useAddStaffMutation__
 *
 * To run a mutation, you first call `useAddStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStaffMutation, { data, loading, error }] = useAddStaffMutation({
 *   variables: {
 *      roleId: // value for 'roleId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddStaffMutation(
	baseOptions?: Apollo.MutationHookOptions<
		AddStaffMutation,
		AddStaffMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<AddStaffMutation, AddStaffMutationVariables>(
		AddStaffDocument,
		options
	);
}
export type AddStaffMutationHookResult = ReturnType<typeof useAddStaffMutation>;
export type AddStaffMutationResult = Apollo.MutationResult<AddStaffMutation>;
export type AddStaffMutationOptions = Apollo.BaseMutationOptions<
	AddStaffMutation,
	AddStaffMutationVariables
>;
export const DeleteStaffDocument = gql`
	mutation DeleteStaff($userId: Int!) {
		deleteStaff(userId: $userId)
	}
`;
export type DeleteStaffMutationFn = Apollo.MutationFunction<
	DeleteStaffMutation,
	DeleteStaffMutationVariables
>;

/**
 * __useDeleteStaffMutation__
 *
 * To run a mutation, you first call `useDeleteStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStaffMutation, { data, loading, error }] = useDeleteStaffMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteStaffMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteStaffMutation,
		DeleteStaffMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<DeleteStaffMutation, DeleteStaffMutationVariables>(
		DeleteStaffDocument,
		options
	);
}
export type DeleteStaffMutationHookResult = ReturnType<
	typeof useDeleteStaffMutation
>;
export type DeleteStaffMutationResult =
	Apollo.MutationResult<DeleteStaffMutation>;
export type DeleteStaffMutationOptions = Apollo.BaseMutationOptions<
	DeleteStaffMutation,
	DeleteStaffMutationVariables
>;
export const UpdateRoleDocument = gql`
	mutation UpdateRole($newroleId: Int!, $userId: Int!) {
		updateRole(newroleId: $newroleId, userId: $userId) {
			...StaffFragment
			tenant {
				...TenantFragment
			}
			user {
				first_name
				last_name
				email
				imageUrl
				roleId
				created_at
				updated_at
				role {
					...RoleFragment
				}
			}
		}
	}
	${StaffFragmentFragmentDoc}
	${TenantFragmentFragmentDoc}
	${RoleFragmentFragmentDoc}
`;
export type UpdateRoleMutationFn = Apollo.MutationFunction<
	UpdateRoleMutation,
	UpdateRoleMutationVariables
>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      newroleId: // value for 'newroleId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateRoleMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateRoleMutation,
		UpdateRoleMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(
		UpdateRoleDocument,
		options
	);
}
export type UpdateRoleMutationHookResult = ReturnType<
	typeof useUpdateRoleMutation
>;
export type UpdateRoleMutationResult =
	Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<
	UpdateRoleMutation,
	UpdateRoleMutationVariables
>;
export const UpdateStaffStatusDocument = gql`
	mutation UpdateStaffStatus($status: String!, $userId: Int!) {
		updateStaffStatus(status: $status, userId: $userId) {
			...StaffFragment
			tenant {
				...TenantFragment
			}
			user {
				first_name
				last_name
				email
				imageUrl
				roleId
				created_at
				updated_at
				role {
					...RoleFragment
				}
			}
		}
	}
	${StaffFragmentFragmentDoc}
	${TenantFragmentFragmentDoc}
	${RoleFragmentFragmentDoc}
`;
export type UpdateStaffStatusMutationFn = Apollo.MutationFunction<
	UpdateStaffStatusMutation,
	UpdateStaffStatusMutationVariables
>;

/**
 * __useUpdateStaffStatusMutation__
 *
 * To run a mutation, you first call `useUpdateStaffStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStaffStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStaffStatusMutation, { data, loading, error }] = useUpdateStaffStatusMutation({
 *   variables: {
 *      status: // value for 'status'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateStaffStatusMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateStaffStatusMutation,
		UpdateStaffStatusMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateStaffStatusMutation,
		UpdateStaffStatusMutationVariables
	>(UpdateStaffStatusDocument, options);
}
export type UpdateStaffStatusMutationHookResult = ReturnType<
	typeof useUpdateStaffStatusMutation
>;
export type UpdateStaffStatusMutationResult =
	Apollo.MutationResult<UpdateStaffStatusMutation>;
export type UpdateStaffStatusMutationOptions = Apollo.BaseMutationOptions<
	UpdateStaffStatusMutation,
	UpdateStaffStatusMutationVariables
>;
export const AdminLoginDocument = gql`
	mutation AdminLogin($email: String!, $password: String!) {
		adminLogin(email: $email, password: $password) {
			errors {
				field
				message
			}
			user {
				...UserFragment
				staff {
					...StaffFragment
					tenant {
						...TenantFragment
					}
				}
			}
		}
	}
	${UserFragmentFragmentDoc}
	${StaffFragmentFragmentDoc}
	${TenantFragmentFragmentDoc}
`;
export type AdminLoginMutationFn = Apollo.MutationFunction<
	AdminLoginMutation,
	AdminLoginMutationVariables
>;

/**
 * __useAdminLoginMutation__
 *
 * To run a mutation, you first call `useAdminLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminLoginMutation, { data, loading, error }] = useAdminLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAdminLoginMutation(
	baseOptions?: Apollo.MutationHookOptions<
		AdminLoginMutation,
		AdminLoginMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<AdminLoginMutation, AdminLoginMutationVariables>(
		AdminLoginDocument,
		options
	);
}
export type AdminLoginMutationHookResult = ReturnType<
	typeof useAdminLoginMutation
>;
export type AdminLoginMutationResult =
	Apollo.MutationResult<AdminLoginMutation>;
export type AdminLoginMutationOptions = Apollo.BaseMutationOptions<
	AdminLoginMutation,
	AdminLoginMutationVariables
>;
export const AdminRegisterDocument = gql`
	mutation AdminRegister($options: AdminRegisterInput!) {
		adminRegister(options: $options) {
			errors {
				field
				message
			}
			user {
				...UserFragment
				staff {
					...StaffFragment
					tenant {
						...TenantFragment
					}
				}
			}
		}
	}
	${UserFragmentFragmentDoc}
	${StaffFragmentFragmentDoc}
	${TenantFragmentFragmentDoc}
`;
export type AdminRegisterMutationFn = Apollo.MutationFunction<
	AdminRegisterMutation,
	AdminRegisterMutationVariables
>;

/**
 * __useAdminRegisterMutation__
 *
 * To run a mutation, you first call `useAdminRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminRegisterMutation, { data, loading, error }] = useAdminRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAdminRegisterMutation(
	baseOptions?: Apollo.MutationHookOptions<
		AdminRegisterMutation,
		AdminRegisterMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		AdminRegisterMutation,
		AdminRegisterMutationVariables
	>(AdminRegisterDocument, options);
}
export type AdminRegisterMutationHookResult = ReturnType<
	typeof useAdminRegisterMutation
>;
export type AdminRegisterMutationResult =
	Apollo.MutationResult<AdminRegisterMutation>;
export type AdminRegisterMutationOptions = Apollo.BaseMutationOptions<
	AdminRegisterMutation,
	AdminRegisterMutationVariables
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
export const MeStaffDocument = gql`
	query MeStaff {
		meStaff {
			...UserFragment
			staff {
				...StaffFragment
				tenant {
					...TenantFragment
				}
			}
		}
	}
	${UserFragmentFragmentDoc}
	${StaffFragmentFragmentDoc}
	${TenantFragmentFragmentDoc}
`;

/**
 * __useMeStaffQuery__
 *
 * To run a query within a React component, call `useMeStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeStaffQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeStaffQuery(
	baseOptions?: Apollo.QueryHookOptions<MeStaffQuery, MeStaffQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<MeStaffQuery, MeStaffQueryVariables>(
		MeStaffDocument,
		options
	);
}
export function useMeStaffLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<MeStaffQuery, MeStaffQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<MeStaffQuery, MeStaffQueryVariables>(
		MeStaffDocument,
		options
	);
}
export type MeStaffQueryHookResult = ReturnType<typeof useMeStaffQuery>;
export type MeStaffLazyQueryHookResult = ReturnType<typeof useMeStaffLazyQuery>;
export type MeStaffQueryResult = Apollo.QueryResult<
	MeStaffQuery,
	MeStaffQueryVariables
>;
export const RolesDocument = gql`
	query Roles {
		roles {
			...RoleFragment
		}
	}
	${RoleFragmentFragmentDoc}
`;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolesQuery(
	baseOptions?: Apollo.QueryHookOptions<RolesQuery, RolesQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<RolesQuery, RolesQueryVariables>(
		RolesDocument,
		options
	);
}
export function useRolesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<RolesQuery, RolesQueryVariables>(
		RolesDocument,
		options
	);
}
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesQueryResult = Apollo.QueryResult<
	RolesQuery,
	RolesQueryVariables
>;
export const StaffsDocument = gql`
	query Staffs($roleId: Int) {
		staffs(roleId: $roleId) {
			...StaffFragment
			tenant {
				...TenantFragment
			}
			user {
				first_name
				last_name
				email
				imageUrl
				roleId
				created_at
				updated_at
				role {
					...RoleFragment
				}
			}
		}
	}
	${StaffFragmentFragmentDoc}
	${TenantFragmentFragmentDoc}
	${RoleFragmentFragmentDoc}
`;

/**
 * __useStaffsQuery__
 *
 * To run a query within a React component, call `useStaffsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffsQuery({
 *   variables: {
 *      roleId: // value for 'roleId'
 *   },
 * });
 */
export function useStaffsQuery(
	baseOptions?: Apollo.QueryHookOptions<StaffsQuery, StaffsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<StaffsQuery, StaffsQueryVariables>(
		StaffsDocument,
		options
	);
}
export function useStaffsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<StaffsQuery, StaffsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<StaffsQuery, StaffsQueryVariables>(
		StaffsDocument,
		options
	);
}
export type StaffsQueryHookResult = ReturnType<typeof useStaffsQuery>;
export type StaffsLazyQueryHookResult = ReturnType<typeof useStaffsLazyQuery>;
export type StaffsQueryResult = Apollo.QueryResult<
	StaffsQuery,
	StaffsQueryVariables
>;
export const TenantCategoriesDocument = gql`
	query TenantCategories {
		tenantCategories {
			id
			name
			identifier
			desc
			created_at
			updated_at
		}
	}
`;

/**
 * __useTenantCategoriesQuery__
 *
 * To run a query within a React component, call `useTenantCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTenantCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTenantCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTenantCategoriesQuery(
	baseOptions?: Apollo.QueryHookOptions<
		TenantCategoriesQuery,
		TenantCategoriesQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<TenantCategoriesQuery, TenantCategoriesQueryVariables>(
		TenantCategoriesDocument,
		options
	);
}
export function useTenantCategoriesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		TenantCategoriesQuery,
		TenantCategoriesQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		TenantCategoriesQuery,
		TenantCategoriesQueryVariables
	>(TenantCategoriesDocument, options);
}
export type TenantCategoriesQueryHookResult = ReturnType<
	typeof useTenantCategoriesQuery
>;
export type TenantCategoriesLazyQueryHookResult = ReturnType<
	typeof useTenantCategoriesLazyQuery
>;
export type TenantCategoriesQueryResult = Apollo.QueryResult<
	TenantCategoriesQuery,
	TenantCategoriesQueryVariables
>;
export const UserByEmailDocument = gql`
	query UserByEmail($email: String!) {
		userByEmail(email: $email) {
			id
			first_name
			last_name
			email
			email_verified
			phone_number
			phone_number_verified
			imageUrl
			roleId
			role {
				id
				name
			}
			staff {
				...StaffFragment
				tenant {
					...TenantFragment
				}
			}
		}
	}
	${StaffFragmentFragmentDoc}
	${TenantFragmentFragmentDoc}
`;

/**
 * __useUserByEmailQuery__
 *
 * To run a query within a React component, call `useUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserByEmailQuery(
	baseOptions: Apollo.QueryHookOptions<
		UserByEmailQuery,
		UserByEmailQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<UserByEmailQuery, UserByEmailQueryVariables>(
		UserByEmailDocument,
		options
	);
}
export function useUserByEmailLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		UserByEmailQuery,
		UserByEmailQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<UserByEmailQuery, UserByEmailQueryVariables>(
		UserByEmailDocument,
		options
	);
}
export type UserByEmailQueryHookResult = ReturnType<typeof useUserByEmailQuery>;
export type UserByEmailLazyQueryHookResult = ReturnType<
	typeof useUserByEmailLazyQuery
>;
export type UserByEmailQueryResult = Apollo.QueryResult<
	UserByEmailQuery,
	UserByEmailQueryVariables
>;
