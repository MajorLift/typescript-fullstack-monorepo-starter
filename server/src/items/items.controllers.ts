import { StatusCodes as status } from 'http-status-codes'

import { conn } from '../db/connection'

import ItemQueries from './items.queries'

import type { Item } from '@mono/feature'
import type { ExpressController } from '../types'

export const ItemsController: ExpressController<Item> = {
  findAllItems: async (_req, res, next) => {
    try {
      const { rows } = await conn.query<Item>(ItemQueries.findAllItems)
      res.locals.items = rows
      console.log(res.locals.items.map((item) => item._id))
      next()
    } catch (e) {
      console.error(e)
    }
  },

  findItemById: async (req, res, next) => {
    try {
      const { itemId } = req.params
      const { rows } = await conn.query<Item>(ItemQueries.findItemById, [
        itemId,
      ])
      res.locals.items = rows
      console.log(res.locals.items)
      next()
    } catch (e) {
      console.error(e)
    }
  },

  findItemsByUser: async (req, res, next) => {
    try {
      const {
        sort_by: orderBy = ['-created_time', '+title'],
        offset,
        limit,
        search,
        ...filters
      } = req.query
      if (typeof limit === 'string' && parseInt(limit) > 100) {
        res
          .status(status.UNPROCESSABLE_ENTITY)
          .json(`Limit must be less than or equal to 100.`)
      }
      const { userId } = req.params
      const { rows }: { rows: Item[] } = await conn.query(
        ItemQueries.findItemsByUser,
        [
          userId,
          search ?? '',
          orderBy ?? 'created_time ASC',
          offset ?? 0,
          limit ?? 100,
          filters ?? {},
        ]
      )
      res.locals.items = rows
      next()
    } catch (e) {
      console.error(e)
    }
  },

  findItemByUser: async (req, res, next) => {
    try {
      const { userId, itemId } = req.params
      const { rows }: { rows: Item[] } = await conn.query(
        ItemQueries.findItemByUser,
        [userId, itemId]
      )
      res.locals.items = rows
      next()
    } catch (e) {
      console.error(e)
    }
  },

  createItem: async (req, res, next) => {
    try {
      const { title, content } = req.body
      const { rows } = await conn.query<Item>(ItemQueries.createItem, [
        title,
        content,
      ])
      if (req.headers['content-type'] !== 'application/json') {
        throw res
          .status(status.UNSUPPORTED_MEDIA_TYPE)
          .send(`'Content-Type' must be 'application/json'`)
      }
      res.locals.items = rows
      console.log(res.locals.items)
      next()
    } catch (e) {
      console.error(e)
    }
  },

  updateItem: async (req, res, next) => {
    try {
      const { itemId } = req.params
      const { title, content } = req.body
      if (Object.keys(req.headers).includes('content-range')) {
        throw res
          .status(status.BAD_REQUEST)
          .send(`Cannot update item with 'Content-Range' header`)
      }
      if (req.headers['content-type'] !== 'application/json') {
        throw res
          .status(status.UNSUPPORTED_MEDIA_TYPE)
          .send(`'Content-Type' must be 'application/json'`)
      }
      const { rows }: { rows: Item[] } = await conn.query(
        ItemQueries.updateItem,
        [title, content, itemId]
      )
      if (!rows) await ItemsController.createItem(req, res, next)
      else res.locals.items = rows
      next()
    } catch (e) {
      console.error(e)
    }
  },

  deleteItem: async (req, res, next) => {
    try {
      const { itemId } = req.params
      const { rows }: { rows: Item[] } = await conn.query(
        ItemQueries.deleteItem,
        [itemId]
      )
      if (rows.length === 0) {
        throw res.status(status.NOT_FOUND).send('Item not found')
      } else res.locals.items = rows
      next()
    } catch (e) {
      console.error(e)
    }
  },
}
