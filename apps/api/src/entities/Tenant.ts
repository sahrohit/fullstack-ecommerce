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
} from "typeorm";
import { User } from "./User";
import { Staff } from "./Staff";
import { TenantCategory } from "./TenantCategory";
import { ProductCategory } from "./ProductCategory";

@ObjectType()
@Entity()
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

	@ManyToOne(() => User, (user) => user.tenants)
	user!: User;

	@OneToMany(() => Staff, (staffs) => staffs.user)
	staffs!: Staff[];

	@OneToMany(() => ProductCategory, (categories) => categories.tenant)
	categories?: ProductCategory[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
