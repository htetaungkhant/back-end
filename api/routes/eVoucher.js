const express = require('express');
const bodyParser = require('body-parser');

const { auth, onlyAdmin } = require('../auth');
const eVoucherModel = require('../models/eVoucher');

const eVoucherRouter = express.Router();

eVoucherRouter.use(bodyParser.json());

eVoucherRouter.route('/')
    .get((req, res, next) => {
        const evoucher = eVoucherModel.getInstance();

        const result = evoucher.getAll();

        result
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .post(auth, onlyAdmin, (req, res, next) => {
        const code = req.body.code;
        const amount = req.body.amountId;
        const type = req.body.typeId;
        const title = req.body.title;
        const description = req.body.description;
        const image = req.body.image;

        const args = { code, amount, type, title, description, image };console.log(args);

        const evoucher = eVoucherModel.getInstance();

        const result = evoucher.insertNewEvoucher(args);

        result
        .then(data => res.status(200).json({ success: true, data: data}))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    });

eVoucherRouter.route('/verifypromocode')
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('Get Operation does not support...');
    })    
    .post((req, res, next) => {
        const { promoCode } = req.body;

        const evoucher = eVoucherModel.getInstance();

        const result = evoucher.checkPromoCode(promoCode);

        result
        .then(data => {
            if(data){
                res.status(200).json({ status: 'valid' });
            }
            else{
                res.status(403).json({ status: 'invalid' });
            }
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    });

eVoucherRouter.route('/:id')
    .get((req, res, next) => {
        const { id } = req.params;

        const evoucher = eVoucherModel.getInstance();

        const result = evoucher.getEvoucher(id);

        result
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST Operation does not support');
    });

module.exports = eVoucherRouter;