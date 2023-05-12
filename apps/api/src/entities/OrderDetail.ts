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
	@Field(() => String)
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Field(() => Int)
	@Column()
	userId!: number;

	@ManyToOne(() => User, (user) => user.orderdetails)
	user!: User;

	@Field(() => String)
	@Column()
	status!: string;

	@Field(() => PaymentDetail)
	@OneToOne(() => PaymentDetail, (paymentdetail) => paymentdetail.orderdetail)
	@JoinColumn({ name: "payment_id" })
	paymentdetail!: PaymentDetail;

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
