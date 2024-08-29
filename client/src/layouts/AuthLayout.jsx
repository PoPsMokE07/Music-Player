import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { BiMusic } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
	// Select user state from Redux store
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		// Redirect to home if user is logged in
		if (user) {
			navigate("/home");
		}
	}, [user]);

	return (
		<main>
			{/* Header section with logo and title */}
			<Flex
				align="center"
				justify="flex-start"
				bg="zinc.800"
				p={4}
				pl={6}
				h={{ base: "full", md: "5rem" }}>
				<Flex align="center" color="accent.main" justify="flex-start" gap={2}>
					<BiMusic size={30} />
					{/* <Heading
						fontWeight="semibold"
						color="gray.200"
						fontSize={{ base: "lg", md: "2xl" }}>
						Beat
					</Heading> */}
				</Flex>
			</Flex>
			{/* Main content area */}
			<Box bg="zinc.950" h="full" minH="91vh">
				<Outlet />
			</Box>
		</main>
	);
};

export default AuthLayout;
