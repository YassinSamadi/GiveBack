import express from "express";
import productRoutes from "./routes/products.js";
import needRoutes from "./routes/needs.js";
import donationRoutes from "./routes/donations.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import authOrganizations from "./routes/authOrganizations.js"
import addressRoutes from "./routes/addresses.js"
import organizationRoutes from "./routes/organizations.js"
import inventoryRoutes from "./routes/inventory.js"
import logoRoutes from './routes/uploads.js'; 
import profilepicRoutes from './routes/uploadsProfile.js';
import transactionRoutes from './routes/transaction.js'
const app = express();


app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/needs", needRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/authorganizations", authOrganizations);
app.use("/api/address", addressRoutes);
app.use("/api/organization", organizationRoutes);
app.use('/api/upload/profilepic', profilepicRoutes);
app.use('/api/upload/logo', logoRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/transaction", transactionRoutes);
app.listen(8800, () => {
});
