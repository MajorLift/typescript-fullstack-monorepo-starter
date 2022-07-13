import { Router } from 'express'
import { StatusCodes as status } from 'http-status-codes'

import { itemsController } from '../controllers/items.controller'

export const itemsRouter = Router()

if (process.env.NODE_ENV === 'development') {
  itemsRouter.get('/items', itemsController.findAllItems, (_req, res) => {
    const { items } = res.locals
    res.status(status.OK).json({
      success: true,
      message: 'Items found',
      items,
    })
  })

  itemsRouter.get(
    '/items/:itemId',
    itemsController.findItemById,
    (_req, res) => {
      const {
        items: [item],
      } = res.locals
      res.status(status.OK).json({
        success: true,
        message: 'Item found',
        item,
      })
    }
  )
}

// itemsRouter.get(
//   '/users/:userId/items/:itemId',
//   itemsController.findItemByUser,
//   (_req, res) => {
//     res.status(status.OK).json(res.locals.items)
//   }
// )

// itemsRouter.get(
//   '/users/:userId/items',
//   itemsController.findItemsByUser,
//   (_req, res) => {
//     res.status(status.OK).json(res.locals.items)
//   }
// )

itemsRouter.post('/items', itemsController.createItem, (_req, res) => {
  const {
    items: [item],
  } = res.locals
  res
    .status(status.CREATED)
    .header('Location', `/items/${item._id as string}`)
    .json({
      success: true,
      message: 'Item successfully created',
      item,
    })
})

itemsRouter.put('/items/:itemId', itemsController.updateItem, (_req, res) => {
  const {
    items: [item],
  } = res.locals
  res.status(status.OK).json({
    success: true,
    message: 'Item successfully updated',
    item,
  })
})

itemsRouter.delete(
  '/items/:itemId',
  itemsController.deleteItem,
  (_req, res) => {
    const {
      items: [{ _id }],
    } = res.locals
    res.status(status.NO_CONTENT).json({
      success: true,
      message: 'Item successfully deleted',
      _id,
    })
  }
)
