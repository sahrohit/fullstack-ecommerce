import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
	Unique,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Tenant } from "./Tenant";

@ObjectType()
@Entity()
@Unique(["userId", "tenantId"])
export class Staff extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	userId!: number;

	@Field(() => User, { nullable: true })
	@OneToOne(() => User, (user) => user.staff)
	@JoinColumn()
	user!: User;

	@Field()
	@Column()
	tenantId!: number;

	@Field(() => Tenant, { nullable: true })
	@OneToOne(() => Tenant, (tenant) => tenant.staff)
	@JoinColumn()
	tenant!: Tenant;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
