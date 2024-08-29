import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import HomeLayout from "../layouts/HomeLayout";
import LibraryPage from "../pages/LibraryPage";
import PlaylistsPage from "../pages/PlaylistsPage";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PlaylistPage from "../pages/PlaylistPage";
import CreatePlaylistPage from "../pages/CreatePlaylistPage";


export const router = createBrowserRouter([
	{
		path: "/",
		element: <AuthLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Navigate to="/login" replace /> },
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
		],
	},
	{
		path: "/home",
		element: <HomeLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/home",
				element: <HomePage />,
			},
			{
				path: "library",
				element: <LibraryPage />,
			},
			{
				path: "playlists",
				element: <PlaylistsPage />,
			},
			{
				path: "playlists/:id",
				element: <PlaylistPage />,
			},
			{
				path: "playlists/create",
				element: <CreatePlaylistPage />,
			},
			
		],
	},
	
]);
