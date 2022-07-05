import { ReactNode } from "react";

interface ConfirmationModalProps {
	id: string;
	children: ReactNode;
	className?: string;
	heading: string;
	description: ReactNode;
	onConfirm: () => void;
}

const ConfirmationModal = ({
	id,
	children,
	className,
	heading,
	description,
	onConfirm,
}: ConfirmationModalProps) => {
	return (
		<>
			<label htmlFor={id} className={`btn modal-button ${className}`}>
				{children}
			</label>

			<input type="checkbox" id={id} className="modal-toggle" />
			<div className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<label
						htmlFor={id}
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						X
					</label>
					<h3 className="font-bold text-lg">{heading}</h3>
					{description}
					<div className="modal-action mt-0">
						<label htmlFor={id} className="btn btn-primary">
							Cancel
						</label>
						<label
							htmlFor={id}
							className="btn btn-error btn-outline"
							onClick={onConfirm}
						>
							Delete
						</label>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmationModal;
