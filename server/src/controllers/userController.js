import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TodoItems } from "../models/models.js";
import { commonMessages } from "../consts.js";
const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async login(req, res, next) {
    try {
      const { userName, password } = req.body;
      const a = await bcrypt.hash("123", 5);
      const user = await TodoItems.findOne({ where: { userName } });
      if (!user) {
        return res.status(401).json({ message: commonMessages.userNotFound });
      }

      let comparePassword = bcrypt.compareSync(password, user.userPassword);
      if (!comparePassword) {
        return res
          .status(401)
          .json({ message: commonMessages.passwordIncorrect });
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();
