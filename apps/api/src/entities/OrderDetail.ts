import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { OrderItem } from "./OrderItem";
import { PaymentDetail } from "./PaymentDetail";
import { User } from "./User";
import { Promo } from "./Promo";
import { Address } from "./Address";
import { ShippingMethod } from "./ShippingMethod";

export type OrderStatus =
	| "PENDING"
	| "PLACED"
	| "SHIPPED"
	| "OUTFORDELIVERY"
	| "DELIVERED"
	| "REJECTED";

@Entity()
@ObjectType()
export class OrderDetail extends BaseEntity {
	@Field(() => String)
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Index()
	@Field(() => Int)
	@Column()
	userId!: number;

	@ManyToOne(() => User, (user) => user.orderdetails)
	user!: User;

	@Field(() => Int)
	@Column()
	addressId!: number;

	@Field(() => Int)
	@Column({ default: 99900 })
	amount!: number;

	@Field(() => Address)
	@ManyToOne(() => Address, (address) => address.orderdetails)
	address!: Address;

	@Field(() => Int)
	@Column()
	shippingId!: number;

	@Field(() => ShippingMethod)
	@ManyToOne(() => ShippingMethod, (shipping) => shipping.orderdetails)
	shipping!: ShippingMethod;

	@Field(() => Int, { nullable: true })
	@Column({ nullable: true })
	promoId!: number;

	@Field(() => Promo, { nullable: true })
	@ManyToOne(() => Promo, (promo) => promo.order)
	promo!: Promo;

	@Field(() => String)
	@Column({
		type: "enum",
		enum: [
			"PENDING",
			"PLACED",
			"SHIPPED",
			"OUTFORDELIVERY",
			"DELIVERED",
			"REJECTED",
		],
		default: "PENDING",
	})
	status!: OrderStatus;

	@Field(() => [PaymentDetail], { nullable: true })
	@OneToMany(() => PaymentDetail, (paymentdetail) => paymentdetail.orderdetail)
	paymentdetails!: PaymentDetail[];

	@Field(() => [OrderItem])
	@OneToMany(() => OrderItem, (orderitem) => orderitem.orderdetail)
	orderitems!: OrderItem[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
