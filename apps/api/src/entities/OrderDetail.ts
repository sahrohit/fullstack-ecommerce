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
import { OrderItem } from "./OrderItem";
import { PaymentDetail } from "./PaymentDetail";
import { User } from "./User";

@Entity()
@ObjectType()
export class OrderDetail extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	userId!: number;

	@ManyToOne(() => User, (user) => user.orderdetails)
	user!: User;

	@Field()
	@Column()
	total!: number;

	@Field()
	@Column()
	payment_id: number;

	@OneToOne(() => PaymentDetail, (paymentdetail) => paymentdetail.orderdetail)
	@JoinColumn()
	paymentdetail!: PaymentDetail;

	@OneToMany(() => OrderItem, (orderitem) => orderitem.orderdetail)
	orderitems!: OrderItem[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}
