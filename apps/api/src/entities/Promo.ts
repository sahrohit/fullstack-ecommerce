import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	Index,
	OneToMany,
} from "typeorm";
import { OrderDetail } from "./OrderDetail";

@ObjectType()
@Entity()
export class Promo extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@Column()
	name!: string;

	@Index()
	@Field(() => String)
	@Column({ unique: true })
	code!: string;

	@Field(() => Int)
	@Column()
	discount_amount!: number;

	@Field(() => Boolean)
	@Column({ type: "boolean" })
	isDiscountAmountPercentage!: boolean;

	@Field(() => OrderDetail, { nullable: true })
	@OneToMany(() => OrderDetail, (order) => order.promo)
	order!: OrderDetail[];

	@Field(() => String)
	@Column({ type: "timestamptz" })
	starts_at!: Date;

	@Field(() => String)
	@Column({ type: "timestamptz" })
	expires_at!: Date;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
