// const { User } = require ('../models/index')
// const { verifyToken } = require ('../helpers/jwt')

// function authentication (req, res, next){
//     let { token } = req.headers
//     let decoded = verifyToken(token)
//     console.log(decoded, "<<<<<<<<<< ini decoded");
// }

// module.exports =  authentication 



const {
    User
} = require('../models/index')
const {
    verifyToken
} = require('../helpers/jwt')

async function authentication(req, res, next) {
    try {
        let {
            token
        } = req.headers
        let decoded = verifyToken(token)
        console.log(decoded, "<<<<<<< ini decoded");
        let user = await User.findOne({
            where: {
                email: decoded.email
            }
        })
        if (!user) throw {
            name: "AuthenticationFailed"
        }
        req.userData = decoded
        // console.log(userData);
        next()

    } catch (err) {
        next(err)
    }
}

module.exports = authentication