const pool = require("../config/db");

const getAllCategories = async () => {
  const [rows] = await pool.query(`
    SELECT id, name
    FROM law_categories
    ORDER BY id ASC
  `);
  return rows;
};

const getLawsByCategoryId = async (categoryId) => {
  const [rows] = await pool.query(`
    SELECT
      l.id,
      l.category_id,
      l.image_url,
      l.title,
      l.description,
      l.rules,
      l.warnings,
      lc.name AS category_name
    FROM laws l
    LEFT JOIN law_categories lc ON l.category_id = lc.id
    WHERE l.category_id = ?
    ORDER BY l.id ASC
  `, [categoryId]);

  return rows;
};

const getLawById = async (id) => {
  const [rows] = await pool.query(`
    SELECT
      l.id,
      l.category_id,
      l.image_url,
      l.title,
      l.description,
      l.rules,
      l.warnings,
      lc.name AS category_name
    FROM laws l
    LEFT JOIN law_categories lc ON l.category_id = lc.id
    WHERE l.id = ?
    LIMIT 1
  `, [id]);

  return rows[0] || null;
};

module.exports = {
  getAllCategories,
  getLawsByCategoryId,
  getLawById
};