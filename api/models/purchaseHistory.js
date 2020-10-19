const connection = require('../dbService');

const instance = null;

class purchaseHistory {
    static getInstance() {
        return instance ? instance : new purchaseHistory();
    }

    async getAll() {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM purchase_history";

            connection.query(query, (err, results) => {
                if(err) reject(new Error(err.message));
                resolve(results);
            });
        });

        // console.log(response);
        return response;
    }

    async getHistory(userId) {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM purchase_history WHERE user=?;";

            connection.query(query, [userId], (err, results) => {
                if(err) reject(new Error(err.message));
                resolve(results);
            });
        });

        // console.log(response);
        return response;
    }

    async insertNewHistory(evoucherCode, payment, user) {
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO purchase_history(evoucher_code, payment, user) VALUES ( ?, ?, ?);";

            connection.query(query, [evoucherCode, payment, user], (err, result) => {
                if(err) reject(new Error(err.message));
                else resolve(result.insertId);
            });
        });

        // console.log(insertId);
        return {
            id: insertId,
            evoucherCode,
            payment,
            user
        };
    }
}

module.exports = purchaseHistory;