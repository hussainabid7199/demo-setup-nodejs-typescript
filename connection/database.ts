import mongoose from "mongoose";

const connectDatabase = async(connectionString: string)=>{
    await mongoose.connect(connectionString)
        .then(() => console.log("MongoDB Connected..."))
        .catch((err) => console.log(err));
}

export default connectDatabase;