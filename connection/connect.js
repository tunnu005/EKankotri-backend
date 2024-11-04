import mongoose from "mongoose"
import { config } from "dotenv";
config({
    path: './General.env',
})
// const URL= process.env.MONGO_URI;
const URL=process.env.MONGO_URL
// console.log(process.env.PORT)
                                                                                                

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;