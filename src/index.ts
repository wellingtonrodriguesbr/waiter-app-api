import "dotenv/config";
import path from "node:path";
import http from "node:http";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { router } from "./Router";

const MONGODB_URI = process.env.MONGO_DB;
const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose
  .connect(MONGODB_URI || "")
  .then(() => {
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

    server.listen(3333, () => console.log("Server is running!"));
  })
  .catch((err) => console.log(err));
