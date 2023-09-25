import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
	OneToMany,
	JoinTable,
	Unique,
	OneToOne,
} from "typeorm";
import { User } from "./User";
import { Staff } from "./Staff";
import { TenantCategory } from "./TenantCategory";
import { ProductCategory } from "./ProductCategory";
import { UserDataResponse } from "../resolvers/GqlObjets/User";
import { ShippingMethod } from "./ShippingMethod";
import { TenantContact } from "./TenantContant";
import { TenantKyc } from "./TenantKyc";

@ObjectType()
@Entity()
@Unique(["subdomain"])
export class Tenant extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	desc?: string;

	@Field({
		nullable: true,
	})
	@Column({
		nullable: true,
	})
	address?: string;

	@Field({
		nullable: true,
	})
	@Column({
		nullable: true,
		default:
			"https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg",
	})
	logo?: string;

	@Field({ nullable: true })
	@Column({
		nullable: true,
		default: "Popins",
	})
	font?: string;

	@Field()
	@Column()
	subdomain!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	customDomain?: string;

	@Field()
	@Column({
		default: false,
	})
	defaultForPreview!: boolean;

	@Field()
	@Column()
	userId!: number;

	@Field(() => Int)
	@Column()
	categoryId!: number;

	@Field(() => TenantCategory)
	@ManyToOne(() => TenantCategory, (category) => category.tenants)
	@JoinTable({ name: "category_id" })
	category!: TenantCategory;

	@Field(() => UserDataResponse)
	@ManyToOne(() => User, (user) => user.tenants)
	user!: User;

	@OneToMany(() => Staff, (staffs) => staffs.user)
	staffs!: Staff[];

	@OneToMany(() => ProductCategory, (categories) => categories.tenant)
	categories?: ProductCategory[];

	@OneToMany(() => ShippingMethod, (shippingmethods) => shippingmethods.tenant)
	shippingmethods?: ShippingMethod[];

	@OneToOne(() => TenantContact, (contact) => contact.tenant)
	contact!: TenantContact;

	@OneToOne(() => TenantKyc, (kyc) => kyc.tenant)
	kyc!: TenantKyc;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
