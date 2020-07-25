const express = require('express');
const router = express.Router();
const productService = require('../services/productService');
const ratingService = require('../services/ratingService');

router.post('/create', (req, res) => {
    const {name, description, price, category} = req.body;
    const medias = req.file;
    if (!name || !price) {
        return res.json({success: false, error: 400});
    }
    const userId = req.session.userId;
    productService.create({name, description, price, category, medias, userId}, (err, product) => {
        if (err) {
            return res.status(500).send();
        }
        return res.json(product);
    });

});

router.get('/:code', (req, res) => {
    const code = req.params.code;
    if (!code) {
        return res.status(400).send();
    }
    productService.findByCode(code, (err, product) => {
        if (err) {
            return res.status(500).send();
        }
        const wishlist = req.session.userWishlist ? req.session.userWishlist : [];
        const wished = wishlist.some(c => c == code);
        return res.json({...product, wished: wished});
    });
});

router.get('/', (req, res) => {
    productService.findAll((err, products) => {
        if (err) {
            return res.status(500).send();
        }
        return res.json(products);
    });
});


module.exports = router;