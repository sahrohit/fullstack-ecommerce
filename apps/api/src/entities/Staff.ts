import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	OneToOne,
	JoinColumn,
	Index,
	ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Tenant } from "./Tenant";

export const POSSIBLE_STAFF_STATUS = ["REVOKED", "ACCEPTED"];

export type StaffStatus = "REVOKED" | "ACCEPTED";

@ObjectType()
@Entity()
@Index(["userId", "tenantId"], { unique: true })
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
	@ManyToOne(() => Tenant, (tenant) => tenant.staffs)
	@JoinColumn()
	tenant!: Tenant;

	@Field(() => String)
	@Column({
		type: "enum",
		enum: POSSIBLE_STAFF_STATUS,
		default: "ACCEPTED",
	})
	status!: StaffStatus;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
