const User = require('../models/user');

exports.signUp = (req, res) => {
    const user = new User(req.body);
    console.log('req body',req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err
            })
        }
        res.json({
            user
        })
    })
};
