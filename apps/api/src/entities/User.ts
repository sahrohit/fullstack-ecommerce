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
	@Column({ default: 1 })
	roleId!: number;

	@ManyToOne(() => UserRole, (role) => role.users)
	role!: UserRole;

	@OneToMany(() => UserPayment, (userpayment) => userpayment.user)
	userpayments!: UserPayment[];

	@OneToMany(() => Account, (account) => account.user)
	accounts!: Account[];

	@OneToMany(() => Address, (address) => address.user)
	addresses!: Address[];

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
