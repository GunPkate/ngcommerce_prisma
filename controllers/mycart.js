const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.post('/cartdetails',async (req,res) =>{
    try {
        let {priductId, variantsId } = req.body
        let cart = await prisma.product.findMany({
            where: { id: priductId },
            include: { img_url : { where: {img_code: "1"} }, variants: true}
        })
        res.send(cart)
    } catch (e) {
        res.send(e.message)
    }
})

module.exports = app