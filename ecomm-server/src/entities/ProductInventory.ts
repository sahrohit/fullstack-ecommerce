import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Cart } from "./Cart";
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

	@Field()
	@Column()
	price!: number;

	@Field()
	@Column({ nullable: true })
	variant!: string;

	@Field()
	@Column()
	productId!: number;

	@ManyToOne(() => Product, (product) => product.inventories)
	product!: Product;

	@OneToMany(() => Cart, (cart) => cart.productinventory)
	carts!: Cart[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
