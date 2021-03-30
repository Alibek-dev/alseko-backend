const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('alsekodb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

module.exports = sequelize
