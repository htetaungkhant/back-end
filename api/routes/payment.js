const express = require('express');
const bodyParser = require('body-parser');

const paymentModel = require('../models/payment');

const paymentRouter = express.Router();

paymentRouter.use(bodyParser.json());

paymentRouter.route('/')
    .get((req, res, next) => {
        const payment = paymentModel.getInstance();

        const result = payment.getAll();

        result
        .then(data => res.status(200).json({ payment_methods: data}))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    });

module.exports = paymentRouter;