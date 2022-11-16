import path from "node:path";
import { Router } from "express";

import { createCategory } from "./app/useCases/categories/createCategory";
import { listCategories } from "./app/useCases/categories/listCategories";
import { updateCategory } from "./app/useCases/categories/updateCategory";
import { createProduct } from "./app/useCases/products/createProduct";
import { listProducts } from "./app/useCases/products/listProducts";

import multer from "multer";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory";
import { listOrders } from "./app/useCases/orders/listOrders";
import { createOrder } from "./app/useCases/orders/createOrder";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { deleteOrder } from "./app/useCases/orders/deleteOrder";

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

router.get("/categories/:categoryId/products", listProductsByCategory);

router.get("/orders", listOrders);

router.post("/orders", createOrder);

router.patch("/orders/:orderId", changeOrderStatus);

router.delete("/orders/:orderId", deleteOrder);
