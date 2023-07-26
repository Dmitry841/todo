import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TodoItems } from "../models/models.js";

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async login(req, res, next) {
    console.log("dfdfsdfsdfsdfdsf");
    const { userName, password } = req.body;
    const a = await bcrypt.hash("123", 5);
    console.log(a);
    const user = await TodoItems.findOne({ where: { userName } });
    if (!user) {
      return next(new Error("Пользователь не найден"));
    }

    let comparePassword = bcrypt.compareSync(password, user.userPassword);
    if (!comparePassword) {
      return next(new Error("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
}

export default new UserController();
