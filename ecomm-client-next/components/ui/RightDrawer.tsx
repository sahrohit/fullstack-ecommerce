import CartBody from "@components/Navbar/Cart/CartBody";
import CartFooter from "@components/Navbar/Cart/CartFooter";
import CartHeader from "@components/Navbar/Cart/CartHeader";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { useFetchCartItemsQuery } from "@generated/graphql";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, ReactNode, SetStateAction } from "react";
import Alert from "./Alert";

interface RightDrawerProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	title: string;
	buttonContent: ReactNode;
	buttonStyle?: string;
	titleStyle?: string;
	children: ReactNode;
}

const RightDrawer = ({
	buttonStyle,
	buttonContent,
	title,
	titleStyle,
	open,
	setOpen,
}: RightDrawerProps) => {
	const { data, loading, error } = useFetchCartItemsQuery();

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	if (error) {
		return (
			<Alert
				message="An Error Occured"
				title="Couldn't load Current User"
				status="error"
			/>
		);
	}

	return (
		<>
			<button className={`btn ${buttonStyle}`} onClick={() => setOpen(true)}>
				{buttonContent}
			</button>
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full"
								>
									<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
										<div className="flex h-full flex-col overflow-y-scroll bg-base-100 shadow-xl">
											<CartHeader
												className="py-6 px-4"
												open={open}
												setOpen={setOpen}
												title={title}
												titleStyle={titleStyle}
											/>
											<CartBody products={data?.fetchCartItems ?? []} />
											<CartFooter
												open={open}
												setOpen={setOpen}
												total={
													data?.fetchCartItems
														?.map((item) => item.price * item.quantity)
														.reduce((a, b) => a + b, 0) ?? 0
												}
											/>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default RightDrawer;
