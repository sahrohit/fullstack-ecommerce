/* eslint-disable @next/next/no-img-element */
import { CartResponse } from "@generated/graphql";

interface CartBodyProps {
	products?: CartResponse[] | [];
}

const CartBody = ({ products }: CartBodyProps) => {
	console.log(products);

	return (
		<div className="flex-1 overflow-y-auto px-4 sm:px-6">
			<div className="mt-8">
				<div className="flow-root">
					{products ? (
						<ul role="list" className="-my-6 divide-y divide-gray-200">
							{products.map((product) => (
								<li key={product.id} className="flex py-6">
									<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
										{product.images && product.images[0].imageURL ? (
											<img
												src={product.images[0]?.imageURL}
												alt={product.product_name}
												className="h-full w-full object-cover object-center"
											/>
										) : (
											<img
												src={"https://via.placeholder.com/150"}
												alt={product.product_name}
												className="h-full w-full object-cover object-center"
											/>
										)}
									</div>

									<div className="ml-4 flex flex-1 flex-col">
										<div>
											<div className="flex justify-between text-base font-medium text-gray-900">
												<h3>
													<a href="#"> {product.product_name} </a>
												</h3>
												<p className="ml-4">Rs {product.price}</p>
											</div>
											<div className="flex justify-between text-sm font-medium text-gray-500">
												<h3>
													<a href="#"> Variant: {product.variant} </a>
												</h3>
												<p className="ml-4"> ✕ {product.quantity}</p>
											</div>
										</div>
										<div className="flex flex-1 items-end justify-between text-sm">
											<p className="text-base font-medium text-gray-900 text-md">
												Rs {product.quantity * product.price}
											</p>

											<div className="btn-group">
												<button className="btn btn-sm btn-outline btn-ghost">
													+
												</button>
												<button className="btn btn-sm btn-outline btn-ghost">
													-
												</button>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className="text-center text-gray-500">No products in cart</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartBody;
