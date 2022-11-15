import path from "node:path";
import { Router } from "express";

import { createCategory } from "./app/useCases/categories/createCategory";
import { listCategories } from "./app/useCases/categories/listCategories";
import { updateCategory } from "./app/useCases/categories/updateCategory";
import { createProduct } from "./app/useCases/products/createProduct";
import { listProducts } from "./app/useCases/products/listProducts";

import multer from "multer";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

router.get("/categories", listCategories);

router.post("/categories", createCategory);

router.patch("/categories/:categoryId", updateCategory);

router.get("/products", listProducts);

router.post("/products", upload.single("image"), createProduct);

router.get("/products/:categoryId/products", (req, res) => {
  res.send("OK");
});

router.get("/orders", (req, res) => {
  res.send("OK");
});

router.post("/orders", (req, res) => {
  res.send("OK");
});

router.patch("/orders/:orderId", (req, res) => {
  res.send("OK");
});

router.delete("/orders/:orderId", (req, res) => {
  res.send("OK");
});
