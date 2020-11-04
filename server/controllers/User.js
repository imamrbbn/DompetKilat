const {User} = require(`../models`)
const {compareBcrypt} = require('../helpers/bcrypt.js')
const {generateToken} = require('../helpers/jwt.js')

class UserController {

    static register(req, res, next) {
        const newUser = {
            email : req.body.email,
            username : req.body.username,
            password : req.body.password
        }
        
        User.create(newUser)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            return next(err)
        })
    }

    static login(req, res, next) {
        const {email, username, password} = req.body

        User.findOne({where: {email}})
        .then(result => {
            if (result && compareBcrypt(password, result.password)) {
                const access_token = generateToken(result)

                return res.status(200).json({
                    id: result.id, 
                    email: result.email,
                    username: result.username,
                    access_token})

                } else {
                    throw {statusCode: 400, msg: "Invalid username or password!"}
                }
        })
        .catch(err => {
            next(err)
        })
    }

    static getOne(req,res,next) {
        const {id, username, email} = req.userData

        return res.status(200).json({
            id, email, username
        })
    }
}   

module.exports = UserController