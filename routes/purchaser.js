const express = require('express')
const purchaseController = require('../controllers/purchasec');
const userauthentication=require('../middlewares/auth')

const router = express.Router();


router.get('/premiummembership', userauthentication.Authenticate ,purchaseController.purchasePremium)

module.exports=router;
