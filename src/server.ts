import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as morgan from 'morgan'
import * as dotenv from 'dotenv'
import { ErrorHandler } from './controllers/errorhandler'
import { NotFoundHandler } from './controllers/notfound'

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.get('/', (_req: express.Request, res: express.Response) => {
  res.send('Health check. App is working')
})
app.use(ErrorHandler)
app.use(NotFoundHandler)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`)
})
