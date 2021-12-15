import router from 'express'
const route = router.Router()
import controllers from '../controllers'

route.post('/signUp', controllers.signUp)
route.post('/login', controllers.login)

export default route