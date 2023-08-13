import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://jesusfb:Dove3229-@cluster0.yx9sjqo.mongodb.net/mern");
    console.log(`MongoDB Connected to ${conn.connection.host} ,biatch!`);
  } catch (error) {
    console.log(`${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
