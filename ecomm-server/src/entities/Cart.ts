import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from "typeorm";
import { ProductInventory } from "./ProductInventory";
import { User } from "./User";

@ObjectType()
@Entity()
@Unique(["userId", "inventoryId"])
export class Cart extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	userId!: number;

	@Field()
	@Column()
	quantity!: number;

	@Field()
	@Column()
	inventoryId!: number;

	@ManyToOne(
		() => ProductInventory,
		(productinventory) => productinventory.carts
	)
	productinventory!: ProductInventory;

	@ManyToOne(() => User, (user) => user.carts)
	user!: User;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
