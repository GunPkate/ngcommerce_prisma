const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

app.post("/selectProduct", async (req,res)=>{
    try{
        let count = await prisma.product.count()
        let item = 6
        if(req.body.page == ''){
            item = 3
        }
        let skip = Math.floor(Math.random()*count) 
        if(skip > count - item ){ skip = 0}

        const product = await prisma.product.findMany({
            skip: skip,
            take: item,
            include: {
                // variants: true,
                // details: true,
                img_url: {where: {img_code: '1'}},
                // category: true
            }
        })
        res.send(product)
    } catch (e) {
        res.send(e.message)
    }
})

app.get("/allCategory", async (req, res) =>{
    try {
        const cat = await prisma.category.findMany({
        })
        res.send(cat)
    } catch (e) {
        res.send(e.message)
    }
})

module.exports = app