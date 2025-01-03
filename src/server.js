import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/index.js";

//import routes
import postRouter from "./routes/posts.routes.js"

dotenv.config({
    path: "./.env"
})

const app = express();
app.use(express.json());  // for parsing application/json
app.use(express.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

const PORT = process.env.PORT || 4001
connectDB() //connecting database
.then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
})
.catch((error) => {
    console.log("mongoDB connection error",error)
})


// routes
app.use('/api/v1/posts', postRouter);