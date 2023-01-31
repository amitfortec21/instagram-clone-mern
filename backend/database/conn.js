import { mongoose } from "mongoose";
const uri = "mongodb://127.0.0.1:27017/instagram-clone";

mongoose.set("strictQuery", false);

export default async function connect() {
    await mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
      console.log(`Database Connected`);
    })
    .catch(() => {
      console.log(`Database Error: No Connection`);
    });
}