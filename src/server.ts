import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as morgan from 'morgan'
import * as dotenv from 'dotenv'
import { ErrorHandler } from './middleware/errorhandler'
import { NotFoundHandler } from './middleware/notfound'
import * as mongoose from 'mongoose'
import { AttendanceHandler } from './controllers/attendance'
import { validate } from './middleware/validateinputs'
import { attendanceValidationSchema } from './attendanceValidationSchema'
import { errorWrapper } from './middleware/errorwrapper'
dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.get('/', (_req: express.Request, res: express.Response) => {
  res.send('Health check. App is working')
})
app.post('/attendance', validate(attendanceValidationSchema), errorWrapper(AttendanceHandler))
app.use(ErrorHandler)
app.use(NotFoundHandler)

const PORT = process.env.PORT ?? 3000

mongoose.set('strictQuery', false)
mongoose
  .connect(String(process.env.MONGO_URI))
  .then(() => {
    console.log('connected to database')
    // start listening on server only after successful database connection
    app.emit('databaseConnected')
  })
  .catch((err: any) => {
    console.log(err)
    process.exit(1)
  })

app.on('databaseConnected', () => {
  app.listen(PORT, () => {
    console.log(`server is listening on PORT ${PORT}`)
  })
})
