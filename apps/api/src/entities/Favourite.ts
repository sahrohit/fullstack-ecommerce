import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
	Unique,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@ObjectType()
@Entity()
@Unique(["userId", "productId"])
export class Favourite extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => Int)
	@Column()
	userId!: number;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, (user) => user.carts)
	user!: User;

	@Field(() => Int)
	@Column()
	productId!: number;

	@Field(() => Product)
	@ManyToOne(() => Product, (product) => product.favourites)
	product!: Product;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
