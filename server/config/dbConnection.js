import mongoose from "mongoose";

export const connectDb = async () => {
	try {
		if (!process.env.MONGODB_URI) {
			throw new Error("MONGODB_URI is not defined");
		}
		const connect = await mongoose.connect(process.env.MONGODB_URI);
		console.log("DATABASE CONNECTED", connect.connection.name);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};