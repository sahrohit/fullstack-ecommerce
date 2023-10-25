import { createContext } from "react";

export interface Context {
	step: number;
	isActive: boolean;
	isCompleted: boolean;
	isLastStep: boolean;
}

export const StepContext = createContext<Context | null>(null);
