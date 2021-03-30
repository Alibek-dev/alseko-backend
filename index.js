import express from 'express'

const PORT = process.env.PORT ?? 3000
const app = express()

app.listen(PORT, async () => {
    /*await connectionDB.sync()*/
    console.log(`App listening at http://localhost:${PORT}`)
})
