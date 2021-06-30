const bcryptjs = require ('bcryptjs')

const hassPass = (password)=>{
    let salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
}

const comparePass = (password, hashedPassword) => {
    return bcryptjs.compareSync(password, hashedPassword)
}

module.exports = {
    hassPass, comparePass
}








