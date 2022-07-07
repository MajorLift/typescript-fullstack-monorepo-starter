import { Router } from 'express'
import itemsController from './items.controller'

const items = Router()

items.get('/:id', (req, res) => {
  itemsController.findItem(req, res)
})
items.get('/', (req, res) => {
  itemsController.findItems(req, res)
})
items.get('/users/:id', (req, res) => {
  itemsController.findItems(req, res)
})
items.get('/filters/:id', (req, res) => {})
items.post('/filters', (req, res) => {})
items.post('/', (req, res) => {
  itemsController.createItem(req, res)
})
items.put('/:id', (req, res) => {
  itemsController.updateItem(req, res)
})
items.delete('/:id', (req, res) => {
  itemsController.deleteItem(req, res)
})

export default items
