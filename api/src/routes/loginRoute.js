const User = require('../models/user');
const express = require('express');
const router = express.Router();

//TODO destroy session on logout
router.post('/', (req, res) => {
    const {email, password} = req.body;
    if (email && password) {
        User.authenticate(email, password, function (error, user) {
            if (error || !user) {
                return res.json({success: false});
            } else {
                req.session.userId = email;
                req.session.userWishlist = user.wishlist;
                return res.json({success: true});
            }
        });
    } else {
        return res.json({success: false});
    }
});

module.exports = router;