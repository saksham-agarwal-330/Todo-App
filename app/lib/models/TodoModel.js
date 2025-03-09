import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const TodoModel = mongoose.models.todo || mongoose.model("todo", todoSchema);
export default TodoModel;