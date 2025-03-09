import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://saksham:2y2XXPqLx1e7kVNw@todo.9r47l.mongodb.net/todo-app");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDb; // ✅ Exporting as default
