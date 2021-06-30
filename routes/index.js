const router = require ('express').Router()
const taskRoute = require ('./taskRoute')
const userRoute = require ('./userRoute')

router.use('/users', userRoute)
router.use('/tasks', taskRoute )

module.exports = router