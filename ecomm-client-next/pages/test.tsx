import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { NextPage } from "next";

const MyRadioGroup: NextPage = () => {
	const [plan, setPlan] = useState("startup");

	return (
		<RadioGroup value={plan} onChange={setPlan}>
			<RadioGroup.Label>Plan</RadioGroup.Label>
			<RadioGroup.Option value="startup">
				{({ checked }) => (
					<span className={checked ? "bg-blue-200" : ""}>Startup</span>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value="business">
				{({ checked }) => (
					<span className={checked ? "bg-blue-200" : ""}>Business</span>
				)}
			</RadioGroup.Option>
			<RadioGroup.Option value="enterprise">
				{({ checked }) => (
					<span className={checked ? "bg-blue-200" : ""}>Enterprise</span>
				)}
			</RadioGroup.Option>
		</RadioGroup>
	);
};

export default MyRadioGroup;
