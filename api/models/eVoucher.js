const connection = require('../dbService');

const instance = null;

class evoucher {
    static getInstance() {
        return instance ? instance : new evoucher();
    }

    async getAll() {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM evoucher";

            connection.query(query, (err, results) => {
                if(err) reject(new Error(err.message));
                resolve(results);
            });
        });

        // console.log(response);
        return response;
    }

    async getEvoucher(id) {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM evoucher WHERE id=?";

            connection.query(query, [id], (err, result) => {
                if(err) reject(new Error(err.message));
                resolve(result[0]);
            });
        });

        // console.log(response);
        return response;
    }

    async insertNewEvoucher(args) {

        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO evoucher(code, amount, type, title, description, image) VALUES ( ?, ?, ?, ?, ?, ?);";

            connection.query(query, Object.values(args), (err, result) => {
                if(err) reject(new Error(err.message));
                else resolve(result.insertId);
            });
        });

        // console.log(insertId);
        return {
            id: insertId,
            ...args
        };
    }
    
    async checkPromoCode(promoCode) {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM evoucher WHERE code=?";

            connection.query(query, [promoCode], (err, result) => {
                if(err) reject(new Error(err.message));
                resolve(result[0]);
            });
        });

        // console.log(response);
        return response;
    }

    async deleteEvoucher(id){
        const response = await new Promise((resolve, reject) => {
            const query = "DELETE FROM evoucher WHERE id=?;";

            connection.query(query, [id], (err, result) => {
                if(err) reject(new Error(err.message));
                resolve(result.affectedRows);
            });
        });

        return response === 1 ? true : false;
    }
}

module.exports = evoucher;