import { ReactNode, useState } from "react";

interface ConfirmationModalProps {
	id: string;
	children: ReactNode;
	className?: string;
	heading: string;
	description: ReactNode;
	needTypeConfirmation?: boolean;
	onConfirm: () => void;
}

const ConfirmationModal = ({
	id,
	children,
	className,
	heading,
	description,
	onConfirm,
	needTypeConfirmation,
}: ConfirmationModalProps) => {
	const [text, setText] = useState<string>("");
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
						✕
					</label>
					<h3 className="font-bold text-lg">{heading}</h3>
					{description}

					{needTypeConfirmation && (
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text text-lg">
									Type <strong>delete</strong> to confirm
								</span>
							</label>
							<input
								type="text"
								placeholder="delete"
								className="input input-bordered w-full max-w-xs mb-4"
								onChange={(e) => setText(e.currentTarget.value)}
							/>
						</div>
					)}

					<div className="modal-action mt-0">
						<label htmlFor={id} className="btn btn-primary">
							Cancel
						</label>
						<label
							aria-label="Confirm"
							aria-disabled={needTypeConfirmation && text !== "delete"}
							htmlFor={id}
							className={`btn btn-error btn-outline ${
								needTypeConfirmation && text !== "delete" ? `btn-disabled` : ``
							} `}
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
