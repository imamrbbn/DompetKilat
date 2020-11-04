const { verifyToken } = require('../helpers/jwt.js')
const { User } = require('../models')

const authentication = async (req, res, next) => {
  const {access_token} = req.headers

    try {
        const userData = verifyToken(access_token)
        let user = await User.findOne({
            where: {
                email: userData.email,
            }
        })

        if (user) {
            req.userData = userData
            next()
        } else {
            throw {msg: "User not authenticated", statusCode: 401}
        }

    } catch(err) {
        return next(err)
    }
}

module.exports = { authentication }