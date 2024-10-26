const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors())

const customer = require("./controllers/customer")
app.use("/customer",customer)

const product = require("./controllers/product")
app.use("/product",product)

const order = require('./controllers/order')
app.use('/order',order)

const mycart = require('./controllers/mycart')
app.use('/mycart',mycart)

app.listen("3000")