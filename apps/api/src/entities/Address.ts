import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { User } from "./User";
import { OrderDetail } from "./OrderDetail";

@ObjectType()
@Entity()
export class Address extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	type!: string;

	@Field()
	@Column({ default: false })
	isDefault!: boolean;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	address!: string;

	@Field()
	@Column()
	city!: string;

	@Field()
	@Column()
	state!: string;

	@Field()
	@Column()
	zip!: string;

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

	@OneToMany(() => OrderDetail, (orderdetails) => orderdetails.address)
	orderdetails!: OrderDetail[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
