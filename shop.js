const Product = require('../models/product');
const Cart = require('../models/cart');
const ItemsPerPage=1;

exports.getProducts = (req, res, next) => {
  const page= +req.query.page ||1;
  let totalitems;
  Product.findAll({
    offset:(page-1)*ItemsPerPage,
    limit:(ItemsPerPage),
  })  
  
  
  .then(products => {
    res.json({
      products: products,
      currentpage:page,
      hasNextPage: ItemsPerPage*page<totalitems,
      hasPreviousPage: page>1,
      nextPage:page+1,
      previousPage:page-1,
      lastPage:Math.ceil(totalitems / ItemsPerPage)
    });
      
    //res.json({products, success : true});
      /*res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });*/
    
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then(cart =>{
    return cart
    .getProducts()
    .then(products =>{
      res.status(200).json({success:true, products:products});
      /*res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });*/
    })
    .catch(err => res.status(500).json({success:false, message:err}))
  })
  .catch(err => res.status(500).json({success:false, message:err}))
 /*Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });*/
};

exports.postCart = (req, res, next) => {
  if(req.body.profuctId){
    return res.status(400).json({success:false, message:"product was not added"})
  }
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.status(200).json({success:true, message:"Succesfully added"});
    })
    .catch((err) =>{
      res.status(500).json({success:false, message:"Error occured"});
    });
};


exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
  .getCart()
  .then(cart => {
    return cart.getProducts({ where: { id: prodId } });
  })
  .then(products =>{
    const product = products[0];
    return product.cartItem.destroy();

  })
  .then(result =>{
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
