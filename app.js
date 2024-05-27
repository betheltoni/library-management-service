import express from "express";
import "dotenv/config"
import {userRouter} from "./routes/user.routes.js";
import { connectToMongoDB } from "./db.js";

const app = express();
const port = process.env.PORT || 8000;

connectToMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the Blacq Library Management System!");
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});