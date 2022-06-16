import { ReactNode, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	placeholder: string;
	type?: HTMLInputTypeAttribute;
	autoComplete?: string;
	icon?: ReactNode;
	className?: string;
};	

const InputField = (props: InputFieldProps) => {
	const [field, { error }] = useField(props);

	const color = error ? "green" : "gray";

	return (
		<div className="mb-6">
			<label
				htmlFor={field.name}
				className={`block mb-2 text-sm font-medium text-${color}-700 dark:text-${color}-200`}
			>
				{props.label}
			</label>
			<div className={props?.icon ? "relative" : ""}>
				{props?.icon && (
					<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
						{props.icon}
					</div>
				)}
				<input
					{...field}
					type={props.type}
					id={field.name}
					autoComplete={props.autoComplete}
					className={`${props.className ? props.className : ``} ${
						props?.icon ? `pl-10` : ``
					} bg-${color}-50 border border-${color}-500 text-${color}-900 placeholder-${color}-700 text-sm rounded-lg focus:ring-${color}-500 dark:bg-${color}-800 focus:border-${color}-500 block w-full p-2.5 dark:text-${color}-400  dark:placeholder-${color}-500 dark:border-${color}-500  outline-none`}
					placeholder={props.placeholder}
				/>
			</div>
			{error && (
				<p className="mt-2 text-sm text-red-600 dark:text-red-500">
					<span className="font-medium">Oh, snapp!</span> {error}
				</p>
			)}
		</div>
	);
};

export default InputField;
