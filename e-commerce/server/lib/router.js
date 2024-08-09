const express = require('express');
const passport = require('passport');

const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

const ProductModel = require('../models/product');
const ProductModelInstance = new ProductModel();

const CartModel = require('../models/cart');
const CartItemModel = require('../models/cartItem');
const OrderModel = require('../models/order');
const OrderItemModel = require('../models/orderItem');

let _ = express.Router();

//auth routes
_.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        let msg = false;
        msg = UserModelInstance.setFirstName(firstName);
        if (msg) return res.status(400).json({
            error: {
                code: 400,
                type: 'first name',
                message: msg
            }
        });
        msg = UserModelInstance.setLastName(lastName);
        if (msg) return res.status(400).json({
            error: {
                code: 400,
                type: 'last name',
                message: msg
            }
        });
        msg = UserModelInstance.setEmail(email);
        if (msg) return res.status(400).json({
            error: {
                code: 400,
                type: 'email',
                message: msg
            }
        });
        msg = await UserModelInstance.setPassword(password);
        if (msg) return res.status(400).json({
            error: {
                code: 400,
                type: 'password',
                message: msg
            }
        });
        UserModelInstance.create();
        res.status(200).json(UserModelInstance);
    } catch (error) {
        throw new Error(error)
    }
})

_.post('/login', passport.authenticate('local'), async (req, res) => {
    try {
        const { email } = req.body
        const response = await UserModelInstance.findOneByEmail(email);
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
    }
});

_.get('/google', passport.authenticate('google', { scope: ["profile"] } ));

_.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
      res.redirect('http://localhost:3000');
    }
  );

_.get('/facebook', passport.authenticate('facebook'));

_.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    async (req, res) => {
        res.redirect('http://localhost:3000');
    }
  );


_.post('/logout', async (req, res) => {
    if (!req.user) return res.sendStatus(401);
    req.logOut((err) => {
        if (err) return res.sendStatus(400);
        res.sendStatus(200);
    });

});

//user routes
_.get('/user', async (req, res) => {
    try {
        if (!req.user) return;
        const { id } = req.user;
        const user = await UserModelInstance.findOneById(id);
        if (!user) throw new Error(404, 'User not found');
        console.log(user)
        res.status(200).send(user);
    } catch (error) {
        throw new Error(error)
    }
});

_.get('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModelInstance.findOneById(userId);
        if (!user) throw new Error(404, 'User not found');
        res.status(200).json(user);
    } catch (error) {
        throw new Error(error)
    }
});

_.put('/user', async (req, res) => {
    try {
        if (!req.user) return;
        const { id } = req.user;
        const { firstName, lastName, email, password } = req.body;
        let msg = false;
        msg = await UserModelInstance.setFirstName(firstName);
        if (msg) return res.status(400).json({
            error: {
                code: 400,
                type: 'first name',
                message: msg
            }
        });
        msg = await UserModelInstance.setLastName(lastName);
        if (msg) return res.status(400).json({
            error: {
                code: 400,
                type: 'last name',
                message: msg
            }
        });
        msg = await UserModelInstance.setEmail(email);
        if (msg) return res.status(400).json({
            error: {
                code: 400,
                type: 'email',
                message: msg
            }
        });
        msg = await UserModelInstance.setPassword(password);
        if (msg) return res.status(400).json({
            error: {
                code: 400,
                type: 'password',
                message: msg
            }
        });
        const user = await UserModelInstance.update(id);
        res.status(200).json(user);
    } catch (error) {
        throw new Error(error)
    }
});

//product routes
_.get('/products', async (req, res) => {
    try {
        const products = await ProductModelInstance.findAll();
        res.status(200).json(products);
    } catch (error) {
        throw new Error(error);
    }
});

_.get('/products/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await ProductModelInstance.findOneById(productId);
        res.status(200).json(product);
    } catch (error) {
        throw new Error(error);
    }
});

//cart routes
_.get('/cart', async (req, res) => {
    try {
        if (!req.user) return;
        const { id } = req.user;
        const cart = await CartItemModel.find(id)
        res.status(200).json(cart);
    } catch (error) {
        throw new Error(error)
    }
});

_.post('/cart/:productId', async (req, res) => {
    try {
        if (!req.user) return;
        const { id } = req.user;
        const { productId } = req.params;
        const checkIfItemExistsInCart = await CartItemModel.findByProductId(productId, id);
        if (!checkIfItemExistsInCart) {
            const createCartItem = await CartItemModel.create(id, productId);
            res.status(200).json(createCartItem);
        } else {
            const incremented = checkIfItemExistsInCart[0].qty + 1;
            const updateCartItem = await CartItemModel.update(checkIfItemExistsInCart[0].id, incremented);
            res.status(200).json(updateCartItem);
        }
    } catch (error) {
        throw new Error(error);
    }
});

_.put('/cart/:productId', async (req, res) => {
    try {
        if (!req.user) return;
        const { id } = req.user;
        const { productId } = req.params;
        const { qty } = req.body;
        const checkIfItemExistsInCart = await CartItemModel.findByProductId(productId, id);
        if (!checkIfItemExistsInCart) {
            if (qty <= 0) return;
            const createCartItem = await CartItemModel.create(id, productId, qty);
            res.status(200).json(createCartItem);
        } else {
            if (qty <= 0) {
                const removedItem = await CartItemModel.deleteOne(id, productId);
                removedItem.qty = 0;
                console.log(removedItem)
                res.status(200).json(removedItem);
            } else {
                const updateCartItem = await CartItemModel.update(checkIfItemExistsInCart[0].id, qty);
                res.status(200).json(updateCartItem);
            }
        }
    } catch (error) {
        throw new Error(error);
    }
});

_.delete('/cart/:productId', async (req, res) => {
    try {
        if (!req.user) return;
        const { id } = req.user;
        const { productId } = req.params;
        const removedItem = await CartItemModel.deleteOne(id, productId);
        removedItem.qty = 0;
        res.status(200).json(removedItem);
    } catch (error) {
        throw new Error(error);
    }
});

_.post('/checkout', async (req, res) => {
    try {
        if (!req.user) return;
        const { id } = req.user;
        // const { cartId, paymentInfo } = req.body;

        // const stripe = require('stripe') (STRIPE_KEY);

        const cartItems = await CartItemModel.find(id);
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            const product = await ProductModelInstance.findOneById(cartItems[i].productid);
            cartItems[i].price = product.price;
            cartItems[i].name = product.name;
            cartItems[i].description = product.description;
            total += (Number(product.price) * Number(cartItems[i].qty));
        }
        const Order = new OrderModel({ total, userId: id });
        await Order.create();
        for (let i = 0; i < cartItems.length; i++) {
            await OrderItemModel.create(Order.id, cartItems[i].qty, cartItems[i].price, cartItems[i].productid,
                cartItems[i].name, cartItems[i].description, Order.created);
        }

        //   await stripe.charges.create({
        //     amount: total,
        //     currency: 'gbp',
        //     source: paymentInfo.id,
        //     description: 'ecommerce charge'
        //   })

        const order = await Order.update({ status: 'COMPLETE' });
        await CartItemModel.deleteAll(id);
        res.status(200).json(order);
    } catch (error) {
        throw new Error(error);
        // console.log(error)
    }
});

//order routes
_.get('/orders', async (req, res) => {
    try {
        if (!req.user) return;
        const { id } = req.user;
        const orders = await OrderModel.findByUser(id);
        for (let i = 0; i < orders.length; i++) {
            orders[i].orderItems = await OrderItemModel.findById(orders[i].id);
        }
        res.status(200).json(orders);
    } catch (error) {
        throw new Error(error)
    }
});

// general
_.get('/status', (req, res) => {
    console.log(req.user);
    console.log(req.session);
    if (req.user) return res.send(req.user);
    return res.sendStatus(401);

});

_.all('*', async (req, res) => {
    try {
        res.status(404).json({
            timestamp: Date.now(),
            msg: 'no route matches your request',
            code: 404
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = _;