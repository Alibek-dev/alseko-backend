const {Router} = require('express')
const EmployeeService = require('../controllers/EmployeeService')

const catchErrors = require('../util')
const router = Router()


router.get('/api/server', (req, res) => {
    res.json({test: 42})
})

router.get('/api/employees', catchErrors(async (req, res, next) => {
   res.json(await EmployeeService.getListOfEmployees())
}))

module.exports = router
