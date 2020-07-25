const express = require('express');
const router = express.Router();
const ratingService = require('../services/ratingService');

router.post('/:productCode', (req, res) => {
    const productCode = req.params.productCode;
    const userId = req.session.userId;
    const {comment, stars} = req.body;
    if (!productCode || !userId || !stars) {
        return res.json({success: false, error: 400});
    }
    ratingService.rateProduct({productCode, userId, comment, stars}, (err, rating) => {
        if (err) {
            return res.status(500).send();
        }
        return res.json(rating);
    });

});

router.get('/:productCode', (req, res) => {
    const productCode = req.params.productCode;
    if (!productCode) {
        return res.json({success: false, error: 400});
    }
    ratingService.findProductRatings(productCode, (err, ratings) => {
        if (err) {
            return res.status(500).send();
        }
        return res.json({ratings: ratings, hideRatings: req.session.userId == null});
    });
});

module.exports = router;