const Order= require("../models/orders")

const Razorpay = require('razorpay')

module.exports.purchasePremium = async (req,res)=>{
    try{
        var rzp = new Razorpay ({
            key_id: 'rzp_test_ovpdz2sxqE61Mv',
            key_secret: '5e64vIKuBpMjAeqDKa9Ouuxd'
        })
        const amount=1499;

        rzp.orders.create({ amount, currency:'INR'}, (err, order) =>{
            if(err){
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({ orderid: order.id, status:'PENDING'}).then(()=>{
                return res.status(201).json({ order, key_id: rzp.key_id});
            })
            .catch(err => console.log(err))
        })
    }
    catch(err){
        console.log(err)
        res.status(403).json({message:'something error'})
    }
}