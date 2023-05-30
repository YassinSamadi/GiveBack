import express from "express";
import productRoutes from "./routes/products.js";
import needRoutes from "./routes/needs.js";
import donationRoutes from "./routes/donations.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/needs", needRoutes);
app.use("/api/donations", donationRoutes);


app.listen(8800, () => {
    console.log("Connected!");
});
