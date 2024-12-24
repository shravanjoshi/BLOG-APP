const jwt = require('jsonwebtoken');
const secret = "$$hraw005";

function createTokenForUser(user){
    const payload = {
        fullName: user.fullName,
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
    };
    const token = jwt.sign(payload, secret);
    return token;
}

function validateUserToken(token){
    const payload = jwt.verify(token, secret);
    return payload;
}

module.exports = { createTokenForUser, validateUserToken };