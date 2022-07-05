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
	const [field, { error }] = useField(props);
	return (
		<div className="w-full">
			<label htmlFor={field.name} className={"label"}>
				<span className="label-text">{props.label}</span>
				{error && (
					<span className="label-text-alt text-red-600">
						Oh, snapp! {error}
					</span>
				)}
			</label>
			{props.leftAddon ? (
				<label className="input-group">
					<span>{props.leftAddon}</span>
					<input
						{...field}
						type={props.type}
						id={field.name}
						autoComplete={props.autoComplete}
						placeholder={props.placeholder}
						className={`input input-md input-bordered w-full ${
							error && "input-error"
						}`}
					/>
				</label>
			) : (
				<input
					{...field}
					type={props.type}
					id={field.name}
					autoComplete={props.autoComplete}
					placeholder={props.placeholder}
					className={`input input-md input-bordered w-full ${
						error && "input-error"
					}`}
				/>
			)}
		</div>
	);
};

export default InputField;
