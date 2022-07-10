import { InputHTMLAttributes } from "react";
import { useField } from "formik";

type SelectFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	placeholder: string;
	options: string[];
};

const SelectField = (props: SelectFieldProps) => {
	const [field] = useField(props);
	return (
		<div>
			<label className="label">
				<span className="label-text">{props.label}</span>
			</label>
			<select
				{...field}
				name={field.name}
				className="select select-bordered w-full max-w-xs"
			>
				{props.options.map((state: string) => (
					<option key={state}>{state}</option>
				))}
			</select>
		</div>
	);
};

export default SelectField;
