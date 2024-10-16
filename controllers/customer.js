const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;


app.get('/customerlist',async (req,res)=>{
    const customer = await prisma.customer.findMany()
    res.send(customer)
})

module.exports = app