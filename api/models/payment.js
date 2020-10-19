const connection = require('../dbService');

const instance = null;

class payment {
    static getInstance() {
        return instance ? instance : new payment();
    }

    async getAll() {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM payment_method";

            connection.query(query, (err, results) => {
                if(err) reject(new Error(err.message));
                resolve(results);
            });
        });

        // console.log(response);
        return response;
    }
}

module.exports = payment;