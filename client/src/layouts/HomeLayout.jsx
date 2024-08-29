import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import { MusicPlayer } from "../components/MusicPlayer/index.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const HomeLayout = () => {
	// Get the current track from the Redux store
	const { currentTrack } = useSelector((state) => state.player);
	// Get the current pathname from the router
	const { pathname } = useLocation();

	// Scroll to the top of the page whenever the pathname changes
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<>
			<Grid
				position="relative"
				templateColumns={{ base: "1fr", md: "repeat(10, 1fr)" }}
				bg="blackAlpha.900"
				color="#e3e3e3">
				<GridItem colSpan={2}>
					
					<Navbar />
				</GridItem>
				<GridItem colSpan={8} minH={{ base: "97vh", md: "100vh" }}>
					<Outlet />
				</GridItem>
				{currentTrack && <MusicPlayer />}
			</Grid>
		</>
	);
};

export default HomeLayout;
