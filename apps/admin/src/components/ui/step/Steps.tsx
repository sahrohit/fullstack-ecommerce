/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from "react";
import StepConnector from "./StepConnector";
import { StepContext } from "./StepContext";

interface Props {
	activeStep: number;
	children?: React.ReactNode;
}

const Steps = (props: Props) => {
	const { activeStep, children } = props;
	const steps = React.useMemo(
		() =>
			React.Children.toArray(children).map((step, i, arr) => (
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
