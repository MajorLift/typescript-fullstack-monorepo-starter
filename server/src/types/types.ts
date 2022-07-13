import { NextFunction, Request, Response } from 'express'

export type UUID = string

export type ExpressRouteFunc<T> = (
  req: Request<
    { id?: string; userId?: UUID; itemId?: UUID },
    unknown,
    Partial<T>
  >,
  res: Response,
  next: NextFunction
) => void | Promise<void>

export type ExpressController<T> = Record<string, ExpressRouteFunc<T>>
