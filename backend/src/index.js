import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";
import chalk from "chalk";


dotenv.config({
    path:'./env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(chalk.green(`Server is running on PORT ${process.env.PORT || 8000}`))
    })
})
.catch((err) => {
    console.log(chalk.red("Mongo db Connection Failed !!!", err))
})