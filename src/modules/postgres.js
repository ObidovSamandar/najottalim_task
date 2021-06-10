import { Sequelize } from "sequelize"
import  config  from "../config.js"
import UserModel from "../models/UserModel.js"


const sequelize = new Sequelize(config.PG_CONNECTION, {
    logging: false
})


async function postgres () {
    try {
        // await sequelize.authenticate()
        let db = {}
        db.users = await UserModel(Sequelize,sequelize)
        // await sequelize.sync({force:true})
        // let findSettings = await db.users.findAll()
        // console.log(findSettings)
        return db
    } catch (e) {
        console.log(`DB ERROR ${e}`)
    }
}


export default postgres