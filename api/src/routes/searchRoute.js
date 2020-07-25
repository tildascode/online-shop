const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

router.get('/', (req, res) => {
    const search = req.query.q;
    const page = req.query.page;

    if (!search) {
        res.send("");
    }

    productService.findByQuery(search, page, (err, products) => {
        if (err) {
            // TODO handle error
            console.log(err);
            res.status(500).send();
        }

        return res.json(products);
    });
});

module.exports = router;