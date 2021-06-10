import dotenv from "dotenv"

dotenv.config()

const { env } = process

export default {
    PG_CONNECTION: env.PG_CONNECTION_STRING,
    JWT_SECRET:env.JWT_SECRET
}