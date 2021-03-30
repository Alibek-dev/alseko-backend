const express = require('express')
const connectionDB = require('./src/modules/connectionDB')
const bodyParser = require("body-parser")
const serverRoutes = require('./src/routes/router')

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(bodyParser.json())
app.use(serverRoutes)

app.get('/', (req, res) => {
    res.send('Стартовая страница')
})

app.listen(PORT, async () => {
    await connectionDB.sync()
    console.log(`App listening at http://localhost:${PORT}`)
})
