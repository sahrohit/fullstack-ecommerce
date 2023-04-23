import { Grid, Spinner } from "@chakra-ui/react";

const PageLoader = () => (
	<Grid placeItems="center" h="100vh">
		<Spinner size="xl" />
	</Grid>
);

export default PageLoader;
