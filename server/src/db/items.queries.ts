export default {
  findItemsByUser: `
    SELECT * FROM items
      LEFT JOIN users.name AS username, users.email AS email
      ON items.user_id = users._id
      WHERE user_id = $1
      ORDER BY $2
      OFFSET $3
      LIMIT $4;
  `,
  findItemById: `
    SELECT * FROM items 
      WHERE _id = $1; 
  `,
  findItemByUser: `
    SELECT * FROM items 
      LEFT JOIN users
      ON items.user_id = users._id
      WHERE users._id = $1 AND items._id = $2;
  `,
  createItem: `
    INSERT INTO items (title, content) 
      VALUES ($1, $2)
      RETURNING *;
  `,
  updateItem: `
    UPDATE items
      SET title = $1, content = $2, modified_time = CURRENT_TIMESTAMP
      WHERE _id = $3
      RETURNING *;
  `,
  deleteItem: `
    DELETE FROM items
      WHERE _id = $1
      RETURNING *;
  `,
}
