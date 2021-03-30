const db = require('../db')
const { DataTypes } = require('sequelize')
const Tangible = require('./Tangible')

const Employee = db.define("employee", {
    firstName: DataTypes.string,
    lastName: DataTypes.string,
    patronymic: DataTypes.string
})

Employee.hasMany(Tangible, {
    onDelete: "cascade"
})

module.exports = Employee
