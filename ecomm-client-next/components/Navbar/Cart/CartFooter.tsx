import { Dispatch, SetStateAction } from "react";

interface CartFooterProps {
	className?: string;
	open: boolean;
	total: number;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const CartFooter = ({ className, setOpen, total }: CartFooterProps) => {
	return (
		<div className={`border-t border-gray-200 py-6 px-4 sm:px-6 ${className}`}>
			<div className="flex justify-between text-lg font-medium">
				<p>Subtotal</p>
				<p>Rs {total}</p>
			</div>
			<p className="mt-0.5 text-sm">
				Shipping and taxes calculated at checkout.
			</p>
			<button
				type="button"
				className="mt-6 btn btn-primary btn-block font-medium shadow-sm"
			>
				Checkout
			</button>
			<div className="mt-6 flex justify-center text-center text-sm">
				<p>
					or{" "}
					<button
						type="button"
						className="font-medium btn-link text-"
						onClick={() => setOpen(false)}
					>
						Continue Shopping
						<span aria-hidden="true"> &rarr;</span>
					</button>
				</p>
			</div>
		</div>
	);
};

export default CartFooter;
