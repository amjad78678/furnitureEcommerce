const express = require('express');
const userRouter = express();
const path = require('path');
const userController = require('../controllers/userController');
const cartController=require('../controllers/cartController');
const bodyParser = require('body-parser');
const auth=require('../middleware/auth')
const session= require('express-session')


userRouter.use(session({
  secret: 'your-secret-keyamjadali', 
  resave: false,
  saveUninitialized: true,
}));

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true}));

userRouter.set('view engine', 'ejs');
userRouter.set('views', path.join(__dirname, '..', 'views', 'users'));

userRouter.use(express.static(path.join(__dirname, '..', 'public')));
userRouter.use(express.static(path.join(__dirname, '..', 'public', 'styles')));

userRouter.use(
  express.static(path.join(__dirname, '..', 'public', 'assetsAdmin','imgs','products')),
);

userRouter.get('/',auth.isLogout, userController.loadHome);
userRouter.get('/home',auth.isLogin, userController.loadHome);
userRouter.get('/userRegister',auth.isLogout, userController.loadRegister);
userRouter.post('/userRegister', userController.postRegister);
userRouter.get('/userSignIn',auth.isLogout, userController.loadLogin);
userRouter.post('/userSignIn',userController.verifyLogin)
userRouter.get('/authentication', auth.isLogout,userController.loadOtp);
userRouter.post('/authentication',userController.verifyOtp);
userRouter.get('/userLogout',auth.isLogin,userController.userLogout);
userRouter.get('/loginWithOtp',auth.isLogout,userController.loginWithOtp)
userRouter.post('/loginWithOtp',userController.verifyLoginWithOtp)
userRouter.get('/productList',auth.isLogin,userController.loadProductList)
userRouter.get('/productListN',auth.isLogout,userController.loadProductList)
userRouter.get('/emailVerifyAfter',auth.isLogout,userController.loadEmailVerifyAfter)
userRouter.post('/emailVerifyAfter',userController.postEmailVerifyAfter)
userRouter.get('/productDetail',userController.loadProductDetail)
userRouter.get('/checkout',userController.loadCheckout)
userRouter.get('/addNewAddress',userController.loadAddNewAddress)
userRouter.post('/addToCart',cartController.postAddToCart)
userRouter.get('/cart',cartController.loadCart)
userRouter.post('/deleteItems',cartController.postDeleteItems)
userRouter.post('/changeQuantity',cartController.postChangeQuantity)




module.exports = userRouter;