const Employee = require('../models/Employee')
const Tangible = require('../models/Tangible')
const ServiceError = require('../error')

module.exports = {
    throwErrorIfEmployeeNotExistOrGetEmployee: async(employeeId) => {
        const employee = await Employee.findByPk(employeeId)

        if (!employee) {
            throw new ServiceError(404, "Пользователя не существует")
        }
        return employee
    },

    throwErrorIfEmployeeHasExist: async (firstName, secondName, patronymic) => {
        const isEmployeeExist = await Employee.findOne({
            where: {
                firstName, secondName, patronymic
            }})
        if (isEmployeeExist) {
            throw new ServiceError(409, "Данный пользователь уже существует")
        }
    },

}
