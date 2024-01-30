const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const password=process.env.PASSWORD;
const uri=`mongodb+srv://jonathanmutinda99:${password}@cluster0.osk8jnh.mongodb.net/?retryWrites=true&w=majority`

class Database {
    static async connect() {
        try {
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 5000,
            });

            console.log('Connected to MongoDB using Mongoose');
        } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
            throw new Error("Error connecting to MongoDB");
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
            console.log("Disconnected from MongoDB using Mongoose");
        } catch (error) {
            console.error("Error disconnecting from MongoDB:", error.message);
        }
    }
}

module.exports=Database;

