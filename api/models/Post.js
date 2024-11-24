import mongoose, { Schema }  from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
}, {
    timestamps: true,
})

const PostModel = mongoose.model('Post', PostSchema);
export default PostModel;