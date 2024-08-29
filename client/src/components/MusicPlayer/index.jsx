import { useEffect, useRef, useState } from "react";
import {
	Flex,
	Hide,
	SimpleGrid,
	useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
	nextTrack,
	prevTrack,
	setPlaying,
} from "../../redux/slices/playerSlice";
import VolumeControl from "./VolumeControl";
import TrackDetails from "./TrackDetails";
import PlayControls from "./PlayControls";
import LoginModal from "../LoginModal";
import PlayingBar from "./PlayingBar";

const MusicPlayer = () => {
	// State and refs initialization
	const { isOpen, onClose } = useDisclosure();
	const modalRef = useRef();
	const dispatch = useDispatch();
	const { currentTrack, repeatStatus, currentIndex, trackList, isPlaying } =
		useSelector((state) => state.player);
	const audioRef = useRef();
	const isEndOfTracklist = currentIndex === trackList.length - 1;

	const [songDetails, setSongDetails] = useState(null);
	const [audioPlaying, setAudioPlaying] = useState(
		audioRef.current && audioRef.current.playing
	);

	// Effect to update playing state in Redux
	useEffect(() => {
		if (audioPlaying) {
			dispatch(setPlaying(true));
		} else {
			dispatch(setPlaying(false));
		}
	}, [audioPlaying]);

	// Effect to play audio when isPlaying changes
	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
		}
	}, [isPlaying]);

	// Effect to reset song details and play new track
	useEffect(() => {
		setSongDetails((prev) => {
			return { ...prev, time: 0 }; // Reset time
		});
		audioRef.current.currentTime = 0; // Reset current time
		audioRef.current.play(); // Play the new track
	}, [currentTrack?._id]);

	// Effect to update song details based on audio reference
	useEffect(() => {
		setSongDetails({
			volume: 1, // Default volume
			time: audioRef?.current
				? Math.round(
						(audioRef?.current.currentTime / audioRef.current.duration) * 100
				  ) // Calculate time percentage
				: 0,
			shuffle: false,
			repeat: false,
		});
	}, [audioRef.current]);

	// Function to seek to a specific point in the track
	const seekPoint = (e) => {
		audioRef.current.currentTime = (e / 100) * audioRef.current.duration; // Set current time based on seek percentage
		setSongDetails((prev) => ({
			...prev,
			time: Math.round(
				(audioRef.current.currentTime / audioRef.current.duration) * 100
			), // Update time percentage
		}));
	};

	// Function to change volume
	const changeVolume = (e) => {
		setSongDetails((prevValues) => {
			return { ...prevValues, volume: e / 100 }; // Update volume in state
		});
		audioRef.current.volume = e / 100; // Set audio element volume
	};

	// Function to handle play/pause action
	const handlePlayPause = () => {
		if (isPlaying) {
			audioRef?.current.pause(); // Pause audio
			dispatch(setPlaying(false)); // Update playing state
		} else {
			audioRef?.current.play(); // Play audio
			dispatch(setPlaying(true)); // Update playing state
		}
	};

	// Function to toggle volume mute/unmute
	const volumeToggle = () => {
		if (songDetails?.volume > 0) {
			setSongDetails((prev) => {
				return { ...prev, volume: 0 }; // Mute volume
			});
			audioRef.current.volume = 0; // Set audio element volume to 0
		} else {
			setSongDetails((prev) => {
				return { ...prev, volume: 1 }; // Unmute volume
			});
			audioRef.current.volume = 1; // Set audio element volume to 1
		}
	};

	// Effect to reset and play the current track
	useEffect(() => {
		audioRef.current.currentTime = 0; // Reset current time
		audioRef?.current.play(); // Play the current track
		dispatch(setPlaying(true)); // Update playing state
	}, [currentTrack.src]);

	// Function to handle next song action
	const handleNextSong = () => {
		if (trackList.length == 1) {
			restartSong(); // Restart song if only one track
		} else {
			dispatch(nextTrack()); // Dispatch next track action
		}
	};

	// Function to handle previous song action
	const handlePreviousSong = () => {
		if (trackList.length == 1) {
			restartSong(); // Restart song if only one track
		} else {
			dispatch(prevTrack()); // Dispatch previous track action
		}
	};

	// Function to restart the current song
	const restartSong = () => {
		setSongDetails((prev) => {
			return { ...prev, time: 0 }; // Reset time
		});
		audioRef.current.currentTime = 0; // Reset current time
		audioRef.current.play(); // Play the song
	};

	// Function to handle when the track ends
	const handleEnded = () => {
		switch (repeatStatus) {
			case "OFF":
				if (!isEndOfTracklist) {
					handleNextSong(); // Go to next song if not at the end
				}
				break;
			case "TRACKLIST":
				handleNextSong(); // Go to next song in tracklist
				break;
			case "SINGLE":
				audioRef.current.play(); // Replay the current song
				break;
			default:
				break;
		}
	};

	return (
		<>
			<LoginModal ref={modalRef} onClose={onClose} isOpen={isOpen} />
			<SimpleGrid
				templateColumns="repeat(3, 1fr)"
				align="center"
				justify="space-between"
				position="fixed"
				bottom="0"
				left="0"
				zIndex={100}
				width="full"
				p={4}
				border="1px"
				borderColor="zinc.600"
				roundedTop="lg"
				bgColor="blackAlpha.700"
				backdropFilter="blur(15px)">
				<TrackDetails track={currentTrack} />
				<Flex direction="column" gap={2}>
					<PlayControls
						isPlaying={isPlaying}
						onNext={handleNextSong}
						onPlay={handlePlayPause}
						onPrevious={handlePreviousSong}
						repeatStatus={repeatStatus}
					/>
					<Hide below="md">
						<PlayingBar
							onSeek={seekPoint}
							time={songDetails?.time}
							track={currentTrack}
							trackRef={audioRef.current}
						/>
					</Hide>
				</Flex>
				<Flex align="center" justify="flex-end" gap={{ base: 0, md: 4 }}>
					<Flex justifyContent="space-between" gap={0}>
						<Hide below="md">
							<VolumeControl
								onChange={changeVolume}
								onToggle={volumeToggle}
								volume={songDetails ? songDetails?.volume : 0}
							/>
						</Hide>
						<audio
							ref={audioRef}
							src={currentTrack?.songUrl}
							onPause={() => setAudioPlaying(false)} // Update audio playing state
							onPlay={() => setAudioPlaying(true)} // Update audio playing state
							onEnded={handleEnded} // Handle track end
							onTimeUpdate={() => {
								setSongDetails((prev) => ({
									...prev,
									time: Math.round(
										(audioRef.current.currentTime / audioRef.current.duration) *
											100
									), // Update time percentage
								}));
							}}
						/>
					</Flex>
				</Flex>
			</SimpleGrid>
		</>
	);
};

export { MusicPlayer };
