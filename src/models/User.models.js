// import {Schema, model} from "mongoose"
import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        index: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: password,
        required: [true, "Password is required"],
    },

    // avatar: {
    //     type: String

    // },

    // coverImage: {
    //     type: String
    // },

    // bio: {
    //     type: String
    // },

    refreshToken: {
        type: String
    }

}, {
    collection: 'users',
    timestamps: true
});

UserSchema.plugin(mongooseAggregatePaginate)

export const User = mongoose.model("User", UserSchema)

// export default model('User', UserSchema);