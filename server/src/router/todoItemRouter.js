import Router from "express";
import TodoItemController from "../controllers/todoItemController.js";

const router = new Router();

router.post("/create", TodoItemController.create);
router.get("/", TodoItemController.getAll);
router.post("/update", TodoItemController.update);

export default router;
