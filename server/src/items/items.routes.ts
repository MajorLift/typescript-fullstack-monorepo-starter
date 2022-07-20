import { Router } from 'express'
import { StatusCodes as status } from 'http-status-codes'

import { isDev } from '../types'
import { ItemsController } from './items.controllers'

import type { Item } from '@mono/feature'
export const itemsRouter = Router()

if (isDev) {
  itemsRouter.get('/items', ItemsController.findAllItems, (_req, res) => {
    const { items } = res.locals as { items: Item[] }
    res.status(status.OK).json(items)
  })

  itemsRouter.get(
    '/items/:itemId',
    ItemsController.findItemById,
    (_req, res) => {
      const {
        items: [item],
      } = res.locals as { items: Item[] }
      res.status(status.OK).json(item)
    }
  )
}

itemsRouter.get(
  '/users/:userId/items',
  ItemsController.findItemsByUser,
  (_req, res) => {
    const { items } = res.locals as { items: Item[] }
    res.status(status.OK).json(items)
  }
)

itemsRouter.get(
  '/users/:userId/items/:itemId',
  ItemsController.findItemByUser,
  (_req, res) => {
    const {
      items: [item],
    } = res.locals as { items: Item[] }
    res.status(status.OK).json(item)
  }
)

itemsRouter.post('/items', ItemsController.createItem, (_req, res) => {
  const {
    items: [item],
  } = res.locals as { items: Item[] }
  res.header('Location', `/items/${item._id}`).status(status.CREATED).json(item)
})

itemsRouter.put('/items/:itemId', ItemsController.updateItem, (_req, res) => {
  const {
    items: [item],
  } = res.locals as { items: Item[] }
  res.status(status.OK).json(item)
})

itemsRouter.delete(
  '/items/:itemId',
  ItemsController.deleteItem,
  (_req, res) => {
    res.status(status.NO_CONTENT).send('Item successfully deleted')
  }
)
