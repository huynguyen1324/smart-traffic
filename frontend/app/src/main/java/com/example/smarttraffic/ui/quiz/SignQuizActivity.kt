package com.example.smarttraffic.ui.quiz

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.RadioButton
import android.widget.RadioGroup
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.QuizQuestionDto
import com.example.smarttraffic.repository.QuizApiRepository
import com.google.android.material.button.MaterialButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SignQuizActivity : AppCompatActivity() {

    private val repository = QuizApiRepository()
    private var questions: List<QuizQuestionDto> = emptyList()
    private var currentQuestionIndex = 0
    
    // Đếm điểm chi tiết
    private var correctAnswersCount = 0
    private var lawCorrect = 0
    private var signCorrect = 0
    private var isAnswerChecked = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_quiz_detail)

        findViewById<View>(R.id.btnBack)?.setOnClickListener { finish() }

        val mode = intent.getStringExtra("mode") ?: "exam"
        val license = intent.getStringExtra("license") ?: "b2"

        if (mode == "topic") {
            val type = intent.getStringExtra("type") ?: "Law"
            val categoryId = intent.getIntExtra("category_id", 1)
            loadQuestionsByTopic(license, type, categoryId)
        } else {
            loadAllQuestions(license)
        }

        findViewById<MaterialButton>(R.id.btnNext).setOnClickListener {
            if (!isAnswerChecked) {
                checkAnswer()
            } else {
                handleNextQuestion()
            }
        }
    }

    private fun loadAllQuestions(license: String) {
        repository.getAllQuestions(license).enqueue(object : Callback<List<QuizQuestionDto>> {
            override fun onResponse(call: Call<List<QuizQuestionDto>>, response: Response<List<QuizQuestionDto>>) {
                if (response.isSuccessful) {
                    questions = response.body() ?: emptyList()
                    displayQuestion()
                }
            }
            override fun onFailure(call: Call<List<QuizQuestionDto>>, t: Throwable) {
                Toast.makeText(this@SignQuizActivity, "Lỗi kết nối Backend", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun loadQuestionsByTopic(license: String, type: String, categoryId: Int) {
        repository.getQuestionsByTypeAndCategory(license, type, categoryId).enqueue(object : Callback<List<QuizQuestionDto>> {
            override fun onResponse(call: Call<List<QuizQuestionDto>>, response: Response<List<QuizQuestionDto>>) {
                if (response.isSuccessful) {
                    questions = response.body() ?: emptyList()
                    displayQuestion()
                }
            }
            override fun onFailure(call: Call<List<QuizQuestionDto>>, t: Throwable) {
                Toast.makeText(this@SignQuizActivity, "Lỗi tải câu hỏi theo chủ đề", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun displayQuestion() {
        if (questions.isEmpty() || currentQuestionIndex >= questions.size) return

        isAnswerChecked = false
        val q = questions[currentQuestionIndex]
        
        findViewById<TextView>(R.id.tvQuestionIndex).text = "Câu hỏi ${currentQuestionIndex + 1}/${questions.size}"
        findViewById<TextView>(R.id.tvQuestion).text = q.description_text ?: ""

        // Tải ảnh từ Backend (nếu có)
        val imgQuestion = findViewById<ImageView>(R.id.imgQuestion)
        if (!q.image_url.isNullOrEmpty()) {
            imgQuestion.visibility = View.VISIBLE
            Glide.with(this).load(q.image_url).into(imgQuestion)
        } else {
            imgQuestion.visibility = View.GONE
        }

        val btnA = findViewById<RadioButton>(R.id.btnOptionA)
        val btnB = findViewById<RadioButton>(R.id.btnOptionB)
        val btnC = findViewById<RadioButton>(R.id.btnOptionC)
        val btnD = findViewById<RadioButton>(R.id.btnOptionD)

        btnA.text = q.option_a ?: ""
        btnB.text = q.option_b ?: ""
        btnC.text = q.option_c ?: ""
        btnD.text = q.option_d ?: ""
        
        val radioGroup = findViewById<RadioGroup>(R.id.radioGroup)
        radioGroup.clearCheck()
        resetOptionColors(btnA, btnB, btnC, btnD)
        
        findViewById<MaterialButton>(R.id.btnNext).text = "Kiểm tra đáp án"
    }

    private fun checkAnswer() {
        val radioGroup = findViewById<RadioGroup>(R.id.radioGroup)
        val selectedId = radioGroup.checkedRadioButtonId
        
        if (selectedId == -1) {
            Toast.makeText(this, "Vui lòng chọn một đáp án!", Toast.LENGTH_SHORT).show()
            return
        }

        val q = questions[currentQuestionIndex]
        val selectedButton = findViewById<RadioButton>(selectedId)
        val selectedOption = when (selectedId) {
            R.id.btnOptionA -> "A"
            R.id.btnOptionB -> "B"
            R.id.btnOptionC -> "C"
            R.id.btnOptionD -> "D"
            else -> ""
        }

        if (selectedOption == q.correct_option) {
            selectedButton.setTextColor(Color.GREEN)
            correctAnswersCount++
            // Phân loại điểm
            if (q.type == "Law") lawCorrect++
            else if (q.type == "Sign") signCorrect++
        } else {
            selectedButton.setTextColor(Color.RED)
            showCorrectOption(q.correct_option)
        }

        isAnswerChecked = true
        findViewById<MaterialButton>(R.id.btnNext).text = "Tiếp theo"
    }

    private fun showCorrectOption(correct: String?) {
        when (correct) {
            "A" -> findViewById<RadioButton>(R.id.btnOptionA).setTextColor(Color.GREEN)
            "B" -> findViewById<RadioButton>(R.id.btnOptionB).setTextColor(Color.GREEN)
            "C" -> findViewById<RadioButton>(R.id.btnOptionC).setTextColor(Color.GREEN)
            "D" -> findViewById<RadioButton>(R.id.btnOptionD).setTextColor(Color.GREEN)
        }
    }

    private fun resetOptionColors(vararg buttons: RadioButton) {
        for (btn in buttons) {
            btn.setTextColor(Color.BLACK)
        }
    }

    private fun handleNextQuestion() {
        if (currentQuestionIndex < questions.size - 1) {
            currentQuestionIndex++
            displayQuestion()
        } else {
            // Chuyển sang trang kết quả với dữ liệu thật
            val intent = Intent(this, QuizResultActivity::class.java)
            intent.putExtra("score", correctAnswersCount)
            intent.putExtra("total", questions.size)
            intent.putExtra("law_correct", lawCorrect)
            intent.putExtra("sign_correct", signCorrect)
            startActivity(intent)
            finish()
        }
    }
}