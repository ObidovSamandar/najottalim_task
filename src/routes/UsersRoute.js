import express from "express"
import UserController from "../controller/UserController.js"

const router = express.Router()



router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)
router.get('/confirm/:id', UserController.confirmGmail)
// router.post('/login', UserController.login)

export default {
    path: '/users',
    router: router
}