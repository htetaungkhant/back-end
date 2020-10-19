const bcrypt = require('bcrypt');

const connection = require('../dbService');

const instance = null;

class user {
    static getInstance() {
        return instance ? instance : new user();
    }

    async getUser(email) {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM user WHERE email=?";

            connection.query(query, [email], (err, result) => {
                if(err) reject(new Error(err.message));
                resolve(result[0]);
            });
        });

        // console.log(response);
        return response;
    }

    async insertNewUser(email, password, role, balance) {

        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO user(email, password, role, balance) VALUES ( ?, ?, ?, ?);";

            connection.query(query, [email, password, role, balance], (err, result) => {
                if(err) reject(new Error(err.message));
                resolve(result.insertId);
            });
        });

        // console.log(insertId);
        return {
            id: insertId,
            email,
            password,
            role,
            balance
        };
    }

}

module.exports = user;