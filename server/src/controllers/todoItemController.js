import { TodoItems } from "../models/models.js";

class TodoItemController {
  async getAll(req, res, next) {
    let { page, limit, sortDirection, sortField } = req.query;

    page = page || 1;
    limit = limit || 3;
    sortDirection = sortDirection || "ASC";
    sortField = sortField || "userName";
    const offset = page * limit - limit;
    const todos = await TodoItems.findAll({
      limit,
      offset,
      order: [[sortField, sortDirection]],
      attributes: [
        "id",
        "todoDescription",
        "isChecked",
        "userEmail",
        "userName",
        "userRole",
      ],
    });
    const count = await TodoItems.count();
    return res.json({ todos, count });
  }

  async create(req, res, next) {
    const { userEmail } = req.body;

    const user = await TodoItems.findOne({ where: { userEmail } });
    if (user) {
      return res
        .status(401)
        .json({ message: "Пользователь с таким email уже существует" });
    }
    const item = await TodoItems.create({
      ...req.body,
    });
    return res.json(item);
  }
  async update(req, res, next) {
    const { id } = req.body;
    const item = await TodoItems.update(req.body, { where: { id } });
    return res.json(item);
  }
}

export default new TodoItemController();
