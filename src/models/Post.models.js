// import {Schema, model} from "mongoose";
import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const PostSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    photo: {
        type: String
    }

},{ collection: "posts",
    timestamps: true
});

PostSchema.plugin(mongooseAggregatePaginate)

export const Post = mongoose.model("Post", PostSchema)

// export default model('Post', PostSchema)