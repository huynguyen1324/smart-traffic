const pool = require("../config/db");

const getQuestionTable = (license) => {
  if (license === "a1") return "a1_250_questions";
  if (license === "b2") return "b2_600_questions";
  throw new Error("Invalid license type");
};

// ===== NEW =====

// lấy danh sách bộ đề
const getTestList = async (license) => {
  const table = getQuestionTable(license);

  const [rows] = await pool.query(`
    SELECT DISTINCT test_number
    FROM ${table}
    ORDER BY test_number ASC
  `);

  return rows;
};

// lấy câu hỏi theo bộ đề
const getQuestionsByTest = async (license, testNumber) => {
  const table = getQuestionTable(license);

  const [rows] = await pool.query(`
    SELECT
      id,
      type,
      type_category_id,
      test_number,
      image_url,
      description_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option,
      explanation
    FROM ${table}
    WHERE test_number = ?
    ORDER BY id ASC
  `, [testNumber]);

  return rows;
};

// ===== EXISTING =====

const getAllQuestions = async (license) => {
  const table = getQuestionTable(license);

  const [rows] = await pool.query(`
    SELECT * FROM ${table}
    ORDER BY id ASC
  `);

  return rows;
};

const getQuestionsByType = async (license, type) => {
  const table = getQuestionTable(license);

  const [rows] = await pool.query(`
    SELECT * FROM ${table}
    WHERE type = ?
    ORDER BY id ASC
  `, [type]);

  return rows;
};

const getQuestionsByTypeAndCategory = async (license, type, categoryId) => {
  const table = getQuestionTable(license);

  const [rows] = await pool.query(`
    SELECT * FROM ${table}
    WHERE type = ? AND type_category_id = ?
    ORDER BY id ASC
  `, [type, categoryId]);

  return rows;
};

const getQuestionById = async (license, id) => {
  const table = getQuestionTable(license);

  const [rows] = await pool.query(`
    SELECT * FROM ${table}
    WHERE id = ?
    LIMIT 1
  `, [id]);

  return rows[0] || null;
};

const submitQuizResult = async (userId, answers) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.query(`
      INSERT INTO test_results (user_id)
      VALUES (?)
    `, [userId]);

    const testResultId = result.insertId;

    for (const answer of answers) {
      await connection.query(`
        INSERT INTO test_result_detail (
          test_result_id,
          question_id,
          chosen_option,
          correct
        ) VALUES (?, ?, ?, ?)
      `, [
        testResultId,
        answer.question_id,
        answer.chosen_option,
        answer.correct
      ]);
    }

    await connection.commit();

    return {
      test_result_id: testResultId,
      total_answers: answers.length
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  getTestList,
  getQuestionsByTest,
  getAllQuestions,
  getQuestionsByType,
  getQuestionsByTypeAndCategory,
  getQuestionById,
  submitQuizResult
};