const Employee = require('../models/Employee')
const Tangible = require('../models/Tangible')

const EmployeeService = {
    getAllInformation: async () => {
        let employees = await Employee.findAll()

        console.log(employees)
        return employees
    }
}

module.exports = EmployeeService
