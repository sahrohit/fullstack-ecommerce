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
		<div>
			<label htmlFor={field.name} className={"label"}>
				<span className="label-text">{props.label}</span>
			</label>
			<input
				{...field}
				type={props.type}
				id={field.name}
				autoComplete={props.autoComplete}
				className={"input input-md input-bordered w-full"}
				placeholder={props.placeholder}
			/>
			{error && (
				<label className="label ">
					<span className="label-text-alt">Oh, snapp! {error}</span>
				</label>
			)}
		</div>
	);
};

export default InputField;
