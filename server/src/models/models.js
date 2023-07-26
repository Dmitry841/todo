import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../../db.js";

// export const User = sequelize.define("user", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   userName: {
//     type: DataTypes.STRING,
//   },
//   userEmail: {
//     type: DataTypes.STRING,
//     unique: true,
//   },
//   role: {
//     type: DataTypes.STRING,
//   },
// });

export const TodoItems = sequelize.define("todoItems", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userName: {
    type: DataTypes.STRING,
  },
  userEmail: {
    type: DataTypes.STRING,
    unique: true,
  },
  userRole: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
  userPassword: {
    type: DataTypes.STRING,
  },
  todoDescription: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  isChecked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// User.hasMany(TodoItem);
// TodoItem.belongsTo(User);
