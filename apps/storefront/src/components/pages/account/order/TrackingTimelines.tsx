import { useEffect } from "react";
import {
	SimpleGrid,
	Box,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	Text,
	useSteps,
	SimpleGridProps,
} from "@chakra-ui/react";

interface TrackingTimelineProps extends SimpleGridProps {
	status: string;
	orientation?: "horizontal" | "vertical";
}

const TrackingTimeline = ({
	status,
	orientation,
	...rest
}: TrackingTimelineProps) => {
	const { activeStep, setActiveStep } = useSteps({
		index: steps.filter((step) => step.title === status)[0].index,
		count: steps.length,
	});
	useEffect(() => {
		setActiveStep(steps.filter((step) => step.title === status)[0].index);
	}, [setActiveStep, status]);
	return (
		<SimpleGrid
			placeItems="center"
			justifyContent="center"
			w="full"
			h="90vh!"
			maxW="sm"
			{...rest}
		>
			<Stepper
				size="lg"
				colorScheme={colorSchemeFromStatus(status)}
				w="full"
				maxW={{ base: "unset", lg: "2xl" }}
				orientation={orientation}
				index={activeStep}
				h="70vh"
				mx="4"
			>
				{steps.map((step, index) => (
					<Step key={`step-${index + 1}`}>
						<StepIndicator>
							<StepStatus
								complete={<StepIcon />}
								incomplete={<StepNumber />}
								active={<StepNumber />}
							/>
						</StepIndicator>

						<Box w="full">
							<StepTitle>{step.title}</StepTitle>
							{activeStep === index + 1 && (
								<StepDescription as={Text} textAlign="justify">
									{step.description}
								</StepDescription>
							)}
						</Box>

						<StepSeparator />
					</Step>
				))}
			</Stepper>
		</SimpleGrid>
	);
};

TrackingTimeline.defaultProps = {
	orientation: "vertical",
};

export default TrackingTimeline;

const steps = [
	{
		index: 1,
		title: "PENDING",
		description: "The order is placed and the payment is pending.",
	},
	{
		index: 2,
		title: "PLACED",
		description: "The order is confirmed and the payment is processed.",
	},
	{
		index: 3,
		title: "SHIPPED",
		description: "The order has left the sender location.",
	},
	{
		index: 4,
		title: "OUTFORDELIVERY",
		description:
			"Look out for the delivery guy. Your's order is out for delivery",
	},
	{
		index: 5,
		title: "DELIVERED",
		description:
			"Its delivered. If you are still checking here, go check your mail",
	},
];

export const colorSchemeFromStatus = (status: string) => {
	switch (status) {
		case "PENDING":
			return "yellow";
		case "PLACED":
			return "blue";
		case "SHIPPED":
			return "purple";
		case "OUTFORDELIVERY":
			return "teal";
		case "DELIVERED":
			return "green";
		default:
			return "gray";
	}
};
