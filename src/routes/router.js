const {Router} = require('express')
const EmployeeService = require('../controllers/EmployeeService')

const catchErrors = require('../util')
const router = Router()

router.get('/api/employees', catchErrors(async (req, res, next) => {
   res.json(await EmployeeService.getListOfEmployees())
}))

router.post('/api/employee', catchErrors(async (req, res, next) => {
    await EmployeeService.createEmployee(req.body.firstName, req.body.secondName, req.body.patronymic)
    res.sendStatus(200)
}))

router.put('/api/employee', catchErrors(async(req, res, next) => {
    await EmployeeService.updateEmployee(req.body.employeeId, req.body.firstName, req.body.secondName, req.body.patronymic)
    res.sendStatus(200)
}))

router.delete('/api/employee/:id', catchErrors(async(req, res, next) => {
    await EmployeeService.deleteEmployee(req.params.id)
    res.sendStatus(200)
}))

module.exports = router
