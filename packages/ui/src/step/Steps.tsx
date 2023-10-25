/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-constructed-context-values */
import { Children, useMemo, ReactNode } from "react";
import StepConnector from "./StepConnector";
import { StepContext } from "./StepContext";

interface Props {
	activeStep: number;
	children?: ReactNode;
}

const Steps = (props: Props) => {
	const { activeStep, children } = props;
	const steps = useMemo(
		() =>
			Children.toArray(children).map((step, i, arr) => (
				<StepContext.Provider
					key={`step-${i + 1}`}
					value={{
						isActive: activeStep === i,
						isCompleted: activeStep > i,
						isLastStep: arr.length !== i + 1,
						step: i + 1,
					}}
				>
					{step}
					{arr.length !== i + 1 && <StepConnector />}
				</StepContext.Provider>
			)),
		[activeStep, children]
	);
	return <>{steps}</>;
};

Steps.defaultProps = {
	children: undefined,
};

export default Steps;
