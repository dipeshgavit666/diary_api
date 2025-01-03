import mogoose, { connect } from "mongoose"

import mongoose from "mongoose"


const connectDB = async () => {
    try {
        const connectionInstatnce = await mongoose.connect(`${process.env.MONGODB_URI}`)

        console.log(`\n mongoDB connected! DB Host = ${connectionInstatnce.connection.host}`)
    } catch (error) {
        console.log("Mongodb connection error")
        process.exit(1)
    }
}

export default connectDB













// import mongoose from "mongoose"




// const connectDB = async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)

//         console.log(`mongodb connected.  mongo host:${connectionInstance.connection.host}`);

        
//     } catch (error) {
//         console.log("mongoDb connection error!", error);
//         process.exit(1)
        
//     }
// }

// export default connectDB