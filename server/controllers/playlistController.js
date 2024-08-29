import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js";
import User from "../models/User.js";

// @desc Get all the playlists
// @route GET /api/playlists
// @access Public
const getPlaylists = async (req, res) => {
	try {
		const playlists = await Playlist.find({});
		res.status(200).json(playlists);
	} catch (error) {
		res.status(500).json({ message: "An error occurred while retrieving playlists." });
	}
};

// @desc Create a playlist
// @route POST /api/playlists/create
// @access Private
const createPlaylist = async (req, res) => {
	try {
		const { id, username } = req.user;
		const { title, description, songIds } = req.body;

		if (!title || !songIds || songIds.length === 0) {
			return res.status(400).json({ message: "Title and song IDs are required!" });
		}

		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({ message: "User not found!" });
		}

		// Validate all song IDs
		for (const songId of songIds) {
			const songExists = await Song.findById(songId);
			if (!songExists) {
				return res.status(404).json({ message: `Song with ID ${songId} not found!` });
			}
		}

		const newPlaylist = await Playlist.create({
			title,
			description,
			userId: id,
			userName: username,
			songs: songIds,
		});

		user.playlists.push(newPlaylist.id);
		await user.save();

		res.status(201).json(newPlaylist);
	} catch (error) {
		res.status(500).json({ message: "An error occurred while creating the playlist." });
	}
};

// @desc Get a playlist's details
// @route GET /api/playlists/:id
// @access Public
const getPlaylist = async (req, res) => {
	try {
		const { id } = req.params;

		const playlist = await Playlist.findById(id).populate('songs');

		if (!playlist) {
			return res.status(404).json({ message: "Playlist not found!" });
		}

		res.status(200).json(playlist);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export { getPlaylists, createPlaylist, getPlaylist };
