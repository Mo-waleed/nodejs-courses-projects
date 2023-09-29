import mongoose from "mongoose";

// main().catch((err) => console.log(err));

// async function main() {
//   const username = encodeURIComponent("waleedJsDev");
//   const password = encodeURIComponent("nodejs-2002");
//   await mongoose.connect(
//     `mongodb+srv://${username}:${password}@learn-mongodb.hf6tdho.mongodb.net/codeZone?retryWrites=true`
//   );

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

 const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Course = mongoose.model("course", courseSchema);
