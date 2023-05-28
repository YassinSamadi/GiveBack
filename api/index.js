import express  from "express";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)


app.listen(8800, () => {
    console.log("Connected!");
});