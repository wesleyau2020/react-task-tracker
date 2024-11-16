const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "books",
    timestamps: false,
  }
);

module.exports = Book;
