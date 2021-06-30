const jwt = require ('jsonwebtoken')

const generateToken = (payload) =>{
    return jwt.sign(payload, "rahasiaboy")
}

function verifyToken(token){
    return jwt.verify(token, "rahasiaboy")
}

module.exports = {
    generateToken, 
    verifyToken
}