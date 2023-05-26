import { Router } from 'express'
import { StatusCodes as status } from 'http-status-codes'

import { ItemsController } from './items.controllers'

import type { Item } from '@mono/feature'

export const itemsRouter: Router = Router()

itemsRouter.get('/items', ItemsController.findAllItems, (_req, res) => {
  const { items } = res.locals
  res.status(status.OK).json(items)
})

itemsRouter.get('/items/:itemId', ItemsController.findItemById, (_req, res) => {
  const {
    items: [item],
  } = res.locals
  res.status(status.OK).json(item)
})

itemsRouter.get(
  '/users/:userId/items',
  ItemsController.findItemsByUser,
  (_req, res) => {
    const { items } = res.locals
    res.status(status.OK).json(items)
  }
)

itemsRouter.get(
  '/users/:userId/items/:itemId',
  ItemsController.findItemByUser,
  (_req, res) => {
    const {
      items: [item],
    } = res.locals
    res.status(status.OK).json(item)
  }
)

itemsRouter.post('/items', ItemsController.createItem, (_req, res) => {
  const {
    items: [item],
  } = res.locals
  res.header('Location', `/items/${item._id}`).status(status.CREATED).json(item)
})

itemsRouter.post('/items/:itemId', ItemsController.updateItem, (_req, res) => {
  const {
    items: [item],
  } = res.locals
  res.status(status.OK).json(item)
})

itemsRouter.delete(
  '/items/:itemId',
  ItemsController.deleteItem,
  (_req, res) => {
    res.status(status.NO_CONTENT).send('Item successfully deleted')
  }
)
