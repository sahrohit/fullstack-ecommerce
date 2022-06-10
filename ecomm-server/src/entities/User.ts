import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	OneToMany,
} from "typeorm";
import { Address } from "./Address";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({ unique: true })
	username!: string;

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

	@Field()
	@Column({ unique: true, nullable: true })
	phone_number!: string;

	@Field(() => Boolean)
	@Column({ default: false })
	phone_number_verified!: boolean;

	@OneToMany(() => Address, (address) => address.user)
	addresses!: Address[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
