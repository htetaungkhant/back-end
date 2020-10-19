const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

//start mysql connection
const connection = require('./api/dbService');

connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});


//routes for api
const eVoucherRouter = require('./api/routes/eVoucher');
const paymentRouter = require('./api/routes/payment');
const userRouter = require('./api/routes/user');
const purchaseRouter = require('./api/routes/purchase');

const app = express();

const port = process.env.PORT || 8000;

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/evoucher', eVoucherRouter);
app.use('/payment', paymentRouter);
app.use('/user', userRouter);
app.use('/purchase', purchaseRouter);

app.listen(port, () => {
    console.log("Server running ....");
})