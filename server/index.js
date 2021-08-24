import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import categoryRouter from "./routes/category.js";
import productRouter from "./routes/product.js";
import dotenv from "dotenv";
import expressValidator from "express-validator";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);

const port = process.env.PORT || 8000;
const connectionSTR = process.env.CONNECTION_STR;

mongoose
  .connect(connectionSTR, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log(`connected on port : ${port}`));
  })
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
