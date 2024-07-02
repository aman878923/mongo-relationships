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
const orderSchema = new Schema({
  item: String,
  price: Number,
});
const customerSchema = new Schema({
    name: String,
    orders: {
        
    }
    
})
const Order = mongoose.model("Order", orderSchema);
const addOrder = async () => {
  let res = await Order.insertMany([
    { item: "samosa", price: 100 },
    { item: "pizza", price: 250 },
    { item: "burger", price: 200 },
    { item: "fries", price: 120 },
    { item: "pasta", price: 220 },
    { item: "sandwich", price: 180 },
    { item: "tacos", price: 150 },
    { item: "noodles", price: 230 },
    { item: "sushi", price: 300 },
    { item: "shawarma", price: 190 },
    { item: "spring roll", price: 130 },
    { item: "doughnut", price: 110 },
    { item: "cake", price: 200 },
    { item: "coffee", price: 80 },
    { item: "tea", price: 70 },
    { item: "juice", price: 90 },
    { item: "smoothie", price: 100 },
    { item: "milkshake", price: 120 },
    { item: "ice cream", price: 150 },
    { item: "candy", price: 60 },
  ]);
  console.log(res);
};

addOrder();
