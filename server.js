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

app.listen("3000")