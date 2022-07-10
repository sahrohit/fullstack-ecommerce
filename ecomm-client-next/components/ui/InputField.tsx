import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	placeholder: string;
	type?: HTMLInputTypeAttribute;
	autoComplete?: string;
	className?: string;
	leftAddon?: string;
};

const InputField = (props: InputFieldProps) => {
	const [field, { error, touched }] = useField(props);
	return (
		<div className="w-full">
			<label htmlFor={field.name} className={"label"}>
				<span className="label-text">{props.label}</span>
				{error && touched && (
					<span className="label-text-alt text-red-600">{error}</span>
				)}
			</label>
			{props.leftAddon ? (
				<label className="input-group">
					<span>{props.leftAddon}</span>
					<input
						{...field}
						type={props.type}
						autoComplete={props.autoComplete}
						placeholder={props.placeholder}
						className={`input input-md input-bordered w-full ${
							error && touched && "input-error"
						}`}
					/>
				</label>
			) : (
				<input
					{...field}
					type={props.type}
					autoComplete={props.autoComplete}
					placeholder={props.placeholder}
					className={`input input-md input-bordered w-full ${
						error && touched && "input-error"
					}`}
				/>
			)}
		</div>
	);
};

export default InputField;
