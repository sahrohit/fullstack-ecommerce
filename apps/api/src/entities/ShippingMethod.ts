import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	Column,
	OneToMany,
	JoinTable,
	ManyToOne,
} from "typeorm";
import { OrderDetail } from "./OrderDetail";
import { Tenant } from "./Tenant";

@ObjectType()
@Entity()
export class ShippingMethod extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field(() => Int)
	@Column()
	price!: number;

	@Field(() => Int)
	@Column()
	dispatch_in!: number;

	@OneToMany(() => OrderDetail, (orderdetails) => orderdetails.address)
	orderdetails!: OrderDetail[];

	@Field(() => Int)
	@Column({ default: 1 })
	tenantId!: number;

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
