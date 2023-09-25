import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	Column,
	JoinColumn,
	OneToOne,
} from "typeorm";
import { Tenant } from "./Tenant";

export const POSSIBLE_KYC_STATUS = [
	"NOT_SUBMITTED",
	"IN_PROGRESS",
	"VERIFIED",
	"FAILED",
];

export type KYCStatus = "NOT_SUBMITTED" | "IN_PROGRESS" | "VERIFIED" | "FAILED";

@ObjectType()
@Entity()
export class TenantKyc extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@Column()
	name!: string;

	@Field(() => String)
	@Column()
	address!: string;

	@Field(() => String)
	@Column()
	phone_number!: string;

	@Field(() => String)
	@Column()
	pan_number!: string;

	@Field(() => String)
	@Column()
	bank_name!: string;

	@Field(() => String)
	@Column()
	bank_branch!: string;

	@Field(() => String)
	@Column()
	account_number!: string;

	@Field(() => String)
	@Column()
	account_name!: string;

	@Field(() => String)
	@Column()
	registration_document!: string;

	@Field(() => String)
	@Column()
	pan_document!: string;

	@Field(() => String)
	@Column({
		type: "enum",
		enum: POSSIBLE_KYC_STATUS,
		default: "NOT_SUBMITTED",
	})
	status!: KYCStatus;

	@Field(() => Int)
	@Column()
	tenantId!: number;

	@OneToOne(() => Tenant, (tenant) => tenant.contact)
	@JoinColumn()
	tenant!: Tenant;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
