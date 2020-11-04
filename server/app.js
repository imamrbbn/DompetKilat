require('dotenv').config()

const express = require(`express`)
const routes = require(`./routes`)
const app = express()
const port = process.env.PORT || 3000
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app