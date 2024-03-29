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
import { Cart } from "./Cart";
import { OrderItem } from "./OrderItem";
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

	@Field(() => [Cart], { nullable: true })
	@OneToMany(() => Cart, (cart) => cart.inventory)
	carts!: Cart[];

	@Field(() => [OrderItem], { nullable: true })
	@OneToMany(() => OrderItem, (orderitem) => orderitem.inventory)
	orderitems!: OrderItem[];

	@Column()
	productId!: number;

	@Field(() => Product)
	@ManyToOne(() => Product, (product) => product.inventories)
	product!: Product;

	@Field(() => Boolean)
	@Column({ default: true })
	isPublished!: boolean;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
