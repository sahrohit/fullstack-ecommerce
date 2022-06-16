import React from "react";
import { FiAlertCircle } from "react-icons/fi";

interface AlertProps {
	title: string;
	message: string;
	status: "success" | "error" | "warning" | "info";
}

const Alert = ({ title, message, status }: AlertProps) => {
	let color;
	if (status == "error") {
		color = "red";
	} else if (status == "success") {
		color = "green";
	} else if (status == "warning") {
		color = "yellow";
	} else if (status == "info") {
		color = "blue";
	}

	return (
		<div
			className={`grid place-items-center p-8 m-8 space-x-4 text-${color}-600`}
		>
			<div className="text-6xl">
				<FiAlertCircle />
			</div>
			<div className="text-center">
				<div className="font-bold size-xl">{title}</div>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default Alert;
