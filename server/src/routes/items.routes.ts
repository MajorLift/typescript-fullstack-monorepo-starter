import { Router } from 'express'
import { StatusCodes as status } from 'http-status-codes'

import { itemsController } from '../controllers/items.controller'

export const itemsRouter = Router()

if (process.env.NODE_ENV === 'development') {
  itemsRouter.get('/items', itemsController.findAllItems, (req, res) => {
    res.status(status.OK).json(res.locals.items)
  })

  itemsRouter.get(
    '/items/:itemId',
    itemsController.findItemById,
    (req, res) => {
      res.status(status.OK).json(res.locals.items)
    }
  )
}

// itemsRouter.get(
//   '/users/:userId/items/:itemId',
//   itemsController.findItemByUser,
//   (req, res) => {
//     res.status(status.OK).json(res.locals.items)
//   }
// )

// itemsRouter.get(
//   '/users/:userId/items',
//   itemsController.findItemsByUser,
//   (req, res) => {
//     res.status(status.OK).json(res.locals.items)
//   }
// )

itemsRouter.post('/items', itemsController.createItem, (req, res) => {
  res
    .status(status.CREATED)
    .header('Location', `/items/${res.locals.items[0]._id}`)
    .json(res.locals.items)
})

itemsRouter.put('/items/:itemId', itemsController.updateItem, (req, res) => {
  res.status(status.OK).json(res.locals.items)
})

itemsRouter.delete('/items/:itemId', itemsController.deleteItem, (req, res) => {
  res.status(status.NO_CONTENT).end('Resource successfully deleted')
})
