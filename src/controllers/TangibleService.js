const Employee = require('../models/Employee')
const Tangible = require('../models/Tangible')

const TangibleService = {
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
    }
}

module.exports = TangibleService
