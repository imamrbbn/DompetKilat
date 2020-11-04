const router = require('express').Router()

const UserController = require(`../controllers/User`)
const { authentication } = require('../middlewares/auth')

router.post(`/register`, UserController.register)
router.post(`/login`, UserController.login)

router.use(authentication)

router.get(`/user`, UserController.getOne)

module.exports = router
