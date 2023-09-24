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

@ObjectType()
@Entity()
export class TenantContact extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	primary?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	secondary?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	ntc?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	ncell?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	facebook?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	instagram?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	tiktok?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	twitter?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	whatsapp?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	viber?: string;

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
