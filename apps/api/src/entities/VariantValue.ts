import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
	Column,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { Variant } from "./Variant";
import { ProductVariant } from "./ProductVariant";

@ObjectType()
@Entity()
export class VariantValue extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	value_id!: number;

	@Field(() => Variant)
	@ManyToOne(() => Variant, (variant) => variant.variant_values)
	@JoinColumn({ name: "variant_id" })
	variant!: number;

	@OneToMany(
		() => ProductVariant,
		(product_variant) => product_variant.variant_value
	)
	@JoinColumn({ name: "variant_value_id" })
	product_variant_id!: ProductVariant[];

	@Field(() => String)
	@Column()
	value!: string;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
