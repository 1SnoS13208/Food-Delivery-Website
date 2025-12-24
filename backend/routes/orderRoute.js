import express from "express"
import { listOrder, placeOrder, updateStatus, userOrders, verifyOrder, markAsRead } from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",listOrder);
orderRouter.post("/status",updateStatus);
orderRouter.post("/mark-read", markAsRead);

export default orderRouter;