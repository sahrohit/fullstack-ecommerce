import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";
import { ProductVariant } from "./ProductVariant";

@ObjectType()
@Entity()
export class ProductInventory extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	inventory_id!: number;

	@Field()
	@Column({ type: "int" })
	quantity!: number;

	@Field()
	@Column()
	price!: number;

	@OneToMany(
		() => ProductVariant,
		(product_variant) => product_variant.inventory
	)
	@JoinColumn({ name: "inventory_id" })
	variants!: ProductVariant[];

	@Field()
	@Column()
	productId!: number;

	@ManyToOne(() => Product, (product) => product.inventories)
	product!: Product;

	@OneToMany(() => Cart, (cart) => cart.inventory)
	carts!: Cart[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
