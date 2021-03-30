const db = require("../db"),
    { DataTypes } = require("sequelize")

module.exports = db.define("material_values", {
    name: DataTypes.string,
    price: DataTypes.float(9, 2)
})
