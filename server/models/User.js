import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	playlists: {
		type: Array,
		default: [],
	},
});

const User = mongoose.model("User", UserSchema);
export default User;
