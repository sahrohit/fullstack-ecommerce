
interface CartBodyProps {
	products: Product[];
}

interface Product {
	id: number;
	name: string;
	href: string;
	color: string;
	price: string;
	quantity: number;
	imageSrc: string;
	imageAlt: string;
}

const CartBody = ({ products }: CartBodyProps) => {
	return (
		<div className="flex-1 overflow-y-auto px-4 sm:px-6">
			<div className="mt-8">
				<div className="flow-root">
					<ul role="list" className="-my-6 divide-y divide-gray-200">
						{products.map((product) => (
							<li key={product.id} className="flex py-6">
								<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
									<img
										src={product.imageSrc}
										alt={product.imageAlt}
										className="h-full w-full object-cover object-center"
									/>
								</div>

								<div className="ml-4 flex flex-1 flex-col">
									<div>
										<div className="flex justify-between text-base font-medium text-gray-900">
											<h3>
												<a href={product.href}> {product.name} </a>
											</h3>
											<p className="ml-4">{product.price}</p>
										</div>
										<p className="mt-1 text-sm text-gray-500">
											{product.color}
										</p>
									</div>
									<div className="flex flex-1 items-end justify-between text-sm">
										<p className="text-gray-500">Qty {product.quantity}</p>

										<div className="flex">
											<button
												type="button"
												className="font-medium text-indigo-600 hover:text-indigo-500"
											>
												Remove
											</button>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CartBody;
