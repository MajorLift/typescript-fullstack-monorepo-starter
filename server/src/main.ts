import compression from 'compression'
import cors from 'cors'
import express, { Application, Router } from 'express'
import { rateLimit } from 'express-rate-limit'
import slowDown from 'express-slow-down'
import useragent from 'express-useragent'
import helmet from 'helmet'
import hpp from 'hpp'
import { StatusCodes as status } from 'http-status-codes'
import morgan from 'morgan'
import nocache from 'nocache'
import path from 'path'
import zlib from 'zlib'

import { itemsRouter } from './items/items.routes'

export class App {
  private app: Application
  private version: number
  private env: 'test' | 'development' | 'production' | string
  private port: number

  constructor() {
    this.app = express()
    this.version = 1
    this.env = process.env.NODE_ENV ?? 'development'
    this.port = parseInt(process.env.SERVER_PORT ?? '3000')
  }

  private config() {
    this.app.disable('x-powered-by')
    this.app.set('etag', false)
    this.app.use(express.static(path.resolve(__dirname, '../../', 'app/build')))
    this.app.listen(this.port, () => {
      console.log(`Server listening on port: ${this.port}...`)
    })
  }

  private middleware() {
    // sets user-agent to express
    this.app.use(useragent.express())
    // sets response headers that disable most client-side browser caching
    this.app.use(nocache())
    // handles 'application/json'
    this.app.use(express.json({ limit: '5mb' }))
    // handles 'application/x-www-form-urlencoded'
    this.app.use(express.urlencoded({ extended: true }))
    // protects against http param pollution
    this.app.use(hpp({ checkBody: true, checkQuery: true }))
    // security headers
    this.app.use(helmet({ contentSecurityPolicy: this.env !== 'development' }))
    this.app.use(
      compression({
        strategy: zlib.constants.Z_RLE,
        level: zlib.constants.Z_BEST_COMPRESSION,
        memLevel: zlib.constants.Z_BEST_COMPRESSION,
      })
    )
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
      })
    )
    this.app.use(
      rateLimit({
        windowMs: 24 * 60 * 3,
        max: 1000,
        message: 'Exceeded rate limit. Try again in 3 minutes.',
      })
    )
    this.app.use(
      slowDown({
        windowMs: 24 * 60 * 1,
        delayMs: 24 * 60 * 2000,
        delayAfter: 1000,
      })
    )
    if (!['production', 'test'].includes(this.env)) {
      // morgan: http request logger
      this.app.use(morgan('dev'))
    }
  }

  private route() {
    const api = Router()
    this.app.use('/api', api)
    const v1 = Router()
    api.use('/v1', v1)
    v1.use('/', itemsRouter)
  }

  private globalRoute() {
    this.app.all(['/', '/api', `/api/v${this.version}`], (_req, res) =>
      res.status(status.OK).send('API service online')
    )
    this.app.all('**', (_req, res) =>
      res.status(status.NOT_FOUND).send('Cannot find requested resource')
    )
    this.app.use((err, res) => {
      const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: status.INTERNAL_SERVER_ERROR,
        message: { error: 'Internal Server Error' },
      }
      const errorObj = { ...defaultErr, ...err }
      console.log(errorObj.log)
      return res.status(errorObj.status).json(errorObj.message)
    })
  }

  public async main(): Promise<Application> {
    await import('./db/connection')
    this.config()
    this.middleware()
    this.route()
    this.globalRoute()
    return this.app
  }
}

export default (async () => {
  if (process.env.NODE_ENV !== 'test') await new App().main()
})()
