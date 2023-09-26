import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index,
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
@Index(["tenantId"])
@Index(["id", "identifier"], { unique: true })
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
	@Column()
	tenantId!: number;

	@Field(() => Tenant)
	@ManyToOne(() => Tenant, (tenant) => tenant.categories)
	@JoinTable({ name: "tenant_id" })
	tenant!: Tenant;

	@Field(() => [Product], { nullable: true })
	@OneToMany(() => Product, (product) => product.category)
	@JoinTable({ name: "product_id" })
	products?: Product[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
