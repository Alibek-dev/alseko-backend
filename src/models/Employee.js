const db = require('../modules/connectionDB')
const { DataTypes } = require('sequelize')
const Tangible = require('./Tangible')

const Employee = db.define("employee", {
    firstName: DataTypes.STRING,
    secondName: DataTypes.STRING,
    patronymic: DataTypes.STRING
})

Employee.hasMany(Tangible, {
    onDelete: "cascade"
})

module.exports = Employee
