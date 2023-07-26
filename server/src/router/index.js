import Router from "express";
import userRouter from "./userRouter.js";
import todoItemRouter from "./todoItemRouter.js";

const router = new Router();

router.use("/user", userRouter);
router.use("/todo", todoItemRouter);
export default router;
