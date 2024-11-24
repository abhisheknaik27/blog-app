import mongoose  from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String
}, {
    timestamps: true,
})

const PostModel = mongoose.model('Post', PostSchema);
export default PostModel;