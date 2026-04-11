const pool = require("../config/db");

const getQuestionTable = (license) => {
  const l = (license || "").toLowerCase();
  if (l === "a1") return "a1_250_questions";
  if (l === "b2") return "b2_600_questions";
  throw new Error("Invalid license type: " + license);
};

// ===== NEW =====

// lấy danh sách bộ đề
const getTestList = async (license) => {
  const table = (license || "").toLowerCase() === "a1" ? "a1_tests" : "b2_tests";

  const [rows] = await pool.query(`
    SELECT * FROM ${table}
    ORDER BY id ASC
  `);

  return rows;
};

// lấy câu hỏi theo bộ đề
const getQuestionsByTest = async (license, test_id) => {
  const table = getQuestionTable(license);

  const [rows] = await pool.query(`
    SELECT
      id,
      type,
      type_category_id,
      test_id,
      image_url,
      description_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option,
      explanation
    FROM ${table}
    WHERE test_id = ?
    ORDER BY id ASC
  `, [test_id]);

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

const getQuestionsByTypeAndCategory = async (license, type, type_category_id) => {
  const table = getQuestionTable(license);

  const [rows] = await pool.query(`
    SELECT * FROM ${table}
    WHERE type = ? AND type_category_id = ?
    ORDER BY id ASC
  `, [type, type_category_id]);

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

const submitQuizResult = async (user_id, answers) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.query(`
      INSERT INTO test_results (user_id)
      VALUES (?)
    `, [user_id]);

    const test_result_id = result.insertId;

    for (const answer of answers) {
      await connection.query(`
        INSERT INTO test_result_detail (
          test_result_id,
          question_id,
          chosen_option,
          correct
        ) VALUES (?, ?, ?, ?)
      `, [
        test_result_id,
        answer.question_id,
        answer.chosen_option,
        answer.correct
      ]);
    }

    await connection.commit();

    return {
      test_result_id: test_result_id,
      total_answers: answers.length
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const saveQuizDetail = async (user_id, license, question_id, chosen_option, correct) => {
  // correct là boolean, MySQL lưu là 0/1 (tinyint)
  const [result] = await pool.query(`
    INSERT INTO quiz_results_detail (user_id, license, question_id, chosen_option, correct)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      chosen_option = VALUES(chosen_option),
      correct = VALUES(correct)
  `, [user_id, license, question_id, chosen_option, correct]);

  return result;
};

const getQuizStats = async (user_id) => {
  // Lấy mục tiêu học của user để biết dùng bảng nào
  const [userRows] = await pool.query('SELECT learning_goal FROM users WHERE id = ?', [user_id]);
  if (!userRows.length) throw new Error("User not found");
  
  const license = userRows[0].learning_goal || 'a1';
  const table = getQuestionTable(license);

  const [rows] = await pool.query(`
    SELECT 
      COUNT(qrd.question_id) as total_done,
      SUM(CASE WHEN qrd.correct = 1 THEN 1 ELSE 0 END) as total_correct
    FROM quiz_results_detail qrd
    WHERE qrd.user_id = ? AND qrd.license = ?
  `, [user_id, license]);

  const stats = rows[0];
  const total_done = stats.total_done || 0;
  const total_correct = stats.total_correct || 0;
  const accuracy_rate = total_done > 0 ? (total_correct / total_done) * 100 : 0;
  const total_questions = license.toLowerCase() === 'a1' ? 250 : 600;

  return {
    total_done,
    total_correct,
    accuracy_rate: Math.round(accuracy_rate * 10) / 10,
    total_questions
  };
};

const getQuizDetails = async (user_id) => {
  // Lấy mục tiêu học của user để biết dùng bảng nào
  const [userRows] = await pool.query('SELECT learning_goal FROM users WHERE id = ?', [user_id]);
  if (!userRows.length) throw new Error("User not found");
  
  const license = userRows[0].learning_goal || 'a1';
  const table = getQuestionTable(license);

  const [rows] = await pool.query(`
    SELECT qrd.question_id, CAST(qrd.correct AS UNSIGNED) as correct
    FROM quiz_results_detail qrd
    WHERE qrd.user_id = ? AND qrd.license = ?
  `, [user_id, license]);

  return rows;
};

module.exports = {
  getTestList,
  getQuestionsByTest,
  getAllQuestions,
  getQuestionsByType,
  getQuestionsByTypeAndCategory,
  getQuestionById,
  submitQuizResult,
  saveQuizDetail,
  getQuizStats,
  getQuizDetails
};
