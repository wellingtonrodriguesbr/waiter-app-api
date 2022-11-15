import express from "express";
import mongoose from "mongoose";
import { router } from "./Router";

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(router);
    app.listen(3333, () => console.log("Server is running!"));
  })
  .catch(() => console.log("erro ao conectar no mongodb"));
