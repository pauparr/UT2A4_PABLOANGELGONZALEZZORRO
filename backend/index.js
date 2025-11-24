const express = require('express')
const cors = require('cors')
const login = require('./services/login')
const items = require('./services/items')

const port = 3030

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())

app.get('/', function (req, res) {
    res.json({ message: 'Hola Mundo!' })
})

app.get('/login', async function (req, res, next) {
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})

app.get('/addItem', async function (req, res, next) {
    try {
        res.json(await items.insertData(req))
    } catch (err) {
        console.error(`Error while inserting items `, err.message);
        next(err);
    }
})

app.get('/getItems', async function (req, res, next) {
    try {
        res.json(await items.getData())
    } catch (err) {
        console.error(`Error while getting items `, err.message);
        next(err);
    }
})

app.get('/deleteItem', async function (req, res, next) {
    try {
        res.json(await items.deleteData(req))
    } catch (err) {
        console.error(`Error while deleting items `, err.message);
        next(err);
    }
})

app.listen(port)
console.log('API escuchando en el puerto ' + port)
