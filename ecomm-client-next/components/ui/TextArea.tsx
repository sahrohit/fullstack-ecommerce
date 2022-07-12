import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type TextAreaProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	placeholder: string;
	autoComplete?: string;
	className?: string;
};

const TextArea = (props: TextAreaProps) => {
	const [field, { error, touched }] = useField(props);
	return (
		<div className="w-full">
			<label htmlFor={field.name} className={"label"}>
				<span className="label-text">{props.label}</span>
				{error && touched && (
					<span className="label-text-alt text-red-600">{error}</span>
				)}
			</label>
			<textarea
				{...field}
				autoComplete={props.autoComplete}
				placeholder={props.placeholder}
				className={`textarea textarea-bordered w-full ${
					error && touched && "textarea-error"
				}`}
			/>
		</div>
	);
};

export default TextArea;
