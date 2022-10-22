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
	UpdateDateColumn
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

	@Field()
	@Index({ unique: true })
	@Column()
	identifier: string;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column({ type: "text" })
	desc!: string;

	@Field()
	@Column()
	categoryId!: number;

	@Field()
	@Column({ nullable: true })
	discountId?: number;

	@OneToMany(() => ProductImage, (image) => image.product)
	images!: ProductImage[];

	@ManyToOne(() => ProductCategory, (category) => category.products)
	@JoinTable({ name: "category_id" })
	category!: ProductCategory;

	@ManyToOne(() => OrderItem, (orderitem) => orderitem.product)
	orderitem!: OrderItem;

	@OneToMany(() => ProductInventory, (inventory) => inventory.product)
	@JoinColumn()
	inventories!: ProductInventory[];

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
