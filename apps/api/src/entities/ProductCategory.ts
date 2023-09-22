import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";
import { Tenant } from "./Tenant";

@ObjectType()
@Entity()
export class ProductCategory extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@Column()
	name!: string;

	@Field(() => String)
	@Column({ unique: true })
	identifier!: string;

	@Field(() => String)
	@Column({ type: "text" })
	desc!: string;

	@Field(() => String)
	@Column()
	imageURL!: string;

	@Field(() => Int)
	@Column({ default: 1 })
	tenantId!: number;

	@Field(() => [Product], { nullable: true })
	@OneToMany(() => Product, (product) => product.category)
	@JoinTable({ name: "product_id" })
	products?: Product[];

	@Field(() => Tenant)
	@ManyToOne(() => Tenant, (tenant) => tenant.categories)
	@JoinTable({ name: "tenant_id" })
	tenant!: Tenant;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
