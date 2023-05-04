import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { ProductInventory } from "./ProductInventory";
import { VariantValue } from "./VariantValue";

@ObjectType()
@Entity()
export class ProductVariant extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	product_variant_id!: number;

	@ManyToOne(
		() => ProductInventory,
		(productinventory) => productinventory.variants
	)
	@JoinColumn({ name: "inventory_id" })
	inventory!: ProductInventory;

	@Field(() => VariantValue)
	@ManyToOne(
		() => VariantValue,
		(variant_value) => variant_value.product_variant_id
	)
	@JoinColumn({ name: "variant_value_id" })
	variant_value!: VariantValue;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
