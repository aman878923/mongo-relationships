const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//one to few relation
const userSchema = new Schema({
  username: String,
  addresses: [
    {
      location: String,
      city: String,
    },
  ],
});
const User = mongoose.model("user", userSchema);
addUsers = async () => {
  let user1 = new User({
    username: "sherlock",
    addresses: [
      {
        location: "58351 Marques Plain",
        city: "Lake Jordi",
      },
    ],
  });
  user1.addresses.push({
    location: "305 Turcotte Gardens",
    city: "Reichertborough",
  });
  let result = await user1.save();
  console.log(result);
};
addUsers();
