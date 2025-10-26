import mongoose from "mongoose";


export const Connection = async () => {
    const URL = process.env.MOGODB_URL;

    try {
        await mongoose.connect(URL, {
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });
        console.log ('Database connected successfully!!!');
    } catch (error) {
        console.log ('Error while connecting with the database', error.message);
    }
}

export default Connection;