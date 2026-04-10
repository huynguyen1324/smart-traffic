const pool = require("../config/db");

const getAllCategories = async () => {
  const [rows] = await pool.query(`
    SELECT id, name
    FROM sign_categories
    ORDER BY id ASC
  `);
  return rows;
};

const getSignsByCategoryId = async (categoryId) => {
  const [rows] = await pool.query(`
    SELECT 
      s.id,
      s.category_id,
      s.image_url,
      s.title,
      s.sign_code,
      s.description,
      sc.name AS category_name
    FROM signs s
    LEFT JOIN sign_categories sc ON s.category_id = sc.id
    WHERE s.category_id = ?
    ORDER BY s.id ASC
  `, [categoryId]);

  return rows;
};

const getSignById = async (id) => {
  const [rows] = await pool.query(`
    SELECT 
      s.id,
      s.category_id,
      s.image_url,
      s.title,
      s.sign_code,
      s.description,
      sc.name AS category_name
    FROM signs s
    LEFT JOIN sign_categories sc ON s.category_id = sc.id
    WHERE s.id = ?
    LIMIT 1
  `, [id]);

  return rows[0] || null;
};

module.exports = {
  getAllCategories,
  getSignsByCategoryId,
  getSignById
};