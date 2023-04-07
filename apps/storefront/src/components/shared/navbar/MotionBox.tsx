import type { BoxProps } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";

export type MotionBoxProps = BoxProps & HTMLMotionProps<"div">;
export const MotionBox = motion<BoxProps>(Box);
