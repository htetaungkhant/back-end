const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userModel = require('../models/user');

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/login')
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end("Get Operation does not support");
    })
    .post((req, res, next) => {
        const { email, password } = req.body;

        const user = userModel.getInstance();

        const result = user.getUser(email);

        result
        .then(user => {
            if(user){
                bcrypt.compare(password, user.password, function(err, result) {
                    if(result === true){
                        const secret = process.env.SECRET;
                        jwt.sign(JSON.parse(JSON.stringify(user)), secret, {expiresIn: '24h' }, function (err, token) {
                            return res.status(200).json({ token });
                        });
                    }
                    else {
                        return res.json({ success: false });
                    }
                });
            }
            else{
                return res.json({ success: false });
            }
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    });

userRouter.route('/register')
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end("Get Operation does not suport");
    })
    .post((req, res, next) => {
        const { email, password, role, balance } = req.body;
        
        const user = userModel.getInstance();
        
        bcrypt.hash(password, 10, function(err, hash) {
            const result = user.insertNewUser(email, hash, role, balance);
    
            result
            .then(data => res.status(200).json({ success: true, data: data}))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
        });
    });

module.exports = userRouter;