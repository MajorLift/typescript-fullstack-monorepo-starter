import { StatusCodes as status } from 'http-status-codes'

import db from '../db/connection'
import ItemQueries from '../db/items.queries'

import type { ExpressController } from 'types'

import type { Item } from '@mono/feature'

export const itemsController: ExpressController<Item> = {}

if (process.env.NODE_ENV === 'development') {
  itemsController.findAllItems = async (req, res, next) => {
    try {
      const { rows } = await db.query(`
      SELECT * FROM items
    `)
      console.log(rows)
      res.locals.items = rows
      next()
    } catch (e) {
      console.error(e)
    }
  }

  itemsController.findItemById = async (req, res, next) => {
    try {
      const { itemId } = req.params
      const { rows } = await db.query(ItemQueries.findItemById, [itemId])
      res.locals.items = rows
      next()
    } catch (e) {
      console.error(e)
    }
  }
}

// itemsController.findItemsByUser = async (req, res, next) => {
//   try {
//     const {
//       sort_by: orderBy = ['-created_time', '+title'],
//       offset,
//       limit,
//       ...filters
//     } = req.query
//     if (typeof limit === 'string' && parseInt(limit) > 100) {
//       res
//         .status(status.UNPROCESSABLE_ENTITY)
//         .json(`Limit must be less than or equal to 100.`)
//     }
//     const { userId } = req.params
//     const { rows } = await db.query(ItemQueries.findItemsByUser, [
//       userId,
//       orderBy || 'ASC',
//       offset || 0,
//       limit || 100,
//       filters || {},
//     ])
//     res.locals.items = rows
//     next()
//   } catch (e) {
//     console.error(e)
//   }
// }

// itemsController.findItemByUser = async (req, res, next) => {
//   try {
//     const { userId, itemId } = req.params
//     const { rows } = await db.query(ItemQueries.findItemByUser, [
//       userId,
//       itemId,
//     ])
//     res.locals.items = rows
//     next()
//   } catch (e) {
//     console.error(e)
//   }
// }

itemsController.createItem = async (req, res, next) => {
  try {
    const { title, content } = req.body
    const { rows } = await db.query(ItemQueries.createItem, [title, content])
    res.locals.items = rows
    next()
  } catch (e) {
    console.error(e)
  }
}

itemsController.updateItem = async (req, res, next) => {
  try {
    const { itemId } = req.params
    const { title, content } = req.body
    const { rows } = await db.query(ItemQueries.updateItem, [
      title,
      content,
      itemId,
    ])
    if (rows.length === 0) itemsController.createItem(req, res, next)
    else res.locals.items = rows
    next()
  } catch (e) {
    console.error(e)
  }
}

itemsController.deleteItem = async (req, res, next) => {
  try {
    const { itemId } = req.params
    await db.query(ItemQueries.deleteItem, [itemId])
    next()
  } catch (e) {
    console.error(e)
  }
}
