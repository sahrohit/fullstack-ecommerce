import { PriceTag } from "@/components/shared/product/PriceTag";
import {
	Stack,
	CardBody,
	Heading,
	CardFooter,
	Button,
	Text,
	Image,
	Card,
	HStack,
	VStack,
} from "@chakra-ui/react";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { MdFlipCameraAndroid } from "react-icons/md";

const OrderCard = () => (
	<Card
		direction={{ base: "column", sm: "row" }}
		overflow="hidden"
		variant="outline"
		w="full"
	>
		<Image
			objectFit="cover"
			maxW={{ base: "100%", sm: "200px" }}
			src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
			alt="Caffe Latte"
		/>

		<Stack>
			<CardBody>
				<Heading size="xs" fontWeight="semibold">
					20th December 2020
				</Heading>

				<VStack gap={2}>
					<Text>
						Dettol Antiseptic Liquid for First Aid , Surface Disinfection and
						Personal Hygiene , 550ml
					</Text>
					<HStack w="full" justifyContent="space-between">
						<Text textAlign="left">
							Size: 550ml
							<br />
							Quantity: 1
							<br />
							Color: White
						</Text>
						<VStack>
							<HStack>
								<AiOutlineDeliveredProcedure />
								<Text>Delivered</Text>
							</HStack>
							<PriceTag currency="USD" price={10} />
						</VStack>
					</HStack>
				</VStack>
			</CardBody>

			<CardFooter gap={2} pt={0}>
				<Button
					variant="outline"
					colorScheme="blue"
					leftIcon={<MdFlipCameraAndroid />}
				>
					Buy it again
				</Button>
				<Button variant="solid" colorScheme="blue">
					View Order
				</Button>
			</CardFooter>
		</Stack>
	</Card>
);

export default OrderCard;
