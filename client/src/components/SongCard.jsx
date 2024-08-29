import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fadeInUp } from "../theme/motionVariants";
import {
	setCurrentTrack,
	setPlaying,
	setTrackList,
} from "../redux/slices/playerSlice";
import {
	AiFillPauseCircle,
	AiFillPlayCircle,
} from "react-icons/ai";


const SongCard = ({ song }) => {
	// Redux hooks to access state and dispatch actions
	const dispatch = useDispatch();
	const { currentTrack, isPlaying } = useSelector((state) => state.player);
	

	const toast = useToast();

	// Function to play the selected song
	const playSong = () => {
		dispatch(setCurrentTrack(song));
		dispatch(setTrackList({ list: [song] }));
		dispatch(setPlaying(true));
	};

	

	// Check if the current song is the one being played
	const isCurrentTrack = currentTrack?._id === song?._id;
	
	return (
		<Box
			as={motion.div}
			initial="initial"
			animate="animate"
			variants={fadeInUp}
			rounded="lg"
			bg="zinc.900"
			minW={{ base: "8rem", md: "10rem" }}
			pb={4}
			overflow="hidden"
			role="group">
			{/* Song cover image and play button */}
			<Box
				onClick={playSong}
				cursor="pointer"
				h={{ base: "8rem", md: "10rem" }}
				mb={4}
				overflow="hidden"
				position="relative">
				<Image
					src={song?.coverImage}
					alt={song?.title}
					w="full"
					roundedTop="base"
					transition="0.5s ease"
					_groupHover={{ transform: "scale(1.1)" }}
				/>
				{/* Overlay with play/pause button */}
				<Box
					_groupHover={{ opacity: 1 }}
					opacity={0}
					transition="0.5s ease"
					display="flex"
					alignItems="center"
					justifyContent="center"
					bg="blackAlpha.700"
					position="absolute"
					top={0}
					left={0}
					w="full"
					h="full">
					<Button
						variant="unstyled"
						display="inline-flex"
						alignItems="center"
						justifyContent="center"
						p={0}
						color="gray.300"
						rounded="full">
						{isPlaying && isCurrentTrack ? (
							<AiFillPauseCircle color="inherit" size={36} />
						) : (
							<AiFillPlayCircle color="inherit" size={36} />
						)}
					</Button>
				</Box>
			</Box>
			{/* Song title*/}
			<Flex gap={2} justify="space-between">
				<Box px={2}>
					<Heading
						as="h5"
						fontSize={{ base: "sm", md: "md" }}
						noOfLines={1}
						fontWeight={500}>
						{song?.title}
					</Heading>
				</Box>
			</Flex>
		</Box>
	);
};

export default SongCard;
