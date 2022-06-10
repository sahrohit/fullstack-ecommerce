import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class ProductCategory extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column({ type: "text" })
	desc!: string;

	@OneToMany(() => Product, (product) => product.category)
	@JoinTable({ name: "product_id" })
	products!: Product[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
