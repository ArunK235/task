/*app.js

const express = require('express');
const bodyparser= require('body-parser');

const app= express();
const path=require('path');
const adminroutes= require('./routes/admin.js');
const shoproutes= require('./routes/shop.js');
const contactusroutes= require('./routes/contactus.js');
const successroutes= require('./routes/success.js');

const errorController=require('./controllers/error.js');


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyparser.urlencoded());
app.use(express.static(path.join(__dirname,'public')));



app.use('/admin',adminroutes);
//app.use('/admin', adminData.routes);
app.use(shoproutes);
app.use(contactusroutes);
app.use(successroutes);


app.use(errorController.get404);
app.listen(4000);

controllerfiles

product.js
const products=[];
const path=require('path');
const rootdir=require('../util/path');
exports.getAddProduct=(req, res, next)=>{
  res.sendFile(path.join(rootdir,"views","add-product.html"));
}

exports.postAddProdut=(req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
};

exports.getProducts=(req, res, next)=>{
  
  res.sendFile(path.join(rootdir,'views','shop.html'));
  
}
error.js
exports.get404=(req,res,next)=>{
    res.status(404).render('404', { pageTitle: 'Page Not Found' , path: 'Error'});
}

contactus.js
const path=require('path');
const rootdir=require('../util/path');

exports.getContactus=(req, res, next)=>{
    res.sendFile(path.join(rootdir,"views","contactus.html"));
};

exports.postContactus=(req,res,next)=>{
    //console.log(req.body);
    res.redirect('/success');
};

exports.getSuccess=(req, res, next)=>{
    
    res.sendFile(path.join(rootdir,'views','success.html'));
    
};

routes files

admin.js
const express= require ('express');
const path=require('path');

const productController=require('../controllers/products');
const router= express.Router();

/*router.get('/add-product',(req, res, next)=>{
    res.sendFile(path.join(rootdir,"views","add-product.html"));
})
router.post('/add-product',(req,res,next)=>{
    //console.log(req.body);
    res.redirect('/');
})


module.exports=router;



// /admin/add-product => GET
router.get('/add-product',productController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product',productController.postAddProdut);

module.exports=router;

shop.js
const express= require('express');
const path=require('path');

const routes= express.Router();


/*routes.get('/',(req, res, next)=>{
    //console.log('in the another one  middlewear');
    res.sendFile(path.join(rootdir,'views','shop.html'));
    
})
module.exports= routes;

const router = express.Router();
const productController=require('../controllers/products');

router.get('/',productController.getProducts );

module.exports = router;

contactus.js
const express= require ('express');

const contact=require('../controllers/contactus')
const router= express.Router();

router.get('/contactus', contact.getContactus);
router.post('/contactus',contact.postContactus);


module.exports=router;

success.js
const express= require('express');
const successController=require('../controllers/contactus')
const router= express.Router();


router.get('/success',successController.getSuccess);

module.exports= router;*/
