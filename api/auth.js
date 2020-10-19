const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);

    const [ type, token ] = authHeader.split(' ');
    if(type !== "Bearer") return res.sendStatus(401);

    jwt.verify(token, secret, function(err, data) {
        if(err) return res.sendStatus(401);
        else next();
    });
}

exports.auth = auth;

function onlyAdmin(req, res, next) {
    const [ type, token ] = req.headers['authorization'].split(' ');

    jwt.verify(token, secret, function(err, data) {
        if(data && data.role === 1) next();
        else return res.sendStatus(403);
    });
}

exports.onlyAdmin = onlyAdmin;