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

app.post("/cartdetails/:id", async (req, res) =>{
    try {
        let id = req.params.id
        let id2
        
        const result = await prisma.$queryRawUnsafe(
            `select  p."name", pd.product_code, pd.price, pd.promotion_price  , pv.color , pv.color_code , pv."size" , cart.qty, pi.img_url  
			from "cartItem" cart 
			left join product p on p.id = cart.product_code 
			left join product_detail pd on pd.product_code =p.id 
            left join product_variant pv on pv.skucode  = cart.skucode 
            left join product_img pi on pi.product_code = cart.product_code  
            where cart.cart_id = '${id}'and pi.img_code = '1'
            ;`
        )

    res.send(result)
    } catch (e) {
        res.send(e.message)
    }
})

module.exports = app