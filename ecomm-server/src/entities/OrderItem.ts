import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { OrderDetail } from "./OrderDetail";
import { PaymentDetail } from "./PaymentDetail";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
@ObjectType()
export class OrderItem extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	orderId!: number;

	@ManyToOne(() => OrderDetail, (orderdetail) => orderdetail.orderitems)
	orderdetail!: OrderDetail;

	@Field()
	@Column()
	productId!: number;

	@OneToMany(() => Product, (product) => product.orderitem)
	product!: Product;

	@Field()
	@Column()
	quantity!: number;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
