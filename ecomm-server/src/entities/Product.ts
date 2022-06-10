import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Discount } from "./Discount";
import { ProductCategory } from "./ProductCategory";
import { ProductInventory } from "./ProductInventory";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column({ type: "text" })
	desc!: string;

	@Field()
	@Column()
	price!: number;

	@Field()
	@Column()
	inventoryId!: number;

	@Field()
	@Column()
	categoryId!: number;

	@Field()
	@Column({ nullable: true })
	discountId?: number;

	@ManyToOne(() => ProductCategory, (category) => category.products)
	@JoinTable({ name: "category_id" })
	category!: ProductCategory;

	@OneToOne(() => ProductInventory, (inventory) => inventory.product)
	@JoinColumn()
	inventory!: ProductInventory;

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
