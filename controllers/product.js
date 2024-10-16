const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

app.post("/selectproduct", async (req,res)=>{
    try{

        const product = await prisma.product.findFirst({
            include: {
                variants: true,
                details: true,
                img_url: true,
                categories: true
            }
        })
        res.send(product)
    } catch (e) {
        res.send(e.message)
    }
})

module.exports = app