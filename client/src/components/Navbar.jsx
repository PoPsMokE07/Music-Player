import { BiMenuAltRight, BiMusic } from "react-icons/bi";
import { AiFillHeart, AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { BsHeadphones } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import { HiOutlineUserCircle, HiViewGrid } from "react-icons/hi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Hide,
	Show,
	Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { resetPlayer } from "../redux/slices/playerSlice";
import { useEffect, useState } from "react";

// Mobile navigation component
const MobileNav = () => {
	const [navIsOpen, setNavIsOpen] = useState(false); // State for mobile nav open/close
	const { pathname } = useLocation(); // Get current path

	useEffect(() => {
		setNavIsOpen(false); // Close nav on path change
	}, [pathname]);

	const toggleNav = () => {
		setNavIsOpen(!navIsOpen); // Toggle nav open/close
	};

	return (
		<Box
			position="fixed"
			top={0}
			left={0}
			zIndex={30}
			w="full"
			h={navIsOpen ? "100vh" : undefined} // Full height if nav is open
			bg="zinc.950">
			<Flex align="center" justify="space-between" p={2}>
				<Link to="/home">
					<Flex color="accent.main" align="center" gap={4}>
					</Flex>
				</Link>
				<Button variant="unstyled" onClick={toggleNav}>
					{navIsOpen ? <TiTimes size={24} /> : <BiMenuAltRight size={24} />}
				</Button>
			</Flex>
			{navIsOpen && (
				<Box px={4} pb={2} h="full">
					<NavContent /> {/* Render navigation content */}
				</Box>
			)}
		</Box>
	);
};

// Desktop navigation component
const DesktopNav = () => {
	return (
		<Box
			position="fixed"
			top={0}
			left={0}
			zIndex={30}
			minW={{ base: "full", md: "10rem", lg: "12rem", "2xl": "20rem" }} // Decreased width here
			minH={{ base: "5rem", md: "100vh" }}
			borderRight="1px"
			borderRightColor="zinc.600"
			bg="zinc.900">
			<Flex direction="column" minH="100vh" p={4}>
				<Flex color="accent.main" align="center" gap={4}>
					
				</Flex>
				<NavContent /> {/* Render navigation content */}
			</Flex>
		</Box>
	);
};

// Navigation content component
const NavContent = () => {
	const { user } = useSelector((state) => state.user); 
	const dispatch = useDispatch(); 
	const navigate = useNavigate(); 

	const handleLogout = () => {
		dispatch(resetPlayer()); 
		dispatch(logoutUser()); 
		navigate("/login"); 
	};

	const gotoLogin = () => {
		dispatch(resetPlayer()); 
		navigate("/login"); 
	};

	return (
		<Box>
			<Flex direction="column" gap={2} mt={12}>
				<NavLink to="/home">
					{({ isActive }) => (
						<Button
							bg={isActive ? "accent.main" : "transparent"} 
							_hover={
								isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }
							}
							rounded="base"
							display="inline-flex"
							alignItems="center"
							justifyContent="flex-start"
							gap={6}
							py={6}
							px={4}
							w="full">
							<AiFillHome size={20} />
							<span>Home</span>
						</Button>
					)}
				</NavLink>
				
				<NavLink to="/home/playlists">
					{({ isActive }) => (
						<Button
							bg={isActive ? "accent.main" : "transparent"} 
							_hover={
								isActive ? { opacity: 0.8 } : { bg: "accent.transparent" }
							}
							rounded="base"
							display="inline-flex"
							alignItems="center"
							justifyContent="flex-start"
							gap={6}
							w="full"
							py={6}
							px={4}>
							<BsHeadphones size={20} />
							<span>Playlists</span>
						</Button>
					)}
				</NavLink>
				
			</Flex>
			<Divider
				bg="zinc.500"
				border="0"
				mt={{ base: 12, md: 6, lg: 12 }}
				h="1px"
				mb={4}
			/>
			<Box>
				{user ? ( // Check if user is logged in
					<Box p={3}>
						<Flex align="center" gap={4} color="accent.light">
							<HiOutlineUserCircle size={20} color="inherit" />
							<Text color="inherit" fontSize="sm">
								{user?.username} {/* Display username */}
							</Text>
						</Flex>
						<Button
							onClick={handleLogout} // Logout button
							mt={{ base: 8, md: 4, lg: 8 }}
							variant="unstyled"
							display="inline-flex"
							alignItems="center"
							fontWeight={400}
							gap={3}>
							{" "}
							<AiOutlineLogout size={20} /> Logout
						</Button>
					</Box>
				) : (
					<Button
						onClick={gotoLogin} // Login button
						variant="unstyled"
						rounded="base"
						w="full"
						border="1px"
						borderColor="zinc.600"
						fontSize="sm"
						py={2}
						px={5}>
						Login
					</Button>
				)}
			</Box>
		</Box>
	);
};

// Main Navbar component
const Navbar = () => {
	return (
		<>
			<Show above="md">
				<DesktopNav /> {/* Show desktop navigation */}
			</Show>
			<Hide above="md">
				<MobileNav /> {/* Show mobile navigation */}
			</Hide>
		</>
	);
};

export default Navbar; // Export Navbar component