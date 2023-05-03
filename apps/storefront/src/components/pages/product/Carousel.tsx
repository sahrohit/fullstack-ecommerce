import { useState } from "react";
import {
	Flex,
	Image,
	Box,
	Text,
	TextProps,
	useBreakpointValue,
	Stack,
	HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import useDetectSwipe from "@/hooks/useDetectSwipe";

interface ProductImageProps {
	images: {
		id: string;
		alt?: string;
		src: string;
	}[];
}

const arrowStyles: TextProps = {
	cursor: "pointer",
	position: "absolute",
	top: "50%",
	w: "auto",
	mt: "-22px",
	p: "16px",
	color: "white",
	fontWeight: "bold",
	fontSize: "18px",
	transition: "0.6s ease",
	borderRadius: "0 3px 3px 0",
	userSelect: "none",
	_hover: {
		opacity: 0.8,
		bg: "black",
	},
};

const Carousel = ({ images }: ProductImageProps) => {
	const slides = images.map((image) => image.src);

	const [currentSlide, setCurrentSlide] = useState(0);

	const slidesCount = slides.length;

	const prevSlide = () => {
		setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
	};
	const nextSlide = () => {
		setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
	};
	const setSlide = (slide: number) => {
		setCurrentSlide(slide);
	};
	const { onTouchStart, onTouchMove, onTouchEnd } = useDetectSwipe({
		minSwipeDistance: 10,
		onLeftSwipe: nextSlide,
		onRightSwipe: prevSlide,
	});

	const isMobile = useBreakpointValue({ base: true, sm: false });

	const carouselStyle = {
		transition: "all .5s",
		ml: `-${currentSlide * 100}%`,
	};

	return (
		<Stack direction="column" alignItems="flex-start" spacing={2}>
			<Flex w="full" overflow="hidden" pos="relative">
				<Flex
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
					h={isMobile ? "400px" : "480px"}
					w="full"
					{...carouselStyle}
				>
					{slides.map((slide, sid) => (
						// eslint-disable-next-line react/no-array-index-key
						<Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
							<Text
								color="white"
								fontSize="xs"
								p="8px 12px"
								pos="absolute"
								top="0"
							>
								{sid + 1} / {slidesCount}
							</Text>
							<Image
								alt="Image"
								src={slide}
								boxSize="full"
								fit="cover"
								bgPos="center"
								borderRadius="lg"
							/>
						</Box>
					))}
				</Flex>
				{slides.length > 1 && (
					<>
						<Text {...arrowStyles} left="0" onClick={prevSlide}>
							&#10094;
						</Text>
						<Text {...arrowStyles} right="0" onClick={nextSlide}>
							&#10095;
						</Text>
					</>
				)}
			</Flex>
			{!isMobile && (
				<CarouselNavigation
					slides={slides}
					currentSlide={currentSlide}
					setSlide={setSlide}
				/>
			)}
		</Stack>
	);
};

export default Carousel;

interface CarouselNavigationProps {
	slides: string[];
	currentSlide: number;
	setSlide: (slide: number) => void;
}

const CarouselNavigation = ({
	slides,
	currentSlide,
	setSlide,
}: CarouselNavigationProps) => {
	// const MotionGrid = motion(SimpleGrid);
	const MotionBox = motion(Box);
	const MotionImage = motion(Image);

	return (
		<HStack
			w="full"
			justifyContent="center"
			css={{
				"&::-webkit-scrollbar": {
					width: "2px",
					height: "8px",
				},
				"&::-webkit-scrollbar-track": {
					width: "4px",
					height: "10px",
				},
				"&::-webkit-scrollbar-thumb": {
					background: "#A0AEC0",
					borderRadius: "24px",
				},
			}}
		>
			{slides.map((slide, index) => {
				// ? The dimension is calculated based on the number of slides
				// ? and the width of the screen, but hardcoding based on size
				// ? of the images is also not a bed idea
				// const dimension = `max(calc(50vw/${
				// 	slides.length + slides.length / 4
				// }),30px)`;
				// const slideGreaterThanTen = slides.length > 10;
				// const dimension = slides.length > 5 ? `40px` : `80px`;

				const dimension = () => {
					if (slides.length < 7) {
						return `80px`;
					}
					if (slides.length < 10) {
						return `60px`;
					}
					if (slides.length < 15) {
						return `40px`;
					}
					return `20px`;
				};

				return (
					<MotionBox
						borderWidth="5px"
						borderColor="transparent"
						whileTap={{ scale: 0.9 }}
						animate={currentSlide === index ? { scale: 1.15 } : { scale: 1 }}
						key={`dots-${slide}`}
						borderRadius="5px"
					>
						<MotionImage
							minW={dimension}
							minH={dimension}
							maxW={dimension}
							maxH={dimension}
							alt="Image"
							src={slide}
							boxSize="full"
							fit="cover"
							bgPos="center"
							cursor="pointer"
							borderRadius="lg"
							filter={currentSlide !== index ? "grayscale(100%)" : "none"}
							onClick={() => setSlide(index)}
						/>
					</MotionBox>
				);
			})}
		</HStack>
	);
};
