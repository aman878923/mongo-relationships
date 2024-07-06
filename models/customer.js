const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//one to many relation
const orderSchema = new Schema({
  item: String,
  price: Number,
});
const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order", //from where it is coming
    },
  ],
});
// customerSchema.pre("findOneAndDelete", async () => {
//   console.log("pre middleware");
// });
customerSchema.post("findOneAndDelete", async (delData) => {
  console.log("post middleware");
  console.log(delData);
  if (delData.orders.length) {
    let res = await Order.deleteMany({ _id: { $in: delData.orders } });
    console.log(res);
  }
});
const Customer = mongoose.model("Customer", customerSchema);
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
    { item: "te3000a", price: 70 },
    { item: "juice", price: 90 },
    { item: "smoothie", price: 100 },
    { item: "milkshake", price: 120 },
    { item: "ice cream", price: 150 },
    { item: "candy", price: 60 },
  ]);
};

// addOrder();
const addCustomer = async () => {
  //create an customer object
  let cust1 = new Customer({
    name: "rahul",
  });
  //push orders data into the object
  let order1 = await Order.findOne({ item: "ice cream" });

  let order2 = await Order.findOne({ item: "samosa" });
  cust1.orders.push(order1);
  cust1.orders.push(order2);

  let res = await cust1.save();
  // console.log(res);
};
// addCustomer();
const findCustomer = async () => {
  let customer = await Customer.find({}).populate("orders"); //to get detailed object
  console.log(customer);
};
// findCustomer();
const addCust = async () => {
  let newCust = new Customer({
    name: "arn",
  });
  let newOrder = new Order({
    item: "coke",
    price: 200,
  });
  newCust.orders.push(newOrder);
  let res = await newOrder.save();
  console.log(res);
  await newCust.save();
  console.log("added");
};
// addCust();

const delCust = async () => {
  let data = await Customer.findByIdAndDelete('6688214275bb86b938a33321');
  console.log(data);
};
delCust();

/* In Mongoose, you can use middleware functions to perform actions before or after certain operations on a document or a collection. Middleware functions are particularly useful for handling deletion operations and performing additional tasks or validations before or after the deletion. */
