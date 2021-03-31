const Employee = require('../models/Employee')
const TangibleService = require('../controllers/TangibleService')
const Exceptions = require('../controllers/Exceptions')

const getFullName = (employee) => {
    return `${employee.secondName} ${employee.firstName} ${employee.patronymic}`
}

const EmployeeService = {

    getListOfEmployees: async () => {
        let employees = await Employee.findAll()

        for (const employee of employees) {
            employee.setDataValue("fullName", getFullName(employee))
            employee.setDataValue("countOfSubjects", await TangibleService.getEmployeeCountOfSubjects(employee.id))
            employee.setDataValue("sumOfTangiblesValue", await TangibleService.getSumTangiblesPrices(employee.id))
        }

        return employees
    },

    createEmployee: async (firstName, secondName, patronymic) => {
        await Exceptions.throwErrorIfEmployeeHasExist(firstName, secondName, patronymic)
        await Employee.create({
            firstName,
            secondName,
            patronymic
        })
    },

    updateEmployee: async (employeeId, firstName, secondName, patronymic) => {
        let employee = this.throwErrorIfEmployeeNotExistOrGetEmployee(employeeId)
        await Exceptions.throwErrorIfEmployeeHasExist(firstName, secondName, patronymic)

        await Employee.update({
            firstName,
            secondName,
            patronymic
        }, {where: {
                id: employeeId
            }
        })
    },

    deleteEmployee: async (employeeId) => {
        await (await Exceptions.throwErrorIfEmployeeNotExistOrGetEmployee(employeeId)).destroy()
    }
}

module.exports = EmployeeService
