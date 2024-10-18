const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

app.post("/product", async (req,res)=>{
    try{

        const product = await prisma.product.findMany({
            skip: 0,
            take: 1,
            include: {
                product_detail: true,
                img_url: {where: {}},
                // category: true
            }
        })
        res.send(product)
    } catch (e) {
        res.send(e.message)
    }
})

// app.get("/allCategory", async (req, res) =>{
//     try {
//         const cat = await prisma.category.findMany({
//         })
//         res.send(cat)
//     } catch (e) {
//         res.send(e.message)
//     }
// })

module.exports = app