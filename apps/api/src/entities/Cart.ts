import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { ProductVariant } from "./ProductVariant";

@ObjectType()
@Entity()
@Unique(["userId", "variantId"])
export class Cart extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => Int)
	@Column()
	userId!: number;

	@Field(() => Int)
	@Column()
	quantity!: number;

	@Field(() => Int)
	@Column()
	variantId!: number;

	@Field(() => ProductVariant)
	@ManyToOne(() => ProductVariant, (productvariant) => productvariant.carts)
	@JoinColumn({ name: "variantId" })
	variant!: ProductVariant;

	@ManyToOne(() => User, (user) => user.carts)
	user!: User;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
