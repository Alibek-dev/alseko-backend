const Employee = require('../models/Employee')
const Tangible = require('../models/Tangible')
const TangibleService = require('../controllers/TangibleService')

getFullName = (employee) => {
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
    }
}

module.exports = EmployeeService
