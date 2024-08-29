import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	duration: {
		type: String,
		required: true,
	},
	coverImage: {
		type: String,
		required: true,
		default:
			"https://firebasestorage.googleapis.com/v0/b/socialstream-ba300.appspot.com/o/music_app_files%2Fplaylist_cover.jpg?alt=media&token=546adcad-e9c3-402f-8a57-b7ba252100ec",
	},
	songUrl: {
		type: String,
		required: true,
	},
});

const Song = mongoose.model("Song", SongSchema);
export default Song;
