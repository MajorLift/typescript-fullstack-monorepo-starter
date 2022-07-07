import path from 'path'
import express, { Router, Application } from 'express'
import gracefulShutdown from 'nodejs-graceful-shutdown'
import http from 'http-server'
import { StatusCodes as status } from 'http-status-codes'

import cors from 'cors'
import multer from 'multer'
import helmet from 'helmet' // 15 security headers 
import morgan from 'morgan' // http request logger
import userAgent from 'express-useragent'
import compression from 'compression'
import zlib from 'zlib'
import rateLimit from 'express-rate-limit'
import SlowDown from 'express-slow-down'
import hpp from 'hpp' // protects against http param pollution
import nocache from 'nocache' // sets response headers that disable most client-side browser caching
import session from 'express-session'
import consola from 'consola'

import itemsRouter from './entity/items/items.routes'

export class App {
  private app: Application
  private version: number
  private env: 'test' | 'development' | 'production' | string
  private port: number

  constructor() {
    this.app = express()
    this.version = 1
    this.env = process.env.NODE_ENV || 'development'
    this.port = parseInt(process.env.SERVER_PORT || '3000')
  }

  //   /** parse request bodies */
  // this.app.use(express.json()) // handles 'application/json'
  // this.app.use(express.urlencoded({ extended: true })) // handles 'application/x-www-form-urlencoded'
  // this.app.use(multer({ dest: './uploads/' })) // handles 'multipart/form-data'


  private middleware() {
    this.app.use(userAgent.express())
    this.app.use(nocache())
    this.app.use(hpp({ checkBody: true, checkQuery: true }))
    this.app.use(helmet({ contentSecurityPolicy: false }))
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
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
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
      SlowDown({
        windowMs: 24 * 60 * 1, 
        delayMs: 24 * 60 * 2000, 
        delayAfter: 1000,
      })
    )
    this.app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET_KEY as string,
        cookie: { httpOnly: true, sameSite: 'strict' }
      })
    )
    if (!['production', 'test'].includes(this.env)) {
      this.app.use(morgan('dev'))
    }
  }

  private async run() {
    if (this.env !== 'production') {
      this.server.listen(this.port, () => consola.info(serverInfo))
    } else {
      gracefulShutdown(this.server, {
        signals: 'SIGINT SIGTERM',
        timeout: 30000,
        development: false,
        onShutdown:
          async (signal) => {
            return new Promise<void>((resolve) => {
              console.log('... called signal: ', signal)
              console.log('... in cleanup')
              setTimeout(function () {
                console.log('... cleanup finished')
                resolve()
              }, 1000)
            })
          },
      }
    )
  }
}


// app.use(express.static(path.resolve(__dirname, '../../pages/build')))

// const api = Router()
// this.app.use('/api', api)

// const versions = new Array(this.version).fill(Router())
// versions.forEach((router, i) => router.use('/v' + i, itemsRouter))

// v1.use('/items', itemsRouter)

// app.use('*', (req, res) => {
//   res.status(404).send('Not Found')
// })

// app.use((err, res) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   }
//   const errorObj = { ...defaultErr, ...err }
//   console.log(errorObj.log)
//   return res.status(errorObj.status).json(errorObj.message)
// })
