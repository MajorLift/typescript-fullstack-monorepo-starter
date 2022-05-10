import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import path from 'path'

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, '../../pages/build')))

app.use('*', (req, res) => {
  res.status(404).send('Not Found')
})

app.use((err, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  }
  const errorObj = { ...defaultErr, ...err }
  console.log(errorObj.log)
  return res.status(errorObj.status).json(errorObj.message)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})

export default app
