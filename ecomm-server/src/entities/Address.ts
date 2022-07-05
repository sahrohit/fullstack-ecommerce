import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Address extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	nickname!: string;

	@Field()
	@Column()
	address_line1!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	address_line2!: string;

	@Field()
	@Column()
	city!: string;

	@Field()
	@Column()
	postal_code!: string;

	@Field()
	@Column()
	country!: string;

	@Field()
	@Column()
	phone_number!: string;

	@Field()
	@Column()
	userId!: number;

	@ManyToOne(() => User, (user) => user.addresses)
	user!: User;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
