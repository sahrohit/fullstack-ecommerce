import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	OneToMany,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { Address } from "./Address";
import { Payment } from "./Payment";
import { UserRole } from "./UserRole";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	password!: string;

	@Field()
	@Column()
	first_name!: string;

	@Field()
	@Column({ nullable: true })
	last_name!: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	@Field(() => Boolean)
	@Column({ default: false })
	email_verified!: boolean;

	@Field({ nullable: true })
	@Column({ unique: true, nullable: true })
	phone_number!: string;

	@Field(() => Boolean)
	@Column({ default: false })
	phone_number_verified!: boolean;

	@Field()
	@Column({ default: 1 })
	roleId!: number;

	@OneToOne(() => UserRole, (role) => role.user)
	@JoinColumn()
	role!: UserRole;

	@OneToMany(() => Payment, (payment) => payment.user)
	payments!: Payment[];

	@OneToMany(() => Address, (address) => address.user)
	addresses!: Address[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
