const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// Routes imports using require
const chatbotRoute = require("./routes/chatbot");
const stripeRoute = require("./routes/stripe");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const companyRoute = require("./routes/company");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection successful!"))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

// Use the chatbot routes
app.use("/api/chatbot", chatbotRoute);

// Other API routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/companies", companyRoute);

app.listen(process.env.PORT || 4000, () => {
    console.log("Backend server is running!");
});
