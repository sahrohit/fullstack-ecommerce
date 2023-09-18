import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Tenant } from "./Tenant";

@ObjectType()
@Entity()
export class TenantCategory extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@Column()
	name!: string;

	@Field(() => String)
	@Column({ unique: true })
	identifier!: string;

	@Field(() => String, { nullable: true })
	@Column({ type: "text", nullable: true })
	desc?: string;

	@Field(() => [Tenant], { nullable: true })
	@OneToMany(() => Tenant, (tenant) => tenant.category)
	@JoinTable({ name: "tenant_id" })
	tenants?: Tenant[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
