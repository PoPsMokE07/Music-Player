import { useEffect, useState } from "react";
import HorizontalMusicCard from "./HorizontalMusicCard";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { appear } from "../theme/motionVariants";
import { client } from "../api";
import { AiOutlineLoading } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { playTrack, setTrackList } from "../redux/slices/playerSlice";

const TopCharts = () => {
	// Redux dispatch for actions
	const dispatch = useDispatch();
	// State for loading, data, and error handling
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);

	// Function to fetch song data from the API
	const fetchData = async () => {
		setLoading(true);
		setError(false);
		await client
			.get("/songs")
			.then((res) => {
				// Set data and loading state on successful fetch
				setData(res.data);
				setLoading(false);
			})
			.catch(() => {
				// Handle error and update loading state
				setError(true);
				setLoading(false);
			});
	};

	useEffect(() => {
		// Fetch data on component mount
		fetchData();
	}, []);

	// Function to handle playing a selected song
	const handlePlaySong = (song) => {
		const index = data?.findIndex((s) => s._id == song._id);

		// Dispatch actions to set track list and play the selected song
		dispatch(setTrackList({ list: data, index }));
		dispatch(playTrack(song));
	};

	return (
		<Box
			bg="zinc.800"
			rounded="base"
			as={motion.div}
			initial="initial"
			animate="animate"
			variants={appear}
			p={{ base: 2, md: 4 }}>
			<Heading as="h3" fontSize="lg" fontWeight={500} mt={2} mb={6}>
				Library
			</Heading>
			{loading ? (
				<Flex align="center" color="accent.main" justify="center" minH="20rem">
					<AiOutlineLoading color="inherit" className="spin" size={36} />
				</Flex>
			) : (
				<Flex direction="column" gap={2}>
					{data?.map((song, i) => (
						<Flex key={i} align="center" gap={4}>
							<Text>{1 + i}</Text>
							<HorizontalMusicCard
								key={song._id}
								song={song}
								onPlay={handlePlaySong}
							/>
						</Flex>
					))}
				</Flex>
			)}

			{error && (
				<Box>
					<Text>An error occured while fetching top charts.</Text>
				</Box>
			)}
		</Box>
	);
};

export default TopCharts;
