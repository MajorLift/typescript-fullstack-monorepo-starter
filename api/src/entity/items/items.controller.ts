import { ExpressController } from '../../types'
import db from '../../db'
import { Item } from './item.model'

const itemsController: ExpressController<Item> = {}

itemsController.findItems = async (req, res, next) => {
  try {
    const { sort_by: orderBy = ['-created_time', '+title'], offset, limit, ...filters } = req.query
    if (typeof limit === 'string' && parseInt(limit) > 100) {
      res.status(422).json(`Limit must be less than or equal to 100.`)
    }
    const { id: user_id } = req.params
    const { rows } = await db.query(
      `
        SELECT * FROM items
          LEFT JOIN users.name AS username, users.email AS email
          ON items.user_id = users._id
          ${user_id ? `WHERE user_id = $1` : ''}
          ORDER BY 
          OFFSET $2
          LIMIT $3;
      `,
      [user_id, orderBy, offset, limit, filters]
    )
    res.json(rows)
    return next()
  } catch (e) {
    return next(e)
  }
}

itemsController.findItem = async (req, res, next) => {
  try {
    const { id } = req.params
    const { rows } = await db.query(
      `
        SELECT * 
          FROM items 
          WHERE _id = $1; 
      `,
      [id]
    )
    res.json(rows)
  } catch (e) {
    console.error(e)
  }
}

itemsController.createItem = async (req, res, next) => {
  try {
    const { user_id, title, content } = req.body
    const { rows } = await db.query(
      `
        INSERT INTO items(user_id, title, content) 
          VALUES($1, $2, $3)
          RETURNING *;
      `,
      [user_id, title, content]
    )
    res.json(rows)
  } catch (e) {
    console.error(e)
  }
}

itemsController.updateItem = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, content } = req.body
    await db.query(
      `
        UPDATE items
          SET title = $1, content = $2, updated_time = CURRENT_DATETIME
          WHERE _id = $3;
      `,
      [title, content, id]
    )
    res.json('Item update successful.')
  } catch (e) {
    console.error(e)
  }
}

itemsController.deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params
    await db.query(
      `
        DELETE FROM items
          WHERE _id = $1;
      `,
      [id]
    )
    res.json('Item delete successful.')
  } catch (e) {
    console.error(e)
  }
}

export default itemsController
