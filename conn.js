import mongoose from "mongoose";

export default async function connection()
{
    console.log("hai");
    const URL=process.env.DB_URL+process.env.DB_NAME;
    const db=await mongoose.connect(URL);
    console.log("DATA BASE CONNECTED");
    return db;
}

