import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserPayment extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	userId!: number;

	@ManyToOne(() => User, (user) => user.userpayments)
	user!: User;

	@Field(() => String)
	@Column()
	payment_type!: string;

	@Field(() => String)
	@Column()
	provider!: string;

	@Field(() => Int)
	@Column()
	account_no!: number;

	@Field(() => Int)
	@Column({ type: "date" })
	expiry!: string;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
