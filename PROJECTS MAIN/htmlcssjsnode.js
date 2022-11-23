//main
const express = require('express');
const bodyparser= require('body-parser');
const app= express();

const path=require('path');


const adminroutes= require('../routes/admin.js');
const shoproutes= require('../routes/shop.js');
const contactusroutes= require('../routes/contactus.js');
const successroutes= require('../routes/success.js');
app.use(bodyparser.urlencoded());
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminroutes);
app.use(shoproutes);
app.use(contactusroutes);
app.use(successroutes);
app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});
app.listen(4000);

//js files
//adminjs
const express= require ('express');
const path=require('path');
const rootdir=require('../util/path')
const router= express.Router();

router.get('/add-product',(req, res, next)=>{
    res.sendFile(path.join(rootdir,"views","add-product.html"));
})
router.post('/add-product',(req,res,next)=>{
    //console.log(req.body);
    res.redirect('/');
})


module.exports=router;

//shopjs
const express= require('express');
const path=require('path');
const rootdir=require('../util/path')
const routes= express.Router();


routes.get('/',(req, res, next)=>{
    //console.log('in the another one  middlewear');
    res.sendFile(path.join(rootdir,'views','shop.html'));
    
})
module.exports= routes;

/*contactusjs
const express= require ('express');
const path=require('path');
const rootdir=require('../util/path')
const router= express.Router();

router.get('/contactus',(req, res, next)=>{
    res.sendFile(path.join(rootdir,"views","contactus.html"));
})
router.post('/contactus',(req,res,next)=>{
    //console.log(req.body);
    res.redirect('/success');
})


module.exports=router;

//successjs
const express= require('express');
const path=require('path');
const rootdir=require('../util/path')
const routes= express.Router();


routes.get('/success',(req, res, next)=>{
    //console.log('in the another one  middlewear');
    res.sendFile(path.join(rootdir,'views','success.html'));
    
})
module.exports= routes;

//html files
/*add product html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Product</title>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/product.css">
</head>
<body>
    <header class="main-header">
        <nav class="main-header__nav">
            <ul class="main-header__item-list">
                <li class="main-header__item"><a href="/">Shop</a></li>
                <li class="main-header__item"><a class="active" href="/admin/add-product">Add Product</a></li>
                <li class="main-header__item"><a class="active" href="/contactus">Contact Us</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <form class="product-form" action="/admin/add-product" method="POST">
            <div class="form-control">
                <label for="title">Title</label>
                <input type="text" name="title" id="title">
            </div>

            <button type="submit">Add Product</button>
        </form>
    </main>
</body>
</html>

shop.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Product</title>
    <link rel="stylesheet" href="/css/main.css">
    
</head>
<body>
    <header class="main-header">
        <nav class="main-header__nav">
            <ul class="main-header__item-list">
                <li class="main-header__item"><a class="active" href="/">Shop</a></li>
                <li class="main-header__item"><a href="/admin/add-product">Add Product</a></li>
                <li class="main-header__item"><a class="active" href="/contactus">Contact Us</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h1>My products</h1>
        <p>List of all the products...</p>
    </main>
</body>
</html>

404.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page not found</title>
    <link rel="stylesheet" href="/css/main.css">
</head>
<body>
    <header class="main-header">
        <nav class="main-header__nav">
            <ul class="main-header__item-list">
                <li class="main-header__item"><a class="active" href="/">Shop</a></li>
                <li class="main-header__item"><a href="/admin/add-product">Add Product</a></li>
                <li class="main-header__item"><a class="active" href="/contactus">Contact Us</a></li>
            </ul>
        </nav>
    </header>
    <h1>Page Not Found!</h1>
</body>
</html>

contactus.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Product</title>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/product.css">
</head>
<body>
    <header class="main-header">
        <nav class="main-header__nav">
            <ul class="main-header__item-list">
                <li class="main-header__item"><a href="/">Shop</a></li>
                <li class="main-header__item"><a class="active" href="/admin/add-product">Add Product</a></li>
                <li class="main-header__item"><a class="active" href="/contactus">Contact Us</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <form class="product-form" action="/contactus" method="POST">
            <div class="form-control">
                <label for="title">Name:</label>
                <input type="text" name="title" id="title">
                <label for="title">Email:</label>
                <input type="text" name="title" id="title">
            </div>

            <button type="submit">Submit</button>
        </form>
    </main>
</body>
</html>

success.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Product</title>
    <link rel="stylesheet" href="/css/main.css">
    
</head>
<body>
    <header class="main-header">
        <nav class="main-header__nav">
            <ul class="main-header__item-list">
                <li class="main-header__item"><a class="active" href="/">Shop</a></li>
                <li class="main-header__item"><a href="/admin/add-product">Add Product</a></li>
                <li class="main-header__item"><a class="active" href="/contactus">Contact Us</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h1>"Form successfuly filled."</h1>
        
    </main>
</body>
</html>

pathjs file 
const path= require("path");

module.exports=path.dirname(require.main.filename);

css files
main css

        body {
            padding: 0;
            margin: 0;
            font-family: sans-serif;
        }

        main {
            padding: 1rem;
        }

        .main-header {
            width: 100%;
            height: 3.5rem;
            background-color: #dbc441;
            padding: 0 1.5rem;
        }

        .main-header__nav {
            height: 100%;
            display: flex;
            align-items: center;
        }

        .main-header__item-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
        }

        .main-header__item {
            margin: 0 1rem;
            padding: 0;
        }

        .main-header__item a {
            text-decoration: none;
            color: black;
        }

        .main-header__item a:hover,
        .main-header__item a:active,
        .main-header__item a.active {
            color: #3e00a1;
        }
product css

.product-form {
    width: 20rem;
    max-width: 90%;
    margin: auto;
}

.form-control {
    margin: 1rem 0;
}

.form-control label,
.form-control input {
    display: block;
    width: 100%;
}

.form-control input {
    border: 1px solid #dbc441;
    font: inherit;
    border-radius: 2px;
}

button {
    font: inherit;
    border: 1px solid #3e00a1;
    color: #3e00a1;
    background: white;
    border-radius: 3px;
    cursor: pointer;
}

button:hover,
button:active {
    background-color: #3e00a1;
    color: white;
}*/
