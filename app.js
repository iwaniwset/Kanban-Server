require ("dotenv").config()
const express = require('express')
const app = express()
const port = 3000
const router = require ('./routes/index')
const errhandler = require ('./middleware/errHandler')


app.use(express.urlencoded({
    extended:false
}))
app.use(express.json())

app.use('/', router)
app.use(errhandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})