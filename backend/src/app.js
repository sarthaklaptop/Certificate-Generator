import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))


// configuration

app.use(express.json({limit: "16kb"}))


app.use(express.static("public"))

// Cookie Parser is used to read / perform CRUD operations on cookies from user browser
app.use(cookieParser())

// Routes Import

import userRouter from "./routes/certificate.routes.js"

// Routes declaration

app.use("/api/v1/certificate", userRouter)

// https://localhost:8000/api/v1/users/register
// https://localhost:8000/api/v1/users/login

export { app }