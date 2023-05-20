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
import { Product } from "./Product";
import { User } from "./User";

export type ProductReviewRating = 1 | 2 | 3 | 4 | 5;

@ObjectType()
@Entity()
@Unique(["productId", "userId"])
export class ProductReview extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => Int)
	@Column()
	productId!: number;

	@ManyToOne(() => Product, (product) => product.reviews)
	product!: Product;

	@Field(() => Int)
	@Column()
	userId!: number;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, (user) => user.reviews)
	user!: User;

	@Field()
	@Column()
	rating!: number;

	@Field()
	@Column()
	review!: string;

	@Field()
	@Column()
	desc!: string;

	@Field()
	@Column({ default: false })
	isAnonymous!: boolean;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
