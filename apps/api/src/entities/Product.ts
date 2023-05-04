import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Discount } from "./Discount";
import { OrderItem } from "./OrderItem";
import { ProductCategory } from "./ProductCategory";
import { ProductImage } from "./ProductImage";
import { ProductInventory } from "./ProductInventory";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@Index({ unique: true })
	@Column()
	identifier!: string;

	@Field(() => String)
	@Column()
	name!: string;

	@Field(() => String)
	@Column({ type: "text" })
	desc!: string;

	@Field(() => Int)
	@Column()
	categoryId!: number;

	@Field({ nullable: true })
	@Column({ nullable: true })
	discountId?: number;

	@Field(() => [ProductImage])
	@OneToMany(() => ProductImage, (image) => image.product)
	images!: ProductImage[];

	@Field(() => ProductCategory)
	@ManyToOne(() => ProductCategory, (category) => category.products)
	@JoinTable({ name: "category_id" })
	category!: ProductCategory;

	@ManyToOne(() => OrderItem, (orderitem) => orderitem.product)
	orderitem!: OrderItem;

	@Field(() => [ProductInventory], { nullable: true })
	@OneToMany(() => ProductInventory, (inventory) => inventory.product)
	@JoinColumn()
	inventories!: ProductInventory[];

	@Field(() => Discount, { nullable: true })
	@ManyToOne(() => Discount, (discount) => discount.products)
	@JoinTable({ name: "discount_id" })
	discount!: Discount;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
