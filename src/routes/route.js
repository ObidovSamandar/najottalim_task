import UserRoute from  "./UsersRoute.js"

export default  (app) =>{
    app.use(UserRoute.path, UserRoute.router)
}