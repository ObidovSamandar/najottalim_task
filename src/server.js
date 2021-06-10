import express from "express"
import postgres from "./modules/postgres.js"
import routes from "./routes/route.js"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import http from "http"

async function main(){
    let __dirname = path.resolve(path.dirname(''))
    let db = await postgres()

    const app = express()
    const server = http.createServer(app)
    
    server.listen(8075, ()=> console.log(`HTTP SERVER READY`))
    
    
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))

    app.use(async (req, res, next) =>{
        req.postgres = db
        next()        
    })
    routes(app)
}

main()