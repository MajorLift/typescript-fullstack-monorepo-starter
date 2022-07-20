import type { UUID } from '@mono/feature'
import type { NextFunction, Request, Response } from 'express'

export const isDev = process.env.NODE_ENV === 'development'

export type ExpressRouteFunc<T> = (
  req: Request<{ itemId: UUID; userId?: UUID }, Partial<T> | T[], Partial<T>>,
  res: Response<Partial<T> | T[] | string>,
  next: NextFunction
) => void | Promise<void>

export type ExpressController<T> = Record<string, ExpressRouteFunc<T>>
