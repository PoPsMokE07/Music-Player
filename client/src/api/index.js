import axios from "axios";

export const client = axios.create({
	baseURL: "https://music-player-production-ab35.up.railway.app/api",
});
