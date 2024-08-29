import HomeHero from "../components/HomeHero";
import TopCharts from "../components/TopCharts";


import { Grid, GridItem} from "@chakra-ui/react";


const HomePage = () => {
	return (
		<Grid
			templateColumns={{ base: "1fr", lg: "repeat(8, 1fr)" }}
			minH="100vh"
			pl={{ base: 2, md: 14, lg: 12, xl: 0 }}
			pb={24}
			pt={{ base: 14, md: 4 }}>
			<GridItem colSpan={5} p={4}>
				
				<HomeHero />
				
			</GridItem>
			<GridItem colSpan={3} p={4}>
				<TopCharts />
				
			</GridItem>
		</Grid>
	);
};

export default HomePage;
