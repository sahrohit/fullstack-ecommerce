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
import { Product } from "./Product";

@ObjectType()
@Entity()
export class ProductImage extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	imageURL!: string;

	@Field()
	@Column()
	productId!: number;

	@ManyToOne(() => Product, (product) => product.images)
	product!: Product;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
