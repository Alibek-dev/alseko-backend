const Tangible = require('../models/Tangible')
const Exceptions = require('../controllers/Exceptions')

const getFullName = (employee) => {
    return `${employee.secondName} ${employee.firstName} ${employee.patronymic}`
}

const TangibleService = {
    getSubjects: async (employeeId) => {
        return (await Tangible.findAll({
            where: {employeeId}
        }))
    },

    getEmployeeCountOfSubjects: async(id) => {
        return (await Tangible.findAndCountAll({
            where: { employeeId: id }
        })).count
    },

    getSumTangiblesPrices: async(id) => {
        let tangibles = await Tangible.findAll({where: {employeeId: id}})
        let sum = 0
        for (let tangible of tangibles) {
            sum += tangible.price
        }
        return sum
    },

    getEmployeeTangibles: async(employeeId) => {
        let employee = await Exceptions.throwErrorIfEmployeeNotExistOrGetEmployee(employeeId)

        employee.setDataValue("fullName", await getFullName(employee))
        employee.setDataValue("countOfSubjects", await TangibleService.getEmployeeCountOfSubjects(employee.id))
        employee.setDataValue("sumOfTangiblesValue", await TangibleService.getSumTangiblesPrices(employee.id))
        employee.setDataValue("subjects", await TangibleService.getSubjects(employee.id))

        return employee
    },

    createEmployeeTangibles: async(req) => {
        await Exceptions.throwErrorIfEmployeeNotExistOrGetEmployee(req.body.id)

        await Tangible.destroy({where: {employeeId: req.body.id}})

        const tangibles = req.body.subjects
        for (let tangible of tangibles) {
            await Tangible.create({
                subject: tangible.subject,
                price: tangible.price,
                employeeId: req.body.id
            })
        }
    },

    deleteEmployeeTangibles: async(employeeId) => {
        await Tangible.destroy({where: {employeeId}})
    }
}

module.exports = TangibleService
