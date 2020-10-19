const express = require('express');
const bodyParser = require('body-parser');

const { auth } = require('../auth');
const purchaseHistoryModel = require('../models/purchaseHistory');
const evoucherModel = require('../models/eVoucher');

const purchaseRouter = express.Router();

purchaseRouter.use(bodyParser.json());

purchaseRouter.route('/history/:userId')
    .get(auth, (req, res, next) => {
        const { userId } = req.params;

        const purchaseHistory = purchaseHistoryModel.getInstance();

        const result = purchaseHistory.getHistory(userId);

        result
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    })

purchaseRouter.route('/checkout')
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('Get Operation does not support');
    })
    .post(auth, (req, res, next) => {
        const { evoucherId, paymentId, userId } = req.body;

        const evoucher = evoucherModel.getInstance();

        const result = evoucher.getEvoucher(evoucherId);

        result
        .then(data => {
            if(data){
                const purchaseHistory = purchaseHistoryModel.getInstance();

                purchaseHistory.insertNewHistory(data.code, paymentId, userId)
                    .then(data => {
                        evoucher.deleteEvoucher(evoucherId)
                            .then(data => res.status(200).json({ success: data }))
                            .catch(err => {
                                console.log(err);
                                res.sendStatus(500);
                            });

                    })
                    .catch(err => {
                        console.log(err);
                        res.sendStatus(500);
                    });
            }
            else{
                res.status(403).json({ success: false })
            }
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    });

module.exports = purchaseRouter;