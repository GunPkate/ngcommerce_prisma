const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

app.post("/selectproduct", async (req,res)=>{
    const product = await prisma.product.findFirst({

    })
    res.send(product)
})

module.exports = app