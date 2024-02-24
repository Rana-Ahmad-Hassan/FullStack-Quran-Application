import mongoose from "mongoose";


export const connection = async () => {
    try {
        const connec = await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected", connec.connection.host)
    } catch (error) {
        console.log(error, "error while connection the database")
    }
}