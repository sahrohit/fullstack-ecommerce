import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class ProductInventory extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({ type: "int" })
	quantity!: number;

	@OneToOne(() => Product, (product) => product.inventory)
	product!: Product;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
