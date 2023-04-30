import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	OneToMany,
	Column,
} from "typeorm";
import { VariantValue } from "./VariantValue";

@ObjectType()
@Entity()
export class Variant extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	variant_id!: number;

	@Field(() => String)
	@Column()
	variant_name!: string;

	@OneToMany(() => VariantValue, (variant_values) => variant_values.variant)
	variant_values!: VariantValue[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
