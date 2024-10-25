const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

app.post("/product", async (req,res)=>{
    try{
        // console.log(req.body)
        const id = req.body.id
        const product = await prisma.product.findFirst({
            where: { id: id},
            skip: 0,
            take: 1,
            include: {
                // where: {id: id},
                product_detail: true,
                img_url: {where: {}},
                variants: {}
            }
        })
        res.send(product)
    } catch (e) {
        res.send(e.message)
    }
})

app.post("/createcart", async (req, res) =>{
    try {
        console.log(req.body)
        const { id, customerId, itemId} = req.body
        const cat = await prisma.cart.create({
            // data: { item_id: id, customer_id: customerId, item_id: null }
            data: {
                id: id,
                customer_id: customerId,
                item_id: itemId
            }
        })
        res.send(cat)
    } catch (e) {
        res.send(e.message)
    }
})

app.get("/cart", async (req, res) =>{
    try {
        const { customerId, date} = req.body
        const cart = await prisma.cart.findFirst({ where: { customer_id: customerId  } })
        res.send(cart)
    } catch (e) {
        res.send(e.message)
    }
})

app.post("/cartitem", async (req, res) =>{
    try {
        const items = req.body
        const cat = await prisma.cartItem.createMany({
            data: items,
            skipDuplicates: true,
        })
        res.status(200).json({
            statuscode:200, 
            cartId: items.map(x=>x.id), 
        })
    } catch (e) {
        res.status(500).json({
            statuscode:500, 
            error :e.message, 
        })
    }
})

app.get("/cartitem/:id", async (req, res) =>{
    try {
        let id = req.params.id

        const cat = await prisma.cartItem.findMany({
            where: { cart_id: id }
        })
        console.log(cat)
        res.send(cat)
    } catch (e) {
        res.send(e.message)
    }
})

app.post("/deletecartitem", async (req, res) =>{
    try {
        const items = req.body
        let id = [...new Set(items.map(x=>x.cart_id))]
        let productCode = [...new Set(items.map(x=>x.product_code))]

        const cat = await prisma.cartItem.findMany({ where: { cart_id: id[0], product_code: productCode[0] } })

        if(cat.length > 0){
            let a = await prisma.cartItem.deleteMany({ where: { cart_id: id[0], product_code: productCode[0] } })
            console.log(a)
        }
        console.log(cat.length)
        res.status(200).json({
            statuscode:200, 
            cartId: items.map(x=>x.id), 
        })
    } catch (e) {
        res.status(500).json({
            statuscode:500, 
            error :e.message, 
        })
    }
})

module.exports = app