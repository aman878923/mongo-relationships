const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//one to squillions relation
//define models
const userSchema = new Schema({
  username: String,
  email: String,
});
const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {//reference
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
// add data to models

const addData = async () => {
//   let user1 = new User({
//     username: "rahulkumar",
//     email: "your.email@example.com",
    //   });
    let user1=await User.findOne({username:"rahulkumar"})
  let post2 = new Post({
    content: "hello hi",
    likes: 10,
  });
    post2.user = user1;
    //await user1.save();
    let res = await post2.save();
    console.log(res);

};//use .populate("nameobj","field") to see detailed object
addData();//read 6 rule of thumbs in mongo db
