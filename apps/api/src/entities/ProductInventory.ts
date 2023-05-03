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
import { Product } from "./Product";
import { ProductVariant } from "./ProductVariant";
@ObjectType()
@Entity()
export class ProductInventory extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	inventory_id!: number;

	@Field(() => Int)
	@Column({ type: "int" })
	quantity!: number;

	@Field(() => Int)
	@Column()
	price!: number;

	@Field(() => [ProductVariant], { nullable: true })
	@OneToMany(
		() => ProductVariant,
		(product_variant) => product_variant.inventory
	)
	@JoinColumn({ name: "inventory_id" })
	variants!: ProductVariant[];

	@Column()
	productId!: number;

	@ManyToOne(() => Product, (product) => product.inventories)
	product!: Product;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
