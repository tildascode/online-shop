const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');
const productService = require('../services/productService');

router.post('/', (req, res) => {
    const {name, parentCategory, subCategories} = req.body;

    if (!name) {
        return res.status(400).send();
    }
    categoryService.create({name, parentCategory, subCategories}, (err, category) => {
        if (err) {
            //TODO handle error
            console.log(err);
            return res.send(err);
        }
        return res.json(category);
    });
});

router.get('/', (req, res) => {
    categoryService.findTopLevelCategories((err, categories) => {
        if(err) {
            //TODO handle
        }
        return res.json(categories)
    });
})

router.get('/:code', (req, res) => {
    const code = req.params.code;
    if (!code) {
        //TODO handle error
    }
    productService.findProductsForCategory(code, (err, products) => {
        if (err) {
            //TODO handle error
        }
        return res.json(products);
    })
})

module.exports = router;