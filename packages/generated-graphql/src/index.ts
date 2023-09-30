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
			language
			currency
			marketing_product_news
			marketing_company_news
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
