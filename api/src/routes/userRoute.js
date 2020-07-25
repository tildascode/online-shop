const express = require('express');
const router = express.Router();
const productService = require('../services/productService');
const userService = require('../services/userService');

router.get('/products', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).send();
    }
    productService.findAllForCurrentUser(userId, (err, products) => {
        if (err) {
            return res.status(500).send();
        }
        return res.json(products);
    });
});

router.get('/profile', (req, res) => {
    //
});

router.get('/wished', (req, res) => {
    productService.findProductsForCodes(req.session.userWishlist, (products) => {
        if (products) {
            return res.json(products);
        }
    });
});

router.get('/wish/:code', (req, res) => {
    const code = req.params.code;
    const userId = req.session.userId;
    if (!code) {
        return res.status(400).send();
    }
    if (!userId) {
        return res.status(401).send();
    }
    userService.addProductToWishList(code, userId, (err) => {
        if (err) {
            return res.status(500).send();
        } else {
            req.session.userWishlist = [...req.session.userWishlist, code];
            return res.status(200).send();
        }
    });
});

module.exports = router;
