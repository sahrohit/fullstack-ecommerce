import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import TextareaAutosize from "react-textarea-autosize";

type TextAreaProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	placeholder: string;
	autoComplete?: string;
	className?: string;
};

const TextArea = (props: TextAreaProps) => {
	const [field, { error, touched }] = useField(props as any);
	return (
		<div className="w-full">
			<label htmlFor={field.name} className={"label"}>
				<span className="label-text">{props.label}</span>
				{error && touched && (
					<span className="label-text-alt text-red-600">{error}</span>
				)}
			</label>
			<TextareaAutosize
				{...field}
				minRows={3}
				autoComplete={props.autoComplete}
				placeholder={props.placeholder}
				className={`textarea textarea-bordered w-full h-max ${
					error && touched && "textarea-error m-0"
				}`}
			/>
		</div>
	);
};

export default TextArea;
