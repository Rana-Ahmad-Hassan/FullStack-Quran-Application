import dotenv from "dotenv"
import { connection } from "./src/db/db.js"
import { app } from "./app.js"

dotenv.config()


connection()
    .then(() => {
        const port = process.env.PORT
        app.listen(port, () => {
            console.log(`app is listening on port ${port}`)
        })
    })
    .catch((error) => {
        console.log(error, "while listening to the port")
    })