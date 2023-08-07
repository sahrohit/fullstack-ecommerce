import { Grid, Spinner, Text, VStack } from "@chakra-ui/react";
import { PROD } from "../../../constants";

const PageLoader = ({ text }: { text?: string }) => (
	<Grid placeItems="center" h="100vh">
		<VStack>
			<Spinner size="xl" />
			{!PROD ? <Text>{text}</Text> : null}
		</VStack>
	</Grid>
);

PageLoader.defaultProps = {
	text: "",
};

export default PageLoader;
