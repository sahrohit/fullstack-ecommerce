import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	OneToMany,
	ManyToOne,
} from "typeorm";
import { Address } from "./Address";
import { Cart } from "./Cart";
import { OrderDetail } from "./OrderDetail";
import { UserPayment } from "./UserPayment";
import { UserRole } from "./UserRole";
import { ProductReview } from "./ProductReview";
import { Account } from "./Account";
import { Tenant } from "./Tenant";
import { Issue } from "./Issue";
import { IssueComment } from "./IssueComment";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	password!: string;

	@Field()
	@Column()
	first_name!: string;

	@Field()
	@Column({ nullable: true })
	last_name!: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	@Field(() => Boolean)
	@Column({ default: false })
	email_verified!: boolean;

	@Field({ nullable: true })
	@Column({ unique: true, nullable: true })
	phone_number!: string;

	@Field(() => Boolean)
	@Column({ default: false })
	phone_number_verified!: boolean;

	@Field({ nullable: true })
	@Column({ nullable: true })
	imageUrl!: string;

	@Field()
	@Column({ default: "en" })
	language!: string;

	@Field()
	@Column({ default: "NPR" })
	currency!: string;

	@Field()
	@Column({ default: false })
	marketing_product_news!: boolean;

	@Field()
	@Column({ default: false })
	marketing_company_news!: boolean;

	@Field()
	@Column({ default: 1 })
	roleId!: number;

	@Field(() => UserRole)
	@ManyToOne(() => UserRole, (role) => role.users)
	role!: UserRole;

	@OneToMany(() => UserPayment, (userpayment) => userpayment.user)
	userpayments!: UserPayment[];

	@Field(() => [Account], { nullable: true })
	@OneToMany(() => Account, (account) => account.user)
	accounts!: Account[];

	@OneToMany(() => Address, (address) => address.user)
	addresses!: Address[];

	@OneToMany(() => Issue, (issue) => issue.user)
	issues!: Issue[];

	@OneToMany(() => IssueComment, (comment) => comment.user)
	comments!: IssueComment[];

	@OneToMany(() => Tenant, (tenant) => tenant.user)
	tenants!: Tenant[];

	@OneToMany(() => OrderDetail, (orderdetails) => orderdetails.user)
	orderdetails!: OrderDetail[];

	@OneToMany(() => ProductReview, (reviews) => reviews.user)
	reviews!: ProductReview[];

	@OneToMany(() => Cart, (cart) => cart.user)
	carts!: Cart[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
