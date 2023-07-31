import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if(whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Cors error"));
        }
    },
};

app.use(cors(corsOptions));
 
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}.`);
});