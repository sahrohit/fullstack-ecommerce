import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	placeholder: string;
	type?: HTMLInputTypeAttribute;
	autoComplete?: string;
	className?: string;
};

const InputField = (props: InputFieldProps) => {
	const [field, { error }] = useField(props);
	return (
		<div>
			<label htmlFor={field.name} className={"label"}>
				<span className="label-text">{props.label}</span>
				{error && (
					<span className="label-text-alt text-red-600">
						Oh, snapp! {error}
					</span>
				)}
			</label>
			<input
				{...field}
				type={props.type}
				id={field.name}
				autoComplete={props.autoComplete}
				className={`input input-md input-bordered w-full ${
					error && "input-error"
				}`}
				placeholder={props.placeholder}
			/>
		</div>
	);
};

export default InputField;
