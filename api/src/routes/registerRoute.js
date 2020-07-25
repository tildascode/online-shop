const User = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const {email, name, password} = req.body;

    //TODO add email validation
    if (!email || !name || !password) {
        return res.json({success: false});
    }
    let user = new User();
    user.email = email;
    user.name = name;
    user.password = password;
    user.save((err) => {
        //TODO error handling
        if (err) {
            let status = err.status ? err.status : 400;
            return res.status(status).send(err)
        }
        req.session.userId = user.email;
        return res.json({success: true});
    });
});

module.exports = router;