import { TodoItems } from "../models/models.js";
import { commonMessages } from "../consts.js";

class TodoItemController {
  async getAll(req, res) {
    try {
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
          "isEdited",
          "userEmail",
          "userName",
          "userRole",
        ],
      });
      const count = await TodoItems.count();
      return res.json({ todos, count });
    } catch (e) {
      console.log(e);
    }
  }

  async create(req, res) {
    try {
      const { userEmail } = req.body;

      const user = await TodoItems.findOne({ where: { userEmail } });
      if (user) {
        return res.status(401).json({ message: commonMessages.duplicateUser });
      }
      const item = await TodoItems.create({
        ...req.body,
      });
      return res.json(item);
    } catch (e) {
      console.log(e);
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.body;
      const item = await TodoItems.update(req.body, { where: { id } });
      return res.json(item);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new TodoItemController();
