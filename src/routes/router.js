const {Router} = require('express')
const EmployeeService = require('../controllers/EmployeeService')
const TangibleService = require('../controllers/TangibleService')

const catchErrors = require('../util')
const router = Router()

router.get('/api/employees', catchErrors(async (req, res, next) => {
    res.json(await EmployeeService.getListOfEmployees())
}))

router.post('/api/employee', catchErrors(async (req, res, next) => {
    try {
        await EmployeeService.createEmployee(req.body.firstName, req.body.secondName, req.body.patronymic)
        let employee = await EmployeeService.getEmployeeByFullName(req.body.firstName, req.body.secondName, req.body.patronymic)
        res.status(200).json(employee)
    } catch (err) {
        res.status(err.statusCode).json(err.message)
    }

}))

router.put('/api/employee', catchErrors(async (req, res, next) => {
    try {
        await EmployeeService.updateEmployee(req.body.employeeId, req.body.firstName, req.body.secondName, req.body.patronymic)
        let employee = await EmployeeService.getEmployeeByFullName(req.body.firstName, req.body.secondName, req.body.patronymic)
        res.status(200).json(employee)
    } catch (err) {
        res.status(err.statusCode).json(err.message)
    }
}))

router.delete('/api/employee/:id', catchErrors(async (req, res, next) => {
    await EmployeeService.deleteEmployee(req.params.id)
    res.sendStatus(200)
}))


router.get('/api/employee/:id', catchErrors(async (req, res, next) => {
    try {
        res.status(200).json(await TangibleService.getEmployeeTangibles(req.params.id))
    } catch (err) {
        res.status(err.statusCode).json(err.message)
    }
}))

router.post('/api/employee/tangibles', catchErrors(async (req, res, next) => {
    try {
        await TangibleService.createEmployeeTangibles(req)
        res.sendStatus(200)
    } catch (err) {
        res.status(err.statusCode).json(err.message)
    }
}))

router.delete('/api/employee/:id/tangibles', catchErrors(async (req, res, next) => {
    await TangibleService.deleteEmployeeTangibles()
    res.sendStatus(200)
}))

module.exports = router
