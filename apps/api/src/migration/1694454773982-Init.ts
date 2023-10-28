import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1694454773982 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        INSERT INTO public.user_role (id, name) VALUES (1, 'CLIENT');
        INSERT INTO public.user_role (id, name) VALUES (2, 'DELIVERY');
        INSERT INTO public.user_role (id, name) VALUES (3, 'STAFF');
        INSERT INTO public.user_role (id, name) VALUES (4, 'MANAGER');
        INSERT INTO public.user_role (id, name) VALUES (5, 'ADMIN');

        INSERT INTO public."user" (id, password, first_name, last_name, email, email_verified, phone_number, phone_number_verified, "imageUrl", "roleId", created_at, updated_at, language, currency, marketing_product_news, marketing_company_news) VALUES (11, '$argon2id$v=19$m=65536,t=3,p=4$tQqlPwiYBoIBf2HGDYi2TQ$o9/FBb8IcO3q63Rqs9N95rRkwR5Mt48YMlIPFY3fkmo', 'Admin', 'Admin', 'admin@admin.com', false, null, false, 'https://api.dicebear.com/6.x/micah/svg?size=256&seed=Admin', 1, '2023-10-28 15:50:07.533245', '2023-10-28 15:50:07.533245', 'en', 'NPR', false, false);

        INSERT INTO public.tenant_category (id, name, identifier, "desc", created_at, updated_at) VALUES (1, 'General', 'general', 'General Purpose Store', '2023-09-17 15:26:28.682800', '2023-09-17 15:26:28.682800');

        INSERT INTO tenant (name, "desc", address, subdomain, "customDomain", "userId", "categoryId") VALUES ('Adminpasal', 'This is a shop created by admin for testing','Mero Ghar, Earth','adminpasal',null,1,1)

        INSERT INTO public.shipping_method (name, price, dispatch_in, "tenantId") VALUES ( 'Standard Delivery', 8000, 96,1 );
        INSERT INTO public.shipping_method (name, price, dispatch_in,"tenantId") VALUES ( 'Express Delivery', 20000, 24,1);

        INSERT INTO public.issue_category (name, identifier, "desc")
        VALUES
        ('Order and Checkout Issues', 'order-and-checkout-issues', 'Problems related to the ordering and checkout process.'),
        ('Product and Inventory Problems', 'product-and-inventory-problems', 'Issues concerning product availability, listings, and inventory management.'),
        ('Security and Privacy Concerns', 'security-and-privacy-concerns', 'Concerns about data security, privacy, and unauthorized access.'),
        ('Delivery and Shipping Issues', 'delivery-and-shipping-issues', 'Problems with product delivery, shipping delays, and lost shipments.'),
        ('Customer Account and Login Problems', 'customer-account-and-login-problems', 'Issues related to customer accounts, logins, and profile management.'),
        ('Returns, Refunds, and Exchanges', 'returns-refunds-and-exchanges', 'Matters concerning product returns, refunds, and exchange requests.'),
        ('Customer Support and Communication', 'customer-support-and-communication', 'Problems with customer support, response times, and communication.'),
        ('Discounts, Coupons, and Promotions', 'discounts-coupons-and-promotions', 'Issues related to discounts, coupon codes, and promotional offers.'),
        ('Product Reviews and Ratings', 'product-reviews-and-ratings', 'Concerns about product reviews, ratings, and feedback management.'),
        ('Technical Account Management', 'technical-account-management', 'Issues related to account suspension, recovery, or subscription management.'),
        ('Website Accessibility and Usability', 'website-accessibility-and-usability', 'Accessibility and usability issues for all users, including those with disabilities.'),
        ('Performance and Loading Speed', 'performance-and-loading-speed', 'Problems with website performance, loading times, and optimization.'),
        ('Analytics and Reporting', 'analytics-and-reporting', 'Issues with data analytics, reporting, and data privacy.'),
        ('Feedback and Suggestions', 'feedback-and-suggestions', 'General feedback and suggestions for improving the ecommerce platform.'),
        ('Legal and Compliance Matters', 'legal-and-compliance-matters', 'Concerns regarding legal compliance, terms of service, and data protection.'),
        ('Third-Party Integrations and Plugins', 'third-party-integrations-and-plugins', 'Issues with third-party integrations and plugin functionality.'),
        ('Account Billing and Payments', 'account-billing-and-payments', 'Billing disputes, invoices, and payment-related problems.');
            `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
