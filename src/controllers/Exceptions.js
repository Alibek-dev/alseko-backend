const Employee = require('../models/Employee')
const Tangible = require('../models/Tangible')
const ServiceError = require('../error')

module.exports = {
    throwErrorIfEmployeeNotExistOrGetEmployee: async(employeeId) => {
        const employee = await Employee.findByPk(employeeId)

        if (!employee) {
            throw new ServiceError(404, "Сотрудник не существует")
        }
        return employee
    },

    throwErrorIfEmployeeHasExist: async (firstName, secondName, patronymic) => {
        const isEmployeeExist = await Employee.findOne({
            where: {
                firstName, secondName, patronymic
            }})
        if (isEmployeeExist) {
            throw new ServiceError(409, "Данный сотрудник уже существует")
        }
    },

    throwErrorIfEmployeeHasExistAndNotThis: async (firstName, secondName, patronymic, employeeId) => {
        const isEmployeeExist = await Employee.findOne({
            where: {
                firstName, secondName, patronymic
            }})
        console.log(isEmployeeExist)
        if (isEmployeeExist && (isEmployeeExist.id !== employeeId)) {
            throw new ServiceError(409, "Данный сотрудник уже существует")
        }
    },

}
