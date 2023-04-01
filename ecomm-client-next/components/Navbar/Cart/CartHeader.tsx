import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { HiX } from "react-icons/hi";

interface CartHeaderProps {
	className?: string;
	title: string;
	titleStyle?: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const CartHeader = ({
	title,
	titleStyle,
	setOpen,
	className,
}: CartHeaderProps) => {
	return (
		<div className={`flex items-start justify-between ${className}`}>
			<Dialog.Title className={`text-lg font-medium ${titleStyle}`}>
				{title}
			</Dialog.Title>
			<div className="ml-3 flex h-7 items-center">
				<button
					type="button"
					className="-m-2 p-2"
					onClick={() => setOpen(false)}
				>
					<span className="sr-only">Close panel</span>
					<HiX className="h-6 w-6" aria-hidden="true" />
				</button>
			</div>
		</div>
	);
};

export default CartHeader;
