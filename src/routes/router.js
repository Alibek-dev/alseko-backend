const {Router} = require('express')
const EmployeeService = require('../controllers/EmployeeService')
const TangibleService = require('../controllers/TangibleService')

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


router.get('/api/employee/:id/tangibles', catchErrors(async(req, res, next) => {
    res.json (await TangibleService.getEmployeeTangibles(req.params.id))

}))

router.post('/api/employee/tangibles', catchErrors(async(req, res, next) => {
    await TangibleService.createEmployeeTangibles(req)
    res.sendStatus(200)
}))

router.delete('/api/employee/:id/tangibles', catchErrors(async(req, res, next) => {
    await TangibleService.deleteEmployeeTangibles()
    res.sendStatus(200)
}))

module.exports = router
