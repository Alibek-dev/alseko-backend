const Employee = require('../models/Employee')
const Tangible = require('../models/Tangible')
const TangibleService = require('../controllers/TangibleService')
const ServiceError = require('../error')

const throwErrorIfEmployeeHasExist = async (firstName, secondName, patronymic) => {
    const isEmployeeExist = await Employee.findOne({
        where: {
            firstName, secondName, patronymic
        }})
    if (isEmployeeExist) {
        throw new ServiceError(409, "Пользователь с данным именем, фамилием и отчеством уже существует")
    }
}

const throwErrorIfEmployeeNotExistOrGetEmployee = async(employeeId) => {
    const employee = await Employee.findByPk(employeeId)

    if (!employee) {
        throw new ServiceError(404, "Пользователя не существует")
    }
    return employee
}

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
        console.log(employees)
        return employees
    },

    createEmployee: async (firstName, secondName, patronymic) => {
        await throwErrorIfEmployeeHasExist(firstName, secondName, patronymic)
        await Employee.create({
            firstName,
            secondName,
            patronymic
        })
    },

    updateEmployee: async (employeeId, firstName, secondName, patronymic) => {
        let employee = throwErrorIfEmployeeNotExistOrGetEmployee(employeeId)
        await throwErrorIfEmployeeHasExist(firstName, secondName, patronymic)

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
        await (await throwErrorIfEmployeeNotExistOrGetEmployee(employeeId)).destroy()
    }
}

module.exports = EmployeeService
