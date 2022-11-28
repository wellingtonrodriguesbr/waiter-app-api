import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "node:path";
import { router } from "./Router";

const MONGODB_URI = process.env.MONGO_DB;

mongoose
  .connect(MONGODB_URI || "")
  .then(() => {
    const app = express();
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");

      next();
    });

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    app.use(express.json());
    app.use(router);
    app.listen(3333, () => console.log("Server is running!"));
  })
  .catch(() => console.log("erro ao conectar no mongodb"));
