import express, { json } from 'express'
import logger from './middlewares/error/logger';
import responder from './middlewares/error/responder';
import notFound from './middlewares/not-found';
import config from 'config'
import sequelize from './db/sequelize';
import cors from 'cors'
import teamsRouter from './routers/teams'
import meetingsRouter from './routers/meetings'

const app = express()


const port = config.get<number>('app.port')
const appName = config.get<string>('app.name')
const secret = config.get<string>('app.secret')

console.log(`app secret is ${secret}`)

app.use(cors())
app.use(json())

app.use('/teams', teamsRouter)
app.use('/meetings', meetingsRouter)

app.use(notFound)

app.use(logger)
app.use(responder)

sequelize.sync({ force: process.argv[2] === 'sync' })

console.log(process.argv)

app.listen(port, () => console.log(`${appName} started on port ${port}`))