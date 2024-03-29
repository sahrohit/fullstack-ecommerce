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

export type DomainErrorResponse = {
	__typename?: "DomainErrorResponse";
	code: Scalars["String"];
	message: Scalars["String"];
};

export type DomainJsonResponse = {
	__typename?: "DomainJsonResponse";
	apexName?: Maybe<Scalars["String"]>;
	createdAt?: Maybe<Scalars["String"]>;
	error?: Maybe<DomainErrorResponse>;
	gitBranch?: Maybe<Scalars["String"]>;
	name?: Maybe<Scalars["String"]>;
	projectId?: Maybe<Scalars["String"]>;
	redirect?: Maybe<Scalars["String"]>;
	redirectStatusCode?: Maybe<Scalars["Int"]>;
	updatedAt?: Maybe<Scalars["String"]>;
	verification?: Maybe<Array<VerificationResponse>>;
	verified?: Maybe<Scalars["String"]>;
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
	addDiscount?: Maybe<DiscountResponse>;
	addReview?: Maybe<ProductReview>;
	addStaff: Staff;
	addToCart: Cart;
	addToFavourite: Favourite;
	adminLogin: UserResponse;
	adminRegister: UserResponse;
	changePassword: UserResponse;
	clearCart: Scalars["Boolean"];
	createCategory: ProductCategory;
	createComment: IssueComment;
	createIssue: Issue;
	createOrder: OrderDetail;
	createPayment: CreatePaymentResponse;
	createShippingMethod: ShippingMethod;
	deleteAddress: Scalars["Boolean"];
	deleteCategory: Scalars["Boolean"];
	deleteDiscount?: Maybe<Scalars["Boolean"]>;
	deleteFromCart: Scalars["Boolean"];
	deleteShippingMethod: Scalars["Boolean"];
	deleteStaff: Scalars["Boolean"];
	emailInvoice: Scalars["Boolean"];
	forgotPassword: Scalars["Boolean"];
	generateInvoice?: Maybe<Scalars["String"]>;
	login: UserResponse;
	logout: Scalars["Boolean"];
	register: UserResponse;
	removeFromFavourite: Scalars["Boolean"];
	requestKYCVerfication: TenantKyc;
	resendVerificationEmail: Scalars["Boolean"];
	resolveByCustomer: Scalars["Boolean"];
	updateAddress: Address;
	updateCart: Cart;
	updateCategory: ProductCategory;
	updateCustomDomain: Tenant;
	updateDiscount?: Maybe<DiscountResponse>;
	updateIssue: Issue;
	updateLanguagePreference: Scalars["Boolean"];
	updateMarketingPreference: Scalars["Boolean"];
	updatePassword: UserResponse;
	updateProfile: User;
	updateReview?: Maybe<ProductReview>;
	updateRole: Staff;
	updateShippingMethod: ShippingMethod;
	updateStaffStatus: Staff;
	updateStatus: OrderDetail;
	updateSubDomain: Tenant;
	updateTenant: Tenant;
	updateTenantContact: TenantContact;
	verifyEmail: Scalars["Boolean"];
};

export type MutationAddAddressArgs = {
	input: AddressInput;
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

export type MutationCreateCategoryArgs = {
	desc: Scalars["String"];
	imageURL: Scalars["String"];
	name: Scalars["String"];
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

export type MutationCreateShippingMethodArgs = {
	dispatch_in: Scalars["Int"];
	name: Scalars["String"];
	price: Scalars["Int"];
};

export type MutationDeleteAddressArgs = {
	id: Scalars["Int"];
};

export type MutationDeleteCategoryArgs = {
	id: Scalars["Int"];
};

export type MutationDeleteDiscountArgs = {
	id: Scalars["Float"];
};

export type MutationDeleteFromCartArgs = {
	inventoryId: Scalars["Int"];
	quantity: Scalars["Int"];
};

export type MutationDeleteShippingMethodArgs = {
	id: Scalars["Int"];
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

export type MutationRequestKycVerficationArgs = {
	options: TenantKycInput;
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
	id: Scalars["Int"];
	options: UpdateCategoryInput;
};

export type MutationUpdateCustomDomainArgs = {
	customDomain: Scalars["String"];
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

export type MutationUpdateShippingMethodArgs = {
	dispatch_in: Scalars["Int"];
	id: Scalars["Int"];
	name: Scalars["String"];
	price: Scalars["Int"];
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

export type MutationUpdateSubDomainArgs = {
	subdomain: Scalars["String"];
};

export type MutationUpdateTenantArgs = {
	address: Scalars["String"];
	categoryId: Scalars["Int"];
	desc: Scalars["String"];
	name: Scalars["String"];
};

export type MutationUpdateTenantContactArgs = {
	options: TenantContactInput;
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
	tenant: Tenant;
	tenantId: Scalars["Int"];
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
	tenant: Tenant;
	tenantId: Scalars["Int"];
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
	details: Tenant;
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
	shippingmethodsByTenant: Array<ShippingMethod>;
	staffs?: Maybe<Array<Staff>>;
	tenantCategories: Array<TenantCategory>;
	tenantContacts?: Maybe<TenantContact>;
	tenantKYC?: Maybe<TenantKyc>;
	userByEmail: UserDataResponse;
	variants: Array<Variant>;
	verifyDomain: VerifyDomainResponse;
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

export type QueryVerifyDomainArgs = {
	domain: Scalars["String"];
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
	tenant: Tenant;
	tenantId: Scalars["Int"];
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
	user: UserDataResponse;
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

export type TenantContact = {
	__typename?: "TenantContact";
	created_at: Scalars["String"];
	facebook?: Maybe<Scalars["String"]>;
	id: Scalars["Int"];
	instagram?: Maybe<Scalars["String"]>;
	ncell?: Maybe<Scalars["String"]>;
	ntc?: Maybe<Scalars["String"]>;
	primary?: Maybe<Scalars["String"]>;
	secondary?: Maybe<Scalars["String"]>;
	tenantId: Scalars["Int"];
	tiktok?: Maybe<Scalars["String"]>;
	twitter?: Maybe<Scalars["String"]>;
	updated_at: Scalars["String"];
	viber?: Maybe<Scalars["String"]>;
	whatsapp?: Maybe<Scalars["String"]>;
};

export type TenantContactInput = {
	facebook?: InputMaybe<Scalars["String"]>;
	instagram?: InputMaybe<Scalars["String"]>;
	ncell?: InputMaybe<Scalars["String"]>;
	ntc?: InputMaybe<Scalars["String"]>;
	primary?: InputMaybe<Scalars["String"]>;
	secondary?: InputMaybe<Scalars["String"]>;
	tiktok?: InputMaybe<Scalars["String"]>;
	twitter?: InputMaybe<Scalars["String"]>;
	viber?: InputMaybe<Scalars["String"]>;
	whatsapp?: InputMaybe<Scalars["String"]>;
};

export type TenantKycInput = {
	account_name: Scalars["String"];
	account_number: Scalars["String"];
	address: Scalars["String"];
	bank_branch: Scalars["String"];
	bank_name: Scalars["String"];
	name: Scalars["String"];
	pan_document: Scalars["String"];
	pan_number: Scalars["String"];
	phone_number: Scalars["String"];
	registration_document: Scalars["String"];
};

export type TenantKyc = {
	__typename?: "TenantKyc";
	account_name: Scalars["String"];
	account_number: Scalars["String"];
	address: Scalars["String"];
	bank_branch: Scalars["String"];
	bank_name: Scalars["String"];
	created_at: Scalars["String"];
	id: Scalars["Int"];
	name: Scalars["String"];
	pan_document: Scalars["String"];
	pan_number: Scalars["String"];
	phone_number: Scalars["String"];
	registration_document: Scalars["String"];
	status: Scalars["String"];
	tenantId: Scalars["Int"];
	updated_at: Scalars["String"];
};

export type UpdateCategoryInput = {
	desc?: InputMaybe<Scalars["String"]>;
	imageURL?: InputMaybe<Scalars["String"]>;
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

export type VerificationResponse = {
	__typename?: "VerificationResponse";
	domain: Scalars["String"];
	reason: Scalars["String"];
	type: Scalars["String"];
	value: Scalars["String"];
};

export type VerifyDomainResponse = {
	__typename?: "VerifyDomainResponse";
	domainJson: DomainJsonResponse;
	status: Scalars["String"];
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
	tenantId: number;
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

export type IssueCategoryFragmentFragment = {
	__typename?: "IssueCategory";
	id: number;
	name: string;
	identifier: string;
	desc: string;
	created_at: string;
	updated_at: string;
};

export type IssueCommentFragmentFragment = {
	__typename?: "IssueComment";
	id: number;
	content: string;
	html?: string | null;
	completed_at?: string | null;
	issueId: number;
	userId: number;
	created_at: string;
	updated_at: string;
};

export type IssueFragmentFragment = {
	__typename?: "Issue";
	id: number;
	subject: string;
	content: string;
	html?: string | null;
	status: string;
	completed_at?: string | null;
	categoryId: number;
	userId: number;
	created_at: string;
	updated_at: string;
};

export type OrderDetailFragmentFragment = {
	__typename?: "OrderDetail";
	id: string;
	userId: number;
	addressId: number;
	amount: number;
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
	orderitems?: Array<{
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
					tenantId: number;
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
				tenantId: number;
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
		tenantId: number;
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

export type RoleFragmentFragment = {
	__typename?: "UserRole";
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
};

export type ShippingMethodFragmentFragment = {
	__typename?: "ShippingMethod";
	id: number;
	name: string;
	price: number;
	dispatch_in: number;
	tenantId: number;
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
	categoryId: number;
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

export type CreateCategoryMutationVariables = Exact<{
	name: Scalars["String"];
	desc: Scalars["String"];
	imageURL: Scalars["String"];
}>;

export type CreateCategoryMutation = {
	__typename?: "Mutation";
	createCategory: {
		__typename?: "ProductCategory";
		id: number;
		name: string;
		identifier: string;
		desc: string;
		imageURL: string;
		tenantId: number;
		created_at: string;
		updated_at: string;
	};
};

export type DeleteCategoryMutationVariables = Exact<{
	id: Scalars["Int"];
}>;

export type DeleteCategoryMutation = {
	__typename?: "Mutation";
	deleteCategory: boolean;
};

export type UpdateCategoryMutationVariables = Exact<{
	options: UpdateCategoryInput;
	id: Scalars["Int"];
}>;

export type UpdateCategoryMutation = {
	__typename?: "Mutation";
	updateCategory: {
		__typename?: "ProductCategory";
		id: number;
		name: string;
		identifier: string;
		desc: string;
		imageURL: string;
		tenantId: number;
		created_at: string;
		updated_at: string;
	};
};

export type UpdateCustomDomainMutationVariables = Exact<{
	customDomain: Scalars["String"];
}>;

export type UpdateCustomDomainMutation = {
	__typename?: "Mutation";
	updateCustomDomain: {
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
		categoryId: number;
		created_at: string;
		updated_at: string;
	};
};

export type UpdateSubDomainMutationVariables = Exact<{
	subdomain: Scalars["String"];
}>;

export type UpdateSubDomainMutation = {
	__typename?: "Mutation";
	updateSubDomain: {
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
		categoryId: number;
		created_at: string;
		updated_at: string;
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

export type EmailInvoiceMutationVariables = Exact<{
	email: Scalars["String"];
	orderId: Scalars["String"];
}>;

export type EmailInvoiceMutation = {
	__typename?: "Mutation";
	emailInvoice: boolean;
};

export type GenerateInvoiceMutationVariables = Exact<{
	orderId: Scalars["String"];
}>;

export type GenerateInvoiceMutation = {
	__typename?: "Mutation";
	generateInvoice?: string | null;
};

export type CreateCommentMutationVariables = Exact<{
	issueId: Scalars["Int"];
	content: Scalars["String"];
}>;

export type CreateCommentMutation = {
	__typename?: "Mutation";
	createComment: {
		__typename?: "IssueComment";
		id: number;
		content: string;
		html?: string | null;
		completed_at?: string | null;
		issueId: number;
		userId: number;
		created_at: string;
		updated_at: string;
	};
};

export type CreateIssueMutationVariables = Exact<{
	input: IssueInput;
}>;

export type CreateIssueMutation = {
	__typename?: "Mutation";
	createIssue: {
		__typename?: "Issue";
		id: number;
		subject: string;
		content: string;
		html?: string | null;
		status: string;
		completed_at?: string | null;
		categoryId: number;
		userId: number;
		created_at: string;
		updated_at: string;
	};
};

export type ResolveByCustomerMutationVariables = Exact<{
	issueId: Scalars["Int"];
}>;

export type ResolveByCustomerMutation = {
	__typename?: "Mutation";
	resolveByCustomer: boolean;
};

export type RequestKycVerficationMutationVariables = Exact<{
	options: TenantKycInput;
}>;

export type RequestKycVerficationMutation = {
	__typename?: "Mutation";
	requestKYCVerfication: {
		__typename?: "TenantKyc";
		id: number;
		name: string;
		address: string;
		phone_number: string;
		pan_number: string;
		bank_name: string;
		bank_branch: string;
		account_number: string;
		account_name: string;
		registration_document: string;
		pan_document: string;
		status: string;
		tenantId: number;
		created_at: string;
		updated_at: string;
	};
};

export type CreateOrderMutationVariables = Exact<{
	options: CreateOrderInput;
}>;

export type CreateOrderMutation = {
	__typename?: "Mutation";
	createOrder: {
		__typename?: "OrderDetail";
		id: string;
		userId: number;
		addressId: number;
		amount: number;
		shippingId: number;
		promoId?: number | null;
		status: string;
		created_at: string;
		updated_at: string;
	};
};

export type CreatePaymentMutationVariables = Exact<{
	provider: Scalars["String"];
	orderId: Scalars["String"];
}>;

export type CreatePaymentMutation = {
	__typename?: "Mutation";
	createPayment: {
		__typename?: "CreatePaymentResponse";
		provider: string;
		amt?: number | null;
		psc?: number | null;
		pdc?: number | null;
		txAmt?: number | null;
		tAmt?: number | null;
		pid?: string | null;
		scd?: string | null;
		paymentUrl?: string | null;
		paymentId?: string | null;
	};
};

export type UpdateStatusMutationVariables = Exact<{
	pidx?: InputMaybe<Scalars["String"]>;
	refId?: InputMaybe<Scalars["String"]>;
	orderId: Scalars["String"];
}>;

export type UpdateStatusMutation = {
	__typename?: "Mutation";
	updateStatus: {
		__typename?: "OrderDetail";
		id: string;
		userId: number;
		addressId: number;
		amount: number;
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
		orderitems?: Array<{
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
						tenantId: number;
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
};

export type AddReviewMutationVariables = Exact<{
	isAnonymous: Scalars["Boolean"];
	desc: Scalars["String"];
	rating: Scalars["Int"];
	productId: Scalars["Int"];
	review: Scalars["String"];
}>;

export type AddReviewMutation = {
	__typename?: "Mutation";
	addReview?: {
		__typename?: "ProductReview";
		id: number;
		productId: number;
		userId: number;
		rating: number;
		review: string;
		desc: string;
		isAnonymous: boolean;
		created_at: string;
		updated_at: string;
	} | null;
};

export type UpdateReviewMutationVariables = Exact<{
	isAnonymous: Scalars["Boolean"];
	desc: Scalars["String"];
	review: Scalars["String"];
	rating: Scalars["Int"];
	productId: Scalars["Int"];
}>;

export type UpdateReviewMutation = {
	__typename?: "Mutation";
	updateReview?: {
		__typename?: "ProductReview";
		id: number;
		productId: number;
		userId: number;
		rating: number;
		review: string;
		desc: string;
		isAnonymous: boolean;
		created_at: string;
		updated_at: string;
	} | null;
};

export type CreateShippingMethodMutationVariables = Exact<{
	price: Scalars["Int"];
	dispatch_in: Scalars["Int"];
	name: Scalars["String"];
}>;

export type CreateShippingMethodMutation = {
	__typename?: "Mutation";
	createShippingMethod: {
		__typename?: "ShippingMethod";
		id: number;
		name: string;
		price: number;
		dispatch_in: number;
		tenantId: number;
		created_at: string;
		updated_at: string;
	};
};

export type DeleteShippingMethodMutationVariables = Exact<{
	id: Scalars["Int"];
}>;

export type DeleteShippingMethodMutation = {
	__typename?: "Mutation";
	deleteShippingMethod: boolean;
};

export type UpdateShippingMethodMutationVariables = Exact<{
	price: Scalars["Int"];
	dispatch_in: Scalars["Int"];
	name: Scalars["String"];
	id: Scalars["Int"];
}>;

export type UpdateShippingMethodMutation = {
	__typename?: "Mutation";
	updateShippingMethod: {
		__typename?: "ShippingMethod";
		id: number;
		name: string;
		price: number;
		dispatch_in: number;
		tenantId: number;
		created_at: string;
		updated_at: string;
	};
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
			categoryId: number;
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
			categoryId: number;
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
			categoryId: number;
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

export type UpdateTenantMutationVariables = Exact<{
	address: Scalars["String"];
	desc: Scalars["String"];
	categoryId: Scalars["Int"];
	name: Scalars["String"];
}>;

export type UpdateTenantMutation = {
	__typename?: "Mutation";
	updateTenant: {
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
		categoryId: number;
		created_at: string;
		updated_at: string;
	};
};

export type UpdateTenantContactMutationVariables = Exact<{
	option: TenantContactInput;
}>;

export type UpdateTenantContactMutation = {
	__typename?: "Mutation";
	updateTenantContact: {
		__typename?: "TenantContact";
		id: number;
		primary?: string | null;
		secondary?: string | null;
		ntc?: string | null;
		ncell?: string | null;
		facebook?: string | null;
		instagram?: string | null;
		tiktok?: string | null;
		twitter?: string | null;
		whatsapp?: string | null;
		viber?: string | null;
		tenantId: number;
		created_at: string;
		updated_at: string;
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
					categoryId: number;
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
					categoryId: number;
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
			language: string;
			currency: string;
			marketing_product_news: boolean;
			marketing_company_news: boolean;
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
			language: string;
			currency: string;
			marketing_product_news: boolean;
			marketing_company_news: boolean;
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

export type UpdateLanguagePreferenceMutationVariables = Exact<{
	currency: Scalars["String"];
	language: Scalars["String"];
}>;

export type UpdateLanguagePreferenceMutation = {
	__typename?: "Mutation";
	updateLanguagePreference: boolean;
};

export type UpdateMarketingPreferenceMutationVariables = Exact<{
	marketing_company_news: Scalars["Boolean"];
	marketing_product_news: Scalars["Boolean"];
}>;

export type UpdateMarketingPreferenceMutation = {
	__typename?: "Mutation";
	updateMarketingPreference: boolean;
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

export type UpdateProfileMutationVariables = Exact<{
	first_name: Scalars["String"];
	last_name: Scalars["String"];
	imageUrl: Scalars["String"];
}>;

export type UpdateProfileMutation = {
	__typename?: "Mutation";
	updateProfile: {
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
					tenantId: number;
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

export type CategoriesSummaryQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesSummaryQuery = {
	__typename?: "Query";
	categoriesSummary?: Array<{
		__typename?: "ProductCategoryWithProductCount";
		id: number;
		name: string;
		identifier: string;
		desc: string;
		imageURL: string;
		tenantId: number;
		product_count: number;
		created_at: string;
		updated_at: string;
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
		tenantId: number;
		created_at: string;
		updated_at: string;
	}>;
};

export type VerifyDomainQueryVariables = Exact<{
	domain: Scalars["String"];
}>;

export type VerifyDomainQuery = {
	__typename?: "Query";
	verifyDomain: {
		__typename?: "VerifyDomainResponse";
		status: string;
		domainJson: {
			__typename?: "DomainJsonResponse";
			name?: string | null;
			apexName?: string | null;
			projectId?: string | null;
			redirect?: string | null;
			redirectStatusCode?: number | null;
			gitBranch?: string | null;
			updatedAt?: string | null;
			createdAt?: string | null;
			verified?: string | null;
			verification?: Array<{
				__typename?: "VerificationResponse";
				type: string;
				domain: string;
				value: string;
				reason: string;
			}> | null;
			error?: {
				__typename?: "DomainErrorResponse";
				code: string;
				message: string;
			} | null;
		};
	};
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
				tenantId: number;
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

export type IssuesQueryVariables = Exact<{ [key: string]: never }>;

export type IssuesQuery = {
	__typename?: "Query";
	issues: Array<{
		__typename?: "Issue";
		id: number;
		subject: string;
		content: string;
		html?: string | null;
		status: string;
		completed_at?: string | null;
		categoryId: number;
		userId: number;
		created_at: string;
		updated_at: string;
		comments?: Array<{
			__typename?: "IssueComment";
			id: number;
			content: string;
			html?: string | null;
			completed_at?: string | null;
			issueId: number;
			userId: number;
			created_at: string;
			updated_at: string;
		}> | null;
		category: {
			__typename?: "IssueCategory";
			id: number;
			name: string;
			identifier: string;
			desc: string;
			created_at: string;
			updated_at: string;
		};
	}>;
};

export type IssueCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type IssueCategoriesQuery = {
	__typename?: "Query";
	issueCategories: Array<{
		__typename?: "IssueCategory";
		id: number;
		name: string;
		identifier: string;
		desc: string;
		created_at: string;
		updated_at: string;
	}>;
};

export type IssuesWithCommentsQueryVariables = Exact<{
	issueId: Scalars["Int"];
}>;

export type IssuesWithCommentsQuery = {
	__typename?: "Query";
	issuesWithComments: {
		__typename?: "Issue";
		id: number;
		subject: string;
		content: string;
		html?: string | null;
		status: string;
		completed_at?: string | null;
		categoryId: number;
		userId: number;
		created_at: string;
		updated_at: string;
		comments?: Array<{
			__typename?: "IssueComment";
			id: number;
			content: string;
			html?: string | null;
			completed_at?: string | null;
			issueId: number;
			userId: number;
			created_at: string;
			updated_at: string;
			user: {
				__typename?: "User";
				first_name: string;
				last_name: string;
				imageUrl?: string | null;
				role: { __typename?: "UserRole"; name: string };
			};
		}> | null;
		category: {
			__typename?: "IssueCategory";
			id: number;
			name: string;
			identifier: string;
			desc: string;
			created_at: string;
			updated_at: string;
		};
		user: {
			__typename?: "User";
			first_name: string;
			last_name: string;
			imageUrl?: string | null;
			role: { __typename?: "UserRole"; name: string };
		};
	};
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
		amount: number;
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
		orderitems?: Array<{
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
						tenantId: number;
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
		amount: number;
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
		orderitems?: Array<{
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
						tenantId: number;
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
			tenantId: number;
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
			tenantId: number;
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

export type QueryProductsQueryVariables = Exact<{
	query: Scalars["String"];
	sort?: InputMaybe<Scalars["String"]>;
	limit?: InputMaybe<Scalars["Float"]>;
	offset?: InputMaybe<Scalars["Float"]>;
}>;

export type QueryProductsQuery = {
	__typename?: "Query";
	queryProducts?: {
		__typename?: "PaginatedProducts";
		hasMore: boolean;
		products: Array<{
			__typename?: "Product";
			id: number;
			identifier: string;
			name: string;
			images: Array<{ __typename?: "ProductImage"; imageURL: string }>;
			inventories?: Array<{
				__typename?: "ProductInventory";
				price: number;
			}> | null;
		}>;
	} | null;
};

export type SearchProductsQueryVariables = Exact<{
	query: Scalars["String"];
	limit?: InputMaybe<Scalars["Int"]>;
}>;

export type SearchProductsQuery = {
	__typename?: "Query";
	searchProducts?: Array<{
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
	}> | null;
};

export type ProductsSummaryQueryVariables = Exact<{ [key: string]: never }>;

export type ProductsSummaryQuery = {
	__typename?: "Query";
	productsSummary?: {
		__typename?: "ProductSummary";
		max: number;
		min: number;
		count: number;
	} | null;
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

export type AllReviewsQueryVariables = Exact<{
	productId: Scalars["Int"];
}>;

export type AllReviewsQuery = {
	__typename?: "Query";
	allReviews?: Array<{
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

export type ReviewByUserAndProductQueryVariables = Exact<{
	productId: Scalars["Int"];
}>;

export type ReviewByUserAndProductQuery = {
	__typename?: "Query";
	reviewByUserAndProduct?: {
		__typename?: "ProductReview";
		id: number;
		productId: number;
		userId: number;
		rating: number;
		review: string;
		desc: string;
		isAnonymous: boolean;
		created_at: string;
		updated_at: string;
	} | null;
};

export type ReviewSummaryQueryVariables = Exact<{
	productId: Scalars["Int"];
}>;

export type ReviewSummaryQuery = {
	__typename?: "Query";
	reviewSummary?: {
		__typename?: "ReviewSummaryResponse";
		count?: number | null;
		rating?: number | null;
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

export type ShippingmethodsQueryVariables = Exact<{ [key: string]: never }>;

export type ShippingmethodsQuery = {
	__typename?: "Query";
	shippingmethods: Array<{
		__typename?: "ShippingMethod";
		id: number;
		name: string;
		price: number;
		dispatch_in: number;
		tenantId: number;
		created_at: string;
		updated_at: string;
	}>;
};

export type ShippingmethodsByTenantQueryVariables = Exact<{
	[key: string]: never;
}>;

export type ShippingmethodsByTenantQuery = {
	__typename?: "Query";
	shippingmethodsByTenant: Array<{
		__typename?: "ShippingMethod";
		id: number;
		name: string;
		price: number;
		dispatch_in: number;
		tenantId: number;
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
			categoryId: number;
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

export type DetailsQueryVariables = Exact<{ [key: string]: never }>;

export type DetailsQuery = {
	__typename?: "Query";
	details: {
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
		categoryId: number;
		created_at: string;
		updated_at: string;
	};
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

export type TenantContactsQueryVariables = Exact<{ [key: string]: never }>;

export type TenantContactsQuery = {
	__typename?: "Query";
	tenantContacts?: {
		__typename?: "TenantContact";
		id: number;
		primary?: string | null;
		secondary?: string | null;
		ntc?: string | null;
		ncell?: string | null;
		facebook?: string | null;
		instagram?: string | null;
		tiktok?: string | null;
		twitter?: string | null;
		whatsapp?: string | null;
		viber?: string | null;
		tenantId: number;
		created_at: string;
		updated_at: string;
	} | null;
};

export type TenantKycQueryVariables = Exact<{ [key: string]: never }>;

export type TenantKycQuery = {
	__typename?: "Query";
	tenantKYC?: {
		__typename?: "TenantKyc";
		id: number;
		name: string;
		address: string;
		phone_number: string;
		pan_number: string;
		bank_name: string;
		bank_branch: string;
		account_number: string;
		account_name: string;
		registration_document: string;
		pan_document: string;
		status: string;
		tenantId: number;
		created_at: string;
		updated_at: string;
	} | null;
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
		language: string;
		currency: string;
		marketing_product_news: boolean;
		marketing_company_news: boolean;
		created_at: string;
		updated_at: string;
	} | null;
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
				categoryId: number;
				created_at: string;
				updated_at: string;
			} | null;
		} | null;
	} | null;
};

export type MeWithAccountQueryVariables = Exact<{ [key: string]: never }>;

export type MeWithAccountQuery = {
	__typename?: "Query";
	meWithAccount?: {
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
		accounts?: Array<{
			__typename?: "Account";
			id: number;
			userId: number;
			type: string;
			provider: string;
			providerAccountId: string;
			refresh_token?: string | null;
			expires_at?: number | null;
			token_type?: string | null;
			scope?: string | null;
			id_token?: string | null;
			session_state?: string | null;
			created_at: string;
			updated_at: string;
			access_token?: string | null;
		}> | null;
	} | null;
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
				categoryId: number;
				created_at: string;
				updated_at: string;
			} | null;
		} | null;
	};
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

export const IssueCategoryFragmentFragmentDoc = gql`
	fragment IssueCategoryFragment on IssueCategory {
		id
		name
		identifier
		desc
		created_at
		updated_at
	}
`;
export const IssueCommentFragmentFragmentDoc = gql`
	fragment IssueCommentFragment on IssueComment {
		id
		content
		html
		completed_at
		issueId
		userId
		created_at
		updated_at
	}
`;
export const IssueFragmentFragmentDoc = gql`
	fragment IssueFragment on Issue {
		id
		subject
		content
		html
		status
		completed_at
		categoryId
		userId
		created_at
		updated_at
	}
`;
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
		tenantId
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
		amount
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
export const RoleFragmentFragmentDoc = gql`
	fragment RoleFragment on UserRole {
		id
		name
		created_at
		updated_at
	}
`;
export const ShippingMethodFragmentFragmentDoc = gql`
	fragment ShippingMethodFragment on ShippingMethod {
		id
		name
		price
		dispatch_in
		tenantId
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
		categoryId
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
export const CreateCategoryDocument = gql`
	mutation CreateCategory($name: String!, $desc: String!, $imageURL: String!) {
		createCategory(name: $name, desc: $desc, imageURL: $imageURL) {
			id
			name
			identifier
			desc
			imageURL
			tenantId
			created_at
			updated_at
		}
	}
`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<
	CreateCategoryMutation,
	CreateCategoryMutationVariables
>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      desc: // value for 'desc'
 *      imageURL: // value for 'imageURL'
 *   },
 * });
 */
export function useCreateCategoryMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreateCategoryMutation,
		CreateCategoryMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		CreateCategoryMutation,
		CreateCategoryMutationVariables
	>(CreateCategoryDocument, options);
}
export type CreateCategoryMutationHookResult = ReturnType<
	typeof useCreateCategoryMutation
>;
export type CreateCategoryMutationResult =
	Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
	CreateCategoryMutation,
	CreateCategoryMutationVariables
>;
export const DeleteCategoryDocument = gql`
	mutation DeleteCategory($id: Int!) {
		deleteCategory(id: $id)
	}
`;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<
	DeleteCategoryMutation,
	DeleteCategoryMutationVariables
>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteCategoryMutation,
		DeleteCategoryMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		DeleteCategoryMutation,
		DeleteCategoryMutationVariables
	>(DeleteCategoryDocument, options);
}
export type DeleteCategoryMutationHookResult = ReturnType<
	typeof useDeleteCategoryMutation
>;
export type DeleteCategoryMutationResult =
	Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<
	DeleteCategoryMutation,
	DeleteCategoryMutationVariables
>;
export const UpdateCategoryDocument = gql`
	mutation UpdateCategory($options: UpdateCategoryInput!, $id: Int!) {
		updateCategory(options: $options, id: $id) {
			id
			name
			identifier
			desc
			imageURL
			tenantId
			created_at
			updated_at
		}
	}
`;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<
	UpdateCategoryMutation,
	UpdateCategoryMutationVariables
>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      options: // value for 'options'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateCategoryMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateCategoryMutation,
		UpdateCategoryMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateCategoryMutation,
		UpdateCategoryMutationVariables
	>(UpdateCategoryDocument, options);
}
export type UpdateCategoryMutationHookResult = ReturnType<
	typeof useUpdateCategoryMutation
>;
export type UpdateCategoryMutationResult =
	Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<
	UpdateCategoryMutation,
	UpdateCategoryMutationVariables
>;
export const UpdateCustomDomainDocument = gql`
	mutation UpdateCustomDomain($customDomain: String!) {
		updateCustomDomain(customDomain: $customDomain) {
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
			categoryId
			created_at
			updated_at
		}
	}
`;
export type UpdateCustomDomainMutationFn = Apollo.MutationFunction<
	UpdateCustomDomainMutation,
	UpdateCustomDomainMutationVariables
>;

/**
 * __useUpdateCustomDomainMutation__
 *
 * To run a mutation, you first call `useUpdateCustomDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomDomainMutation, { data, loading, error }] = useUpdateCustomDomainMutation({
 *   variables: {
 *      customDomain: // value for 'customDomain'
 *   },
 * });
 */
export function useUpdateCustomDomainMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateCustomDomainMutation,
		UpdateCustomDomainMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateCustomDomainMutation,
		UpdateCustomDomainMutationVariables
	>(UpdateCustomDomainDocument, options);
}
export type UpdateCustomDomainMutationHookResult = ReturnType<
	typeof useUpdateCustomDomainMutation
>;
export type UpdateCustomDomainMutationResult =
	Apollo.MutationResult<UpdateCustomDomainMutation>;
export type UpdateCustomDomainMutationOptions = Apollo.BaseMutationOptions<
	UpdateCustomDomainMutation,
	UpdateCustomDomainMutationVariables
>;
export const UpdateSubDomainDocument = gql`
	mutation UpdateSubDomain($subdomain: String!) {
		updateSubDomain(subdomain: $subdomain) {
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
			categoryId
			created_at
			updated_at
		}
	}
`;
export type UpdateSubDomainMutationFn = Apollo.MutationFunction<
	UpdateSubDomainMutation,
	UpdateSubDomainMutationVariables
>;

/**
 * __useUpdateSubDomainMutation__
 *
 * To run a mutation, you first call `useUpdateSubDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubDomainMutation, { data, loading, error }] = useUpdateSubDomainMutation({
 *   variables: {
 *      subdomain: // value for 'subdomain'
 *   },
 * });
 */
export function useUpdateSubDomainMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateSubDomainMutation,
		UpdateSubDomainMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateSubDomainMutation,
		UpdateSubDomainMutationVariables
	>(UpdateSubDomainDocument, options);
}
export type UpdateSubDomainMutationHookResult = ReturnType<
	typeof useUpdateSubDomainMutation
>;
export type UpdateSubDomainMutationResult =
	Apollo.MutationResult<UpdateSubDomainMutation>;
export type UpdateSubDomainMutationOptions = Apollo.BaseMutationOptions<
	UpdateSubDomainMutation,
	UpdateSubDomainMutationVariables
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
export const EmailInvoiceDocument = gql`
	mutation EmailInvoice($email: String!, $orderId: String!) {
		emailInvoice(email: $email, orderId: $orderId)
	}
`;
export type EmailInvoiceMutationFn = Apollo.MutationFunction<
	EmailInvoiceMutation,
	EmailInvoiceMutationVariables
>;

/**
 * __useEmailInvoiceMutation__
 *
 * To run a mutation, you first call `useEmailInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmailInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [emailInvoiceMutation, { data, loading, error }] = useEmailInvoiceMutation({
 *   variables: {
 *      email: // value for 'email'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useEmailInvoiceMutation(
	baseOptions?: Apollo.MutationHookOptions<
		EmailInvoiceMutation,
		EmailInvoiceMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		EmailInvoiceMutation,
		EmailInvoiceMutationVariables
	>(EmailInvoiceDocument, options);
}
export type EmailInvoiceMutationHookResult = ReturnType<
	typeof useEmailInvoiceMutation
>;
export type EmailInvoiceMutationResult =
	Apollo.MutationResult<EmailInvoiceMutation>;
export type EmailInvoiceMutationOptions = Apollo.BaseMutationOptions<
	EmailInvoiceMutation,
	EmailInvoiceMutationVariables
>;
export const GenerateInvoiceDocument = gql`
	mutation GenerateInvoice($orderId: String!) {
		generateInvoice(orderId: $orderId)
	}
`;
export type GenerateInvoiceMutationFn = Apollo.MutationFunction<
	GenerateInvoiceMutation,
	GenerateInvoiceMutationVariables
>;

/**
 * __useGenerateInvoiceMutation__
 *
 * To run a mutation, you first call `useGenerateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateInvoiceMutation, { data, loading, error }] = useGenerateInvoiceMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGenerateInvoiceMutation(
	baseOptions?: Apollo.MutationHookOptions<
		GenerateInvoiceMutation,
		GenerateInvoiceMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		GenerateInvoiceMutation,
		GenerateInvoiceMutationVariables
	>(GenerateInvoiceDocument, options);
}
export type GenerateInvoiceMutationHookResult = ReturnType<
	typeof useGenerateInvoiceMutation
>;
export type GenerateInvoiceMutationResult =
	Apollo.MutationResult<GenerateInvoiceMutation>;
export type GenerateInvoiceMutationOptions = Apollo.BaseMutationOptions<
	GenerateInvoiceMutation,
	GenerateInvoiceMutationVariables
>;
export const CreateCommentDocument = gql`
	mutation createComment($issueId: Int!, $content: String!) {
		createComment(issueId: $issueId, content: $content) {
			...IssueCommentFragment
		}
	}
	${IssueCommentFragmentFragmentDoc}
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
	CreateCommentMutation,
	CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      issueId: // value for 'issueId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateCommentMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreateCommentMutation,
		CreateCommentMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		CreateCommentMutation,
		CreateCommentMutationVariables
	>(CreateCommentDocument, options);
}
export type CreateCommentMutationHookResult = ReturnType<
	typeof useCreateCommentMutation
>;
export type CreateCommentMutationResult =
	Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
	CreateCommentMutation,
	CreateCommentMutationVariables
>;
export const CreateIssueDocument = gql`
	mutation createIssue($input: IssueInput!) {
		createIssue(input: $input) {
			...IssueFragment
		}
	}
	${IssueFragmentFragmentDoc}
`;
export type CreateIssueMutationFn = Apollo.MutationFunction<
	CreateIssueMutation,
	CreateIssueMutationVariables
>;

/**
 * __useCreateIssueMutation__
 *
 * To run a mutation, you first call `useCreateIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIssueMutation, { data, loading, error }] = useCreateIssueMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateIssueMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreateIssueMutation,
		CreateIssueMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<CreateIssueMutation, CreateIssueMutationVariables>(
		CreateIssueDocument,
		options
	);
}
export type CreateIssueMutationHookResult = ReturnType<
	typeof useCreateIssueMutation
>;
export type CreateIssueMutationResult =
	Apollo.MutationResult<CreateIssueMutation>;
export type CreateIssueMutationOptions = Apollo.BaseMutationOptions<
	CreateIssueMutation,
	CreateIssueMutationVariables
>;
export const ResolveByCustomerDocument = gql`
	mutation resolveByCustomer($issueId: Int!) {
		resolveByCustomer(issueId: $issueId)
	}
`;
export type ResolveByCustomerMutationFn = Apollo.MutationFunction<
	ResolveByCustomerMutation,
	ResolveByCustomerMutationVariables
>;

/**
 * __useResolveByCustomerMutation__
 *
 * To run a mutation, you first call `useResolveByCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResolveByCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resolveByCustomerMutation, { data, loading, error }] = useResolveByCustomerMutation({
 *   variables: {
 *      issueId: // value for 'issueId'
 *   },
 * });
 */
export function useResolveByCustomerMutation(
	baseOptions?: Apollo.MutationHookOptions<
		ResolveByCustomerMutation,
		ResolveByCustomerMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		ResolveByCustomerMutation,
		ResolveByCustomerMutationVariables
	>(ResolveByCustomerDocument, options);
}
export type ResolveByCustomerMutationHookResult = ReturnType<
	typeof useResolveByCustomerMutation
>;
export type ResolveByCustomerMutationResult =
	Apollo.MutationResult<ResolveByCustomerMutation>;
export type ResolveByCustomerMutationOptions = Apollo.BaseMutationOptions<
	ResolveByCustomerMutation,
	ResolveByCustomerMutationVariables
>;
export const RequestKycVerficationDocument = gql`
	mutation RequestKYCVerfication($options: TenantKYCInput!) {
		requestKYCVerfication(options: $options) {
			id
			name
			address
			phone_number
			pan_number
			bank_name
			bank_branch
			account_number
			account_name
			registration_document
			pan_document
			status
			tenantId
			created_at
			updated_at
		}
	}
`;
export type RequestKycVerficationMutationFn = Apollo.MutationFunction<
	RequestKycVerficationMutation,
	RequestKycVerficationMutationVariables
>;

/**
 * __useRequestKycVerficationMutation__
 *
 * To run a mutation, you first call `useRequestKycVerficationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestKycVerficationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestKycVerficationMutation, { data, loading, error }] = useRequestKycVerficationMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRequestKycVerficationMutation(
	baseOptions?: Apollo.MutationHookOptions<
		RequestKycVerficationMutation,
		RequestKycVerficationMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		RequestKycVerficationMutation,
		RequestKycVerficationMutationVariables
	>(RequestKycVerficationDocument, options);
}
export type RequestKycVerficationMutationHookResult = ReturnType<
	typeof useRequestKycVerficationMutation
>;
export type RequestKycVerficationMutationResult =
	Apollo.MutationResult<RequestKycVerficationMutation>;
export type RequestKycVerficationMutationOptions = Apollo.BaseMutationOptions<
	RequestKycVerficationMutation,
	RequestKycVerficationMutationVariables
>;
export const CreateOrderDocument = gql`
	mutation CreateOrder($options: CreateOrderInput!) {
		createOrder(options: $options) {
			id
			userId
			addressId
			amount
			shippingId
			promoId
			status
			created_at
			updated_at
		}
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
	mutation CreatePayment($provider: String!, $orderId: String!) {
		createPayment(provider: $provider, orderId: $orderId) {
			provider
			amt
			psc
			pdc
			txAmt
			tAmt
			pid
			scd
			paymentUrl
			paymentId
		}
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
 *      provider: // value for 'provider'
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
	mutation UpdateStatus($pidx: String, $refId: String, $orderId: String!) {
		updateStatus(pidx: $pidx, refId: $refId, orderId: $orderId) {
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
 *      refId: // value for 'refId'
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
export const AddReviewDocument = gql`
	mutation AddReview(
		$isAnonymous: Boolean!
		$desc: String!
		$rating: Int!
		$productId: Int!
		$review: String!
	) {
		addReview(
			isAnonymous: $isAnonymous
			desc: $desc
			rating: $rating
			productId: $productId
			review: $review
		) {
			id
			productId
			userId
			rating
			review
			desc
			isAnonymous
			created_at
			updated_at
		}
	}
`;
export type AddReviewMutationFn = Apollo.MutationFunction<
	AddReviewMutation,
	AddReviewMutationVariables
>;

/**
 * __useAddReviewMutation__
 *
 * To run a mutation, you first call `useAddReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReviewMutation, { data, loading, error }] = useAddReviewMutation({
 *   variables: {
 *      isAnonymous: // value for 'isAnonymous'
 *      desc: // value for 'desc'
 *      rating: // value for 'rating'
 *      productId: // value for 'productId'
 *      review: // value for 'review'
 *   },
 * });
 */
export function useAddReviewMutation(
	baseOptions?: Apollo.MutationHookOptions<
		AddReviewMutation,
		AddReviewMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<AddReviewMutation, AddReviewMutationVariables>(
		AddReviewDocument,
		options
	);
}
export type AddReviewMutationHookResult = ReturnType<
	typeof useAddReviewMutation
>;
export type AddReviewMutationResult = Apollo.MutationResult<AddReviewMutation>;
export type AddReviewMutationOptions = Apollo.BaseMutationOptions<
	AddReviewMutation,
	AddReviewMutationVariables
>;
export const UpdateReviewDocument = gql`
	mutation UpdateReview(
		$isAnonymous: Boolean!
		$desc: String!
		$review: String!
		$rating: Int!
		$productId: Int!
	) {
		updateReview(
			isAnonymous: $isAnonymous
			desc: $desc
			review: $review
			rating: $rating
			productId: $productId
		) {
			id
			productId
			userId
			rating
			review
			desc
			isAnonymous
			created_at
			updated_at
		}
	}
`;
export type UpdateReviewMutationFn = Apollo.MutationFunction<
	UpdateReviewMutation,
	UpdateReviewMutationVariables
>;

/**
 * __useUpdateReviewMutation__
 *
 * To run a mutation, you first call `useUpdateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReviewMutation, { data, loading, error }] = useUpdateReviewMutation({
 *   variables: {
 *      isAnonymous: // value for 'isAnonymous'
 *      desc: // value for 'desc'
 *      review: // value for 'review'
 *      rating: // value for 'rating'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useUpdateReviewMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateReviewMutation,
		UpdateReviewMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateReviewMutation,
		UpdateReviewMutationVariables
	>(UpdateReviewDocument, options);
}
export type UpdateReviewMutationHookResult = ReturnType<
	typeof useUpdateReviewMutation
>;
export type UpdateReviewMutationResult =
	Apollo.MutationResult<UpdateReviewMutation>;
export type UpdateReviewMutationOptions = Apollo.BaseMutationOptions<
	UpdateReviewMutation,
	UpdateReviewMutationVariables
>;
export const CreateShippingMethodDocument = gql`
	mutation CreateShippingMethod(
		$price: Int!
		$dispatch_in: Int!
		$name: String!
	) {
		createShippingMethod(
			price: $price
			dispatch_in: $dispatch_in
			name: $name
		) {
			...ShippingMethodFragment
		}
	}
	${ShippingMethodFragmentFragmentDoc}
`;
export type CreateShippingMethodMutationFn = Apollo.MutationFunction<
	CreateShippingMethodMutation,
	CreateShippingMethodMutationVariables
>;

/**
 * __useCreateShippingMethodMutation__
 *
 * To run a mutation, you first call `useCreateShippingMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShippingMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShippingMethodMutation, { data, loading, error }] = useCreateShippingMethodMutation({
 *   variables: {
 *      price: // value for 'price'
 *      dispatch_in: // value for 'dispatch_in'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateShippingMethodMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreateShippingMethodMutation,
		CreateShippingMethodMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		CreateShippingMethodMutation,
		CreateShippingMethodMutationVariables
	>(CreateShippingMethodDocument, options);
}
export type CreateShippingMethodMutationHookResult = ReturnType<
	typeof useCreateShippingMethodMutation
>;
export type CreateShippingMethodMutationResult =
	Apollo.MutationResult<CreateShippingMethodMutation>;
export type CreateShippingMethodMutationOptions = Apollo.BaseMutationOptions<
	CreateShippingMethodMutation,
	CreateShippingMethodMutationVariables
>;
export const DeleteShippingMethodDocument = gql`
	mutation DeleteShippingMethod($id: Int!) {
		deleteShippingMethod(id: $id)
	}
`;
export type DeleteShippingMethodMutationFn = Apollo.MutationFunction<
	DeleteShippingMethodMutation,
	DeleteShippingMethodMutationVariables
>;

/**
 * __useDeleteShippingMethodMutation__
 *
 * To run a mutation, you first call `useDeleteShippingMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShippingMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShippingMethodMutation, { data, loading, error }] = useDeleteShippingMethodMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShippingMethodMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteShippingMethodMutation,
		DeleteShippingMethodMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		DeleteShippingMethodMutation,
		DeleteShippingMethodMutationVariables
	>(DeleteShippingMethodDocument, options);
}
export type DeleteShippingMethodMutationHookResult = ReturnType<
	typeof useDeleteShippingMethodMutation
>;
export type DeleteShippingMethodMutationResult =
	Apollo.MutationResult<DeleteShippingMethodMutation>;
export type DeleteShippingMethodMutationOptions = Apollo.BaseMutationOptions<
	DeleteShippingMethodMutation,
	DeleteShippingMethodMutationVariables
>;
export const UpdateShippingMethodDocument = gql`
	mutation UpdateShippingMethod(
		$price: Int!
		$dispatch_in: Int!
		$name: String!
		$id: Int!
	) {
		updateShippingMethod(
			price: $price
			dispatch_in: $dispatch_in
			name: $name
			id: $id
		) {
			...ShippingMethodFragment
		}
	}
	${ShippingMethodFragmentFragmentDoc}
`;
export type UpdateShippingMethodMutationFn = Apollo.MutationFunction<
	UpdateShippingMethodMutation,
	UpdateShippingMethodMutationVariables
>;

/**
 * __useUpdateShippingMethodMutation__
 *
 * To run a mutation, you first call `useUpdateShippingMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShippingMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShippingMethodMutation, { data, loading, error }] = useUpdateShippingMethodMutation({
 *   variables: {
 *      price: // value for 'price'
 *      dispatch_in: // value for 'dispatch_in'
 *      name: // value for 'name'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateShippingMethodMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateShippingMethodMutation,
		UpdateShippingMethodMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateShippingMethodMutation,
		UpdateShippingMethodMutationVariables
	>(UpdateShippingMethodDocument, options);
}
export type UpdateShippingMethodMutationHookResult = ReturnType<
	typeof useUpdateShippingMethodMutation
>;
export type UpdateShippingMethodMutationResult =
	Apollo.MutationResult<UpdateShippingMethodMutation>;
export type UpdateShippingMethodMutationOptions = Apollo.BaseMutationOptions<
	UpdateShippingMethodMutation,
	UpdateShippingMethodMutationVariables
>;
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
export const UpdateTenantDocument = gql`
	mutation UpdateTenant(
		$address: String!
		$desc: String!
		$categoryId: Int!
		$name: String!
	) {
		updateTenant(
			address: $address
			desc: $desc
			categoryId: $categoryId
			name: $name
		) {
			...TenantFragment
		}
	}
	${TenantFragmentFragmentDoc}
`;
export type UpdateTenantMutationFn = Apollo.MutationFunction<
	UpdateTenantMutation,
	UpdateTenantMutationVariables
>;

/**
 * __useUpdateTenantMutation__
 *
 * To run a mutation, you first call `useUpdateTenantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTenantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTenantMutation, { data, loading, error }] = useUpdateTenantMutation({
 *   variables: {
 *      address: // value for 'address'
 *      desc: // value for 'desc'
 *      categoryId: // value for 'categoryId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateTenantMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateTenantMutation,
		UpdateTenantMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateTenantMutation,
		UpdateTenantMutationVariables
	>(UpdateTenantDocument, options);
}
export type UpdateTenantMutationHookResult = ReturnType<
	typeof useUpdateTenantMutation
>;
export type UpdateTenantMutationResult =
	Apollo.MutationResult<UpdateTenantMutation>;
export type UpdateTenantMutationOptions = Apollo.BaseMutationOptions<
	UpdateTenantMutation,
	UpdateTenantMutationVariables
>;
export const UpdateTenantContactDocument = gql`
	mutation UpdateTenantContact($option: TenantContactInput!) {
		updateTenantContact(options: $option) {
			id
			primary
			secondary
			ntc
			ncell
			facebook
			instagram
			tiktok
			twitter
			whatsapp
			viber
			tenantId
			created_at
			updated_at
		}
	}
`;
export type UpdateTenantContactMutationFn = Apollo.MutationFunction<
	UpdateTenantContactMutation,
	UpdateTenantContactMutationVariables
>;

/**
 * __useUpdateTenantContactMutation__
 *
 * To run a mutation, you first call `useUpdateTenantContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTenantContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTenantContactMutation, { data, loading, error }] = useUpdateTenantContactMutation({
 *   variables: {
 *      option: // value for 'option'
 *   },
 * });
 */
export function useUpdateTenantContactMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateTenantContactMutation,
		UpdateTenantContactMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateTenantContactMutation,
		UpdateTenantContactMutationVariables
	>(UpdateTenantContactDocument, options);
}
export type UpdateTenantContactMutationHookResult = ReturnType<
	typeof useUpdateTenantContactMutation
>;
export type UpdateTenantContactMutationResult =
	Apollo.MutationResult<UpdateTenantContactMutation>;
export type UpdateTenantContactMutationOptions = Apollo.BaseMutationOptions<
	UpdateTenantContactMutation,
	UpdateTenantContactMutationVariables
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
export const UpdateLanguagePreferenceDocument = gql`
	mutation UpdateLanguagePreference($currency: String!, $language: String!) {
		updateLanguagePreference(currency: $currency, language: $language)
	}
`;
export type UpdateLanguagePreferenceMutationFn = Apollo.MutationFunction<
	UpdateLanguagePreferenceMutation,
	UpdateLanguagePreferenceMutationVariables
>;

/**
 * __useUpdateLanguagePreferenceMutation__
 *
 * To run a mutation, you first call `useUpdateLanguagePreferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLanguagePreferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLanguagePreferenceMutation, { data, loading, error }] = useUpdateLanguagePreferenceMutation({
 *   variables: {
 *      currency: // value for 'currency'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUpdateLanguagePreferenceMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateLanguagePreferenceMutation,
		UpdateLanguagePreferenceMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateLanguagePreferenceMutation,
		UpdateLanguagePreferenceMutationVariables
	>(UpdateLanguagePreferenceDocument, options);
}
export type UpdateLanguagePreferenceMutationHookResult = ReturnType<
	typeof useUpdateLanguagePreferenceMutation
>;
export type UpdateLanguagePreferenceMutationResult =
	Apollo.MutationResult<UpdateLanguagePreferenceMutation>;
export type UpdateLanguagePreferenceMutationOptions =
	Apollo.BaseMutationOptions<
		UpdateLanguagePreferenceMutation,
		UpdateLanguagePreferenceMutationVariables
	>;
export const UpdateMarketingPreferenceDocument = gql`
	mutation UpdateMarketingPreference(
		$marketing_company_news: Boolean!
		$marketing_product_news: Boolean!
	) {
		updateMarketingPreference(
			marketing_company_news: $marketing_company_news
			marketing_product_news: $marketing_product_news
		)
	}
`;
export type UpdateMarketingPreferenceMutationFn = Apollo.MutationFunction<
	UpdateMarketingPreferenceMutation,
	UpdateMarketingPreferenceMutationVariables
>;

/**
 * __useUpdateMarketingPreferenceMutation__
 *
 * To run a mutation, you first call `useUpdateMarketingPreferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMarketingPreferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMarketingPreferenceMutation, { data, loading, error }] = useUpdateMarketingPreferenceMutation({
 *   variables: {
 *      marketing_company_news: // value for 'marketing_company_news'
 *      marketing_product_news: // value for 'marketing_product_news'
 *   },
 * });
 */
export function useUpdateMarketingPreferenceMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateMarketingPreferenceMutation,
		UpdateMarketingPreferenceMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateMarketingPreferenceMutation,
		UpdateMarketingPreferenceMutationVariables
	>(UpdateMarketingPreferenceDocument, options);
}
export type UpdateMarketingPreferenceMutationHookResult = ReturnType<
	typeof useUpdateMarketingPreferenceMutation
>;
export type UpdateMarketingPreferenceMutationResult =
	Apollo.MutationResult<UpdateMarketingPreferenceMutation>;
export type UpdateMarketingPreferenceMutationOptions =
	Apollo.BaseMutationOptions<
		UpdateMarketingPreferenceMutation,
		UpdateMarketingPreferenceMutationVariables
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
export const UpdateProfileDocument = gql`
	mutation UpdateProfile(
		$first_name: String!
		$last_name: String!
		$imageUrl: String!
	) {
		updateProfile(
			first_name: $first_name
			last_name: $last_name
			imageUrl: $imageUrl
		) {
			...UserFragment
		}
	}
	${UserFragmentFragmentDoc}
`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<
	UpdateProfileMutation,
	UpdateProfileMutationVariables
>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      first_name: // value for 'first_name'
 *      last_name: // value for 'last_name'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useUpdateProfileMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateProfileMutation,
		UpdateProfileMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateProfileMutation,
		UpdateProfileMutationVariables
	>(UpdateProfileDocument, options);
}
export type UpdateProfileMutationHookResult = ReturnType<
	typeof useUpdateProfileMutation
>;
export type UpdateProfileMutationResult =
	Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
	UpdateProfileMutation,
	UpdateProfileMutationVariables
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
export const CategoriesSummaryDocument = gql`
	query CategoriesSummary {
		categoriesSummary {
			id
			name
			identifier
			desc
			imageURL
			tenantId
			product_count
			created_at
			updated_at
		}
	}
`;

/**
 * __useCategoriesSummaryQuery__
 *
 * To run a query within a React component, call `useCategoriesSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesSummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesSummaryQuery(
	baseOptions?: Apollo.QueryHookOptions<
		CategoriesSummaryQuery,
		CategoriesSummaryQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<
		CategoriesSummaryQuery,
		CategoriesSummaryQueryVariables
	>(CategoriesSummaryDocument, options);
}
export function useCategoriesSummaryLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		CategoriesSummaryQuery,
		CategoriesSummaryQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		CategoriesSummaryQuery,
		CategoriesSummaryQueryVariables
	>(CategoriesSummaryDocument, options);
}
export type CategoriesSummaryQueryHookResult = ReturnType<
	typeof useCategoriesSummaryQuery
>;
export type CategoriesSummaryLazyQueryHookResult = ReturnType<
	typeof useCategoriesSummaryLazyQuery
>;
export type CategoriesSummaryQueryResult = Apollo.QueryResult<
	CategoriesSummaryQuery,
	CategoriesSummaryQueryVariables
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
export const VerifyDomainDocument = gql`
	query VerifyDomain($domain: String!) {
		verifyDomain(domain: $domain) {
			status
			domainJson {
				name
				apexName
				projectId
				redirect
				redirectStatusCode
				gitBranch
				updatedAt
				createdAt
				verified
				verification {
					type
					domain
					value
					reason
				}
				error {
					code
					message
				}
			}
		}
	}
`;

/**
 * __useVerifyDomainQuery__
 *
 * To run a query within a React component, call `useVerifyDomainQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyDomainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyDomainQuery({
 *   variables: {
 *      domain: // value for 'domain'
 *   },
 * });
 */
export function useVerifyDomainQuery(
	baseOptions: Apollo.QueryHookOptions<
		VerifyDomainQuery,
		VerifyDomainQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<VerifyDomainQuery, VerifyDomainQueryVariables>(
		VerifyDomainDocument,
		options
	);
}
export function useVerifyDomainLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		VerifyDomainQuery,
		VerifyDomainQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<VerifyDomainQuery, VerifyDomainQueryVariables>(
		VerifyDomainDocument,
		options
	);
}
export type VerifyDomainQueryHookResult = ReturnType<
	typeof useVerifyDomainQuery
>;
export type VerifyDomainLazyQueryHookResult = ReturnType<
	typeof useVerifyDomainLazyQuery
>;
export type VerifyDomainQueryResult = Apollo.QueryResult<
	VerifyDomainQuery,
	VerifyDomainQueryVariables
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
export const IssuesDocument = gql`
	query Issues {
		issues {
			...IssueFragment
			comments {
				...IssueCommentFragment
			}
			category {
				...IssueCategoryFragment
			}
		}
	}
	${IssueFragmentFragmentDoc}
	${IssueCommentFragmentFragmentDoc}
	${IssueCategoryFragmentFragmentDoc}
`;

/**
 * __useIssuesQuery__
 *
 * To run a query within a React component, call `useIssuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssuesQuery({
 *   variables: {
 *   },
 * });
 */
export function useIssuesQuery(
	baseOptions?: Apollo.QueryHookOptions<IssuesQuery, IssuesQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<IssuesQuery, IssuesQueryVariables>(
		IssuesDocument,
		options
	);
}
export function useIssuesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<IssuesQuery, IssuesQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<IssuesQuery, IssuesQueryVariables>(
		IssuesDocument,
		options
	);
}
export type IssuesQueryHookResult = ReturnType<typeof useIssuesQuery>;
export type IssuesLazyQueryHookResult = ReturnType<typeof useIssuesLazyQuery>;
export type IssuesQueryResult = Apollo.QueryResult<
	IssuesQuery,
	IssuesQueryVariables
>;
export const IssueCategoriesDocument = gql`
	query IssueCategories {
		issueCategories {
			...IssueCategoryFragment
		}
	}
	${IssueCategoryFragmentFragmentDoc}
`;

/**
 * __useIssueCategoriesQuery__
 *
 * To run a query within a React component, call `useIssueCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssueCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssueCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useIssueCategoriesQuery(
	baseOptions?: Apollo.QueryHookOptions<
		IssueCategoriesQuery,
		IssueCategoriesQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<IssueCategoriesQuery, IssueCategoriesQueryVariables>(
		IssueCategoriesDocument,
		options
	);
}
export function useIssueCategoriesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		IssueCategoriesQuery,
		IssueCategoriesQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		IssueCategoriesQuery,
		IssueCategoriesQueryVariables
	>(IssueCategoriesDocument, options);
}
export type IssueCategoriesQueryHookResult = ReturnType<
	typeof useIssueCategoriesQuery
>;
export type IssueCategoriesLazyQueryHookResult = ReturnType<
	typeof useIssueCategoriesLazyQuery
>;
export type IssueCategoriesQueryResult = Apollo.QueryResult<
	IssueCategoriesQuery,
	IssueCategoriesQueryVariables
>;
export const IssuesWithCommentsDocument = gql`
	query IssuesWithComments($issueId: Int!) {
		issuesWithComments(issueId: $issueId) {
			...IssueFragment
			comments {
				...IssueCommentFragment
				user {
					first_name
					last_name
					role {
						name
					}
					imageUrl
				}
			}
			category {
				...IssueCategoryFragment
			}
			user {
				first_name
				last_name
				role {
					name
				}
				imageUrl
			}
		}
	}
	${IssueFragmentFragmentDoc}
	${IssueCommentFragmentFragmentDoc}
	${IssueCategoryFragmentFragmentDoc}
`;

/**
 * __useIssuesWithCommentsQuery__
 *
 * To run a query within a React component, call `useIssuesWithCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssuesWithCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssuesWithCommentsQuery({
 *   variables: {
 *      issueId: // value for 'issueId'
 *   },
 * });
 */
export function useIssuesWithCommentsQuery(
	baseOptions: Apollo.QueryHookOptions<
		IssuesWithCommentsQuery,
		IssuesWithCommentsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<
		IssuesWithCommentsQuery,
		IssuesWithCommentsQueryVariables
	>(IssuesWithCommentsDocument, options);
}
export function useIssuesWithCommentsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		IssuesWithCommentsQuery,
		IssuesWithCommentsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		IssuesWithCommentsQuery,
		IssuesWithCommentsQueryVariables
	>(IssuesWithCommentsDocument, options);
}
export type IssuesWithCommentsQueryHookResult = ReturnType<
	typeof useIssuesWithCommentsQuery
>;
export type IssuesWithCommentsLazyQueryHookResult = ReturnType<
	typeof useIssuesWithCommentsLazyQuery
>;
export type IssuesWithCommentsQueryResult = Apollo.QueryResult<
	IssuesWithCommentsQuery,
	IssuesWithCommentsQueryVariables
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
export const QueryProductsDocument = gql`
	query QueryProducts(
		$query: String!
		$sort: String
		$limit: Float
		$offset: Float
	) {
		queryProducts(query: $query, sort: $sort, limit: $limit, offset: $offset) {
			hasMore
			products {
				id
				identifier
				name
				images {
					imageURL
				}
				inventories {
					price
				}
			}
		}
	}
`;

/**
 * __useQueryProductsQuery__
 *
 * To run a query within a React component, call `useQueryProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryProductsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      sort: // value for 'sort'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useQueryProductsQuery(
	baseOptions: Apollo.QueryHookOptions<
		QueryProductsQuery,
		QueryProductsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<QueryProductsQuery, QueryProductsQueryVariables>(
		QueryProductsDocument,
		options
	);
}
export function useQueryProductsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		QueryProductsQuery,
		QueryProductsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<QueryProductsQuery, QueryProductsQueryVariables>(
		QueryProductsDocument,
		options
	);
}
export type QueryProductsQueryHookResult = ReturnType<
	typeof useQueryProductsQuery
>;
export type QueryProductsLazyQueryHookResult = ReturnType<
	typeof useQueryProductsLazyQuery
>;
export type QueryProductsQueryResult = Apollo.QueryResult<
	QueryProductsQuery,
	QueryProductsQueryVariables
>;
export const SearchProductsDocument = gql`
	query SearchProducts($query: String!, $limit: Int) {
		searchProducts(query: $query, limit: $limit) {
			id
			identifier
			name
			desc
			categoryId
			discountId
			created_at
			updated_at
			images {
				id
				imageURL
				productId
				sequence
				created_at
				updated_at
			}
		}
	}
`;

/**
 * __useSearchProductsQuery__
 *
 * To run a query within a React component, call `useSearchProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProductsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchProductsQuery(
	baseOptions: Apollo.QueryHookOptions<
		SearchProductsQuery,
		SearchProductsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<SearchProductsQuery, SearchProductsQueryVariables>(
		SearchProductsDocument,
		options
	);
}
export function useSearchProductsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		SearchProductsQuery,
		SearchProductsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<SearchProductsQuery, SearchProductsQueryVariables>(
		SearchProductsDocument,
		options
	);
}
export type SearchProductsQueryHookResult = ReturnType<
	typeof useSearchProductsQuery
>;
export type SearchProductsLazyQueryHookResult = ReturnType<
	typeof useSearchProductsLazyQuery
>;
export type SearchProductsQueryResult = Apollo.QueryResult<
	SearchProductsQuery,
	SearchProductsQueryVariables
>;
export const ProductsSummaryDocument = gql`
	query ProductsSummary {
		productsSummary {
			max
			min
			count
		}
	}
`;

/**
 * __useProductsSummaryQuery__
 *
 * To run a query within a React component, call `useProductsSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsSummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsSummaryQuery(
	baseOptions?: Apollo.QueryHookOptions<
		ProductsSummaryQuery,
		ProductsSummaryQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<ProductsSummaryQuery, ProductsSummaryQueryVariables>(
		ProductsSummaryDocument,
		options
	);
}
export function useProductsSummaryLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		ProductsSummaryQuery,
		ProductsSummaryQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		ProductsSummaryQuery,
		ProductsSummaryQueryVariables
	>(ProductsSummaryDocument, options);
}
export type ProductsSummaryQueryHookResult = ReturnType<
	typeof useProductsSummaryQuery
>;
export type ProductsSummaryLazyQueryHookResult = ReturnType<
	typeof useProductsSummaryLazyQuery
>;
export type ProductsSummaryQueryResult = Apollo.QueryResult<
	ProductsSummaryQuery,
	ProductsSummaryQueryVariables
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
export const AllReviewsDocument = gql`
	query allReviews($productId: Int!) {
		allReviews(productId: $productId) {
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
 * __useAllReviewsQuery__
 *
 * To run a query within a React component, call `useAllReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllReviewsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useAllReviewsQuery(
	baseOptions: Apollo.QueryHookOptions<
		AllReviewsQuery,
		AllReviewsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<AllReviewsQuery, AllReviewsQueryVariables>(
		AllReviewsDocument,
		options
	);
}
export function useAllReviewsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		AllReviewsQuery,
		AllReviewsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<AllReviewsQuery, AllReviewsQueryVariables>(
		AllReviewsDocument,
		options
	);
}
export type AllReviewsQueryHookResult = ReturnType<typeof useAllReviewsQuery>;
export type AllReviewsLazyQueryHookResult = ReturnType<
	typeof useAllReviewsLazyQuery
>;
export type AllReviewsQueryResult = Apollo.QueryResult<
	AllReviewsQuery,
	AllReviewsQueryVariables
>;
export const ReviewByUserAndProductDocument = gql`
	query ReviewByUserAndProduct($productId: Int!) {
		reviewByUserAndProduct(productId: $productId) {
			id
			productId
			userId
			rating
			review
			desc
			isAnonymous
			created_at
			updated_at
		}
	}
`;

/**
 * __useReviewByUserAndProductQuery__
 *
 * To run a query within a React component, call `useReviewByUserAndProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewByUserAndProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewByUserAndProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useReviewByUserAndProductQuery(
	baseOptions: Apollo.QueryHookOptions<
		ReviewByUserAndProductQuery,
		ReviewByUserAndProductQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<
		ReviewByUserAndProductQuery,
		ReviewByUserAndProductQueryVariables
	>(ReviewByUserAndProductDocument, options);
}
export function useReviewByUserAndProductLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		ReviewByUserAndProductQuery,
		ReviewByUserAndProductQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		ReviewByUserAndProductQuery,
		ReviewByUserAndProductQueryVariables
	>(ReviewByUserAndProductDocument, options);
}
export type ReviewByUserAndProductQueryHookResult = ReturnType<
	typeof useReviewByUserAndProductQuery
>;
export type ReviewByUserAndProductLazyQueryHookResult = ReturnType<
	typeof useReviewByUserAndProductLazyQuery
>;
export type ReviewByUserAndProductQueryResult = Apollo.QueryResult<
	ReviewByUserAndProductQuery,
	ReviewByUserAndProductQueryVariables
>;
export const ReviewSummaryDocument = gql`
	query ReviewSummary($productId: Int!) {
		reviewSummary(productId: $productId) {
			count
			rating
		}
	}
`;

/**
 * __useReviewSummaryQuery__
 *
 * To run a query within a React component, call `useReviewSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewSummaryQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useReviewSummaryQuery(
	baseOptions: Apollo.QueryHookOptions<
		ReviewSummaryQuery,
		ReviewSummaryQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<ReviewSummaryQuery, ReviewSummaryQueryVariables>(
		ReviewSummaryDocument,
		options
	);
}
export function useReviewSummaryLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		ReviewSummaryQuery,
		ReviewSummaryQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<ReviewSummaryQuery, ReviewSummaryQueryVariables>(
		ReviewSummaryDocument,
		options
	);
}
export type ReviewSummaryQueryHookResult = ReturnType<
	typeof useReviewSummaryQuery
>;
export type ReviewSummaryLazyQueryHookResult = ReturnType<
	typeof useReviewSummaryLazyQuery
>;
export type ReviewSummaryQueryResult = Apollo.QueryResult<
	ReviewSummaryQuery,
	ReviewSummaryQueryVariables
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
export const ShippingmethodsDocument = gql`
	query Shippingmethods {
		shippingmethods {
			...ShippingMethodFragment
		}
	}
	${ShippingMethodFragmentFragmentDoc}
`;

/**
 * __useShippingmethodsQuery__
 *
 * To run a query within a React component, call `useShippingmethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShippingmethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShippingmethodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useShippingmethodsQuery(
	baseOptions?: Apollo.QueryHookOptions<
		ShippingmethodsQuery,
		ShippingmethodsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<ShippingmethodsQuery, ShippingmethodsQueryVariables>(
		ShippingmethodsDocument,
		options
	);
}
export function useShippingmethodsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		ShippingmethodsQuery,
		ShippingmethodsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		ShippingmethodsQuery,
		ShippingmethodsQueryVariables
	>(ShippingmethodsDocument, options);
}
export type ShippingmethodsQueryHookResult = ReturnType<
	typeof useShippingmethodsQuery
>;
export type ShippingmethodsLazyQueryHookResult = ReturnType<
	typeof useShippingmethodsLazyQuery
>;
export type ShippingmethodsQueryResult = Apollo.QueryResult<
	ShippingmethodsQuery,
	ShippingmethodsQueryVariables
>;
export const ShippingmethodsByTenantDocument = gql`
	query ShippingmethodsByTenant {
		shippingmethodsByTenant {
			...ShippingMethodFragment
		}
	}
	${ShippingMethodFragmentFragmentDoc}
`;

/**
 * __useShippingmethodsByTenantQuery__
 *
 * To run a query within a React component, call `useShippingmethodsByTenantQuery` and pass it any options that fit your needs.
 * When your component renders, `useShippingmethodsByTenantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShippingmethodsByTenantQuery({
 *   variables: {
 *   },
 * });
 */
export function useShippingmethodsByTenantQuery(
	baseOptions?: Apollo.QueryHookOptions<
		ShippingmethodsByTenantQuery,
		ShippingmethodsByTenantQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<
		ShippingmethodsByTenantQuery,
		ShippingmethodsByTenantQueryVariables
	>(ShippingmethodsByTenantDocument, options);
}
export function useShippingmethodsByTenantLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		ShippingmethodsByTenantQuery,
		ShippingmethodsByTenantQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		ShippingmethodsByTenantQuery,
		ShippingmethodsByTenantQueryVariables
	>(ShippingmethodsByTenantDocument, options);
}
export type ShippingmethodsByTenantQueryHookResult = ReturnType<
	typeof useShippingmethodsByTenantQuery
>;
export type ShippingmethodsByTenantLazyQueryHookResult = ReturnType<
	typeof useShippingmethodsByTenantLazyQuery
>;
export type ShippingmethodsByTenantQueryResult = Apollo.QueryResult<
	ShippingmethodsByTenantQuery,
	ShippingmethodsByTenantQueryVariables
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
export const DetailsDocument = gql`
	query Details {
		details {
			...TenantFragment
		}
	}
	${TenantFragmentFragmentDoc}
`;

/**
 * __useDetailsQuery__
 *
 * To run a query within a React component, call `useDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDetailsQuery(
	baseOptions?: Apollo.QueryHookOptions<DetailsQuery, DetailsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<DetailsQuery, DetailsQueryVariables>(
		DetailsDocument,
		options
	);
}
export function useDetailsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<DetailsQuery, DetailsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<DetailsQuery, DetailsQueryVariables>(
		DetailsDocument,
		options
	);
}
export type DetailsQueryHookResult = ReturnType<typeof useDetailsQuery>;
export type DetailsLazyQueryHookResult = ReturnType<typeof useDetailsLazyQuery>;
export type DetailsQueryResult = Apollo.QueryResult<
	DetailsQuery,
	DetailsQueryVariables
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
export const TenantContactsDocument = gql`
	query TenantContacts {
		tenantContacts {
			id
			primary
			secondary
			ntc
			ncell
			facebook
			instagram
			tiktok
			twitter
			whatsapp
			viber
			tenantId
			created_at
			updated_at
		}
	}
`;

/**
 * __useTenantContactsQuery__
 *
 * To run a query within a React component, call `useTenantContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTenantContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTenantContactsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTenantContactsQuery(
	baseOptions?: Apollo.QueryHookOptions<
		TenantContactsQuery,
		TenantContactsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<TenantContactsQuery, TenantContactsQueryVariables>(
		TenantContactsDocument,
		options
	);
}
export function useTenantContactsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		TenantContactsQuery,
		TenantContactsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<TenantContactsQuery, TenantContactsQueryVariables>(
		TenantContactsDocument,
		options
	);
}
export type TenantContactsQueryHookResult = ReturnType<
	typeof useTenantContactsQuery
>;
export type TenantContactsLazyQueryHookResult = ReturnType<
	typeof useTenantContactsLazyQuery
>;
export type TenantContactsQueryResult = Apollo.QueryResult<
	TenantContactsQuery,
	TenantContactsQueryVariables
>;
export const TenantKycDocument = gql`
	query TenantKYC {
		tenantKYC {
			id
			name
			address
			phone_number
			pan_number
			bank_name
			bank_branch
			account_number
			account_name
			registration_document
			pan_document
			status
			tenantId
			created_at
			updated_at
		}
	}
`;

/**
 * __useTenantKycQuery__
 *
 * To run a query within a React component, call `useTenantKycQuery` and pass it any options that fit your needs.
 * When your component renders, `useTenantKycQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTenantKycQuery({
 *   variables: {
 *   },
 * });
 */
export function useTenantKycQuery(
	baseOptions?: Apollo.QueryHookOptions<TenantKycQuery, TenantKycQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<TenantKycQuery, TenantKycQueryVariables>(
		TenantKycDocument,
		options
	);
}
export function useTenantKycLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		TenantKycQuery,
		TenantKycQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<TenantKycQuery, TenantKycQueryVariables>(
		TenantKycDocument,
		options
	);
}
export type TenantKycQueryHookResult = ReturnType<typeof useTenantKycQuery>;
export type TenantKycLazyQueryHookResult = ReturnType<
	typeof useTenantKycLazyQuery
>;
export type TenantKycQueryResult = Apollo.QueryResult<
	TenantKycQuery,
	TenantKycQueryVariables
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
export const MeWithAccountDocument = gql`
	query MeWithAccount {
		meWithAccount {
			...UserFragment
			accounts {
				id
				userId
				type
				provider
				providerAccountId
				refresh_token
				expires_at
				token_type
				scope
				id_token
				session_state
				created_at
				updated_at
				access_token
			}
		}
	}
	${UserFragmentFragmentDoc}
`;

/**
 * __useMeWithAccountQuery__
 *
 * To run a query within a React component, call `useMeWithAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeWithAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeWithAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeWithAccountQuery(
	baseOptions?: Apollo.QueryHookOptions<
		MeWithAccountQuery,
		MeWithAccountQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<MeWithAccountQuery, MeWithAccountQueryVariables>(
		MeWithAccountDocument,
		options
	);
}
export function useMeWithAccountLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		MeWithAccountQuery,
		MeWithAccountQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<MeWithAccountQuery, MeWithAccountQueryVariables>(
		MeWithAccountDocument,
		options
	);
}
export type MeWithAccountQueryHookResult = ReturnType<
	typeof useMeWithAccountQuery
>;
export type MeWithAccountLazyQueryHookResult = ReturnType<
	typeof useMeWithAccountLazyQuery
>;
export type MeWithAccountQueryResult = Apollo.QueryResult<
	MeWithAccountQuery,
	MeWithAccountQueryVariables
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
