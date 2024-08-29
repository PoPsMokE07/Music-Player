import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdError } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { client } from "../api";
import { loginUser } from "../redux/slices/userSlice";
import { resetPlayer } from "../redux/slices/playerSlice";

const LoginPage = () => {
	// State variables for error handling, loading state, and user input
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();

	// Function to validate input fields
	const validateFields = () => {
		if (username == "" || password == "") {
			setError("All fields are required!");
			return false;
		} else {
			setError(null);
			return true;
		}
	};

	// Function to handle login process
	const handleLogin = async () => {
		if (validateFields()) {
			setLoading(true);
			await client
				.post("/users/login", {
					username,
					password,
				})
				.then((res) => {
					// Dispatch actions on successful login
					dispatch(resetPlayer());
					dispatch(loginUser(res.data));
					setLoading(false);
				})
				.catch((err) => {
					// Set error message on failed login
					setError(err?.response?.data?.message);
					setLoading(false);
				});
		}
	};

	return (
		<Box minH="calc(100vh - 5rem)" maxW="2xl" mx="auto" p={6}>
			<Box
				bg={{ base: "zinc.950", md: "zinc.900" }}
				rounded="base"
				p={{ base: 2, md: 10 }}>
				{/* Header section */}
				<Box mb={8}>
					<Heading fontSize="2xl" color="zinc.200">
						Login
					</Heading>
					
				</Box>
				<Flex direction="column" gap={4}>
					{/* Username input field */}
					<FormControl>
						<FormLabel fontSize="xs" color="zinc.400">
							Username
						</FormLabel>
						<Input
							border="1px"
							borderColor="zinc.600"
							rounded="base"
							outline={0}
							type="text"
							color="zinc.300"
							fontSize="sm"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</FormControl>
					{/* Password input field */}
					<FormControl>
						<FormLabel fontSize="xs" color="zinc.400">
							Password
						</FormLabel>
						<InputGroup border="1px" borderColor="zinc.600" rounded="base">
							<Input
								border="none"
								_focus={{ outline: "none" }}
								type={showPassword ? "text" : "password"}
								color="zinc.300"
								fontSize="sm"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<InputRightElement>
								<Button
									p={1}
									color="zinc.300"
									_hover={{ opacity: 0.8 }}
									variant="ghost"
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>
					{/* Error message display */}
					{error && (
						<Flex align="center" color="red.500" gap={4}>
							<MdError color="inherit" />
							<Text color="inherit" fontSize="xs">
								{error}
							</Text>
						</Flex>
					)}
					{/* Login button and alternative options */}
					<Box mt={6}>
						<Button
							onClick={handleLogin}
							bg="accent.main"
							py={5}
							w="full"
							_hover={{ opacity: 0.8 }}>
							{loading ? <Spinner color="white" /> : "LOGIN"}
						</Button>
						<Text my={2} fontSize="sm" textAlign="center">
							OR
						</Text>
						
					</Box>
					{/* Registration link */}
					<Text fontSize="sm" color="zinc.400">
						{"Don't have an account yet?"}{" "}
						<Link to="/register">
							{" "}
							<Text as="span" color="accent.main">
								Register
							</Text>
						</Link>
					</Text>
				</Flex>
			</Box>
		</Box>
	);
};

export default LoginPage;
