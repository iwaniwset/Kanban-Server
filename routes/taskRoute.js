const router = require ('express').Router()
const controller = require ('../controllers/ControllerTask')
const authentication = require ('../middleware/authentication')
const authorization = require ('../middleware/authorization')

router.use(authentication)
router.get('/', controller.findAll)
router.post('/', controller.create)
router.put('/:id',authorization, controller.update)
router.delete('/:id',authorization, controller.delete)

module.exports = router