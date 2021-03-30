const db = require("../modules/connectionDB"),
    { DataTypes } = require("sequelize")

module.exports = db.define("Tangibles", {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT(9, 2)

})
