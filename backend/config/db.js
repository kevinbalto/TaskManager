import moongosee from "mongoose";

const connectDB = async () => {
    try {
        const connection = await moongosee.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB Conected on: ${url}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;