export default {
  findAllItems: `--sql
    SELECT * FROM items;  
  `,

  findItemById: `--sql
  SELECT * FROM items
    WHERE _id = $1;
`,

  findItemsByUser: `--sql
    SELECT * FROM items
      LEFT JOIN users.name AS username, users.email AS email
      ON items.user_id = users._id
      WHERE user_id = $1 AND title LIKE $2 OR content LIKE $2
      ORDER BY $3
      OFFSET $4
      LIMIT $5;
  `,

  findItemByUser: `--sql
    SELECT * FROM items
      LEFT JOIN users
      ON items.user_id = users._id
      WHERE users._id = $1 AND items._id = $2;
  `,

  createItem: `--sql
    INSERT INTO items (title, content)
      VALUES ($1, $2)
      RETURNING *;
  `,

  updateItem: `--sql
    UPDATE items
      SET title = $1, content = $2, modified_time = CURRENT_TIMESTAMP
      WHERE _id = $3
      RETURNING *;
  `,

  deleteItem: `--sql
    DELETE FROM items
      WHERE _id = $1
      RETURNING *;
  `,
}
