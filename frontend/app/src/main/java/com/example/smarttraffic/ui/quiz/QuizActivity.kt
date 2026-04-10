package com.example.smarttraffic.ui.quiz

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.ProgressBar
import android.widget.RadioButton
import android.widget.RadioGroup
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.QuizQuestionDto
import com.example.smarttraffic.network.QuizApiService
import com.example.smarttraffic.network.RetrofitClient
import com.google.android.material.button.MaterialButton
import com.google.android.material.card.MaterialCardView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class QuizActivity : AppCompatActivity() {

    private var questions: List<QuizQuestionDto> = emptyList()
    private var currentIndex = 0
    private var correctCount = 0
    private var userAnswers = mutableMapOf<Int, String>()

    private lateinit var tvCategoryName: TextView
    private lateinit var tvQuestionIndex: TextView
    private lateinit var btnSubmit: MaterialButton
    private lateinit var progressBar: ProgressBar
    private lateinit var tvQuestion: TextView
    private lateinit var imgQuestion: ImageView
    private lateinit var cardImage: MaterialCardView
    private lateinit var cardExplanation: MaterialCardView
    private lateinit var tvExplanation: TextView
    private lateinit var radioGroup: RadioGroup
    private lateinit var btnOptionA: RadioButton
    private lateinit var btnOptionB: RadioButton
    private lateinit var btnOptionC: RadioButton
    private lateinit var btnOptionD: RadioButton
    private lateinit var btnPrev: MaterialButton
    private lateinit var btnNext: MaterialButton

    private var license: String = "b2"
    private var type: String = "Law"
    private var categoryId: Int = -1
    private var categoryName: String = "Luyện tập"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_quiz_detail)

        license = intent.getStringExtra("license") ?: "b2"
        type = intent.getStringExtra("type") ?: "Law"
        categoryId = intent.getIntExtra("category_id", -1)
        categoryName = intent.getStringExtra("category_name") ?: "Luyện tập"

        bindViews()

        tvCategoryName.text = categoryName

        findViewById<View>(R.id.btnBack).setOnClickListener { finish() }
        btnSubmit.setOnClickListener { finishQuiz() }

        btnPrev.setOnClickListener { navigatePrev() }
        btnNext.setOnClickListener { navigateNext() }

        setupOptionClickListeners()
        loadQuestions()
    }

    private fun bindViews() {
        tvCategoryName = findViewById(R.id.tvCategoryName)
        tvQuestionIndex = findViewById(R.id.tvQuestionIndex)
        btnSubmit = findViewById(R.id.btnSubmitLayout)
        progressBar = findViewById(R.id.progressBar)
        tvQuestion = findViewById(R.id.tvQuestion)
        imgQuestion = findViewById(R.id.imgQuestion)
        cardImage = findViewById(R.id.cardImage)
        cardExplanation = findViewById(R.id.cardExplanation)
        tvExplanation = findViewById(R.id.tvExplanation)
        radioGroup = findViewById(R.id.radioGroup)
        btnOptionA = findViewById(R.id.btnOptionA)
        btnOptionB = findViewById(R.id.btnOptionB)
        btnOptionC = findViewById(R.id.btnOptionC)
        btnOptionD = findViewById(R.id.btnOptionD)
        btnPrev = findViewById(R.id.btnPrev)
        btnNext = findViewById(R.id.btnNext)
    }

    private fun setupOptionClickListeners() {
        val options = listOf(btnOptionA to "A", btnOptionB to "B", btnOptionC to "C", btnOptionD to "D")
        options.forEach { (btn, option) ->
            btn.setOnClickListener {
                if (!userAnswers.containsKey(currentIndex)) {
                    checkAnswer(option)
                }
            }
        }
    }

    private fun loadQuestions() {
        tvQuestion.text = "Đang tải dữ liệu..."
        val api = RetrofitClient.retrofit.create(QuizApiService::class.java)
        val call = if (categoryId != -1) {
            api.getQuestionsByTypeAndCategory(license, type, categoryId)
        } else {
            api.getQuestionsByType(license, type)
        }

        call.enqueue(object : Callback<List<QuizQuestionDto>> {
            override fun onResponse(call: Call<List<QuizQuestionDto>>, response: Response<List<QuizQuestionDto>>) {
                if (response.isSuccessful) {
                    val body = response.body()
                    if (body != null && body.isNotEmpty()) {
                        questions = body
                        displayQuestion()
                    } else {
                        tvQuestion.text = "Không có câu hỏi nào trong database."
                    }
                } else {
                    tvQuestion.text = "Lỗi Server: ${response.code()}"
                }
            }
            override fun onFailure(call: Call<List<QuizQuestionDto>>, t: Throwable) {
                tvQuestion.text = "Lỗi kết nối: ${t.message}"
            }
        })
    }

    private fun displayQuestion() {
        if (questions.isEmpty() || currentIndex >= questions.size) return

        val q = questions[currentIndex]

        tvQuestionIndex.text = "${currentIndex + 1}/${questions.size}"
        progressBar.max = questions.size
        progressBar.progress = currentIndex + 1

        tvQuestion.text = q.description_text ?: "Thiếu nội dung câu hỏi"

        if (!q.image_url.isNullOrEmpty()) {
            cardImage.visibility = View.VISIBLE
            Glide.with(this)
                .load(RetrofitClient.IMAGE_URL_BASE + q.image_url)
                .into(imgQuestion)
        } else {
            cardImage.visibility = View.GONE
        }

        btnOptionA.text = "A. ${q.option_a?.trim() ?: ""}"
        btnOptionB.text = "B. ${q.option_b?.trim() ?: ""}"
        btnOptionC.text = "C. ${q.option_c?.trim() ?: ""}"
        btnOptionD.text = "D. ${q.option_d?.trim() ?: ""}"

        btnOptionC.visibility = if (q.option_c?.trim().isNullOrEmpty()) View.GONE else View.VISIBLE
        btnOptionD.visibility = if (q.option_d?.trim().isNullOrEmpty()) View.GONE else View.VISIBLE

        resetOptionStyles()

        if (userAnswers.containsKey(currentIndex)) {
            val chosen = userAnswers[currentIndex]!!
            showAnswerFeedback(chosen, q.correct_option ?: "")
        } else {
            cardExplanation.visibility = View.GONE
            radioGroup.clearCheck()
        }

        // Câu đầu: btnPrev vẫn hiển thị nhưng mờ đi và không nhận sự kiện
        btnPrev.isEnabled = currentIndex > 0
        btnPrev.alpha = if (currentIndex == 0) 0.35f else 1.0f
        btnNext.text = if (currentIndex == questions.size - 1) "Kết thúc" else "Câu sau"
    }

    private fun checkAnswer(selectedOption: String) {
        val q = questions[currentIndex]
        userAnswers[currentIndex] = selectedOption

        if (selectedOption == q.correct_option) {
            correctCount++
        }

        showAnswerFeedback(selectedOption, q.correct_option ?: "")
    }

    private fun showAnswerFeedback(selectedOption: String, correctOption: String) {
        val isCorrect = selectedOption == correctOption

        val selectedBtn = when (selectedOption) {
            "A" -> btnOptionA
            "B" -> btnOptionB
            "C" -> btnOptionC
            "D" -> btnOptionD
            else -> null
        }
        selectedBtn?.isChecked = true
        selectedBtn?.setBackgroundResource(if (isCorrect) R.drawable.bg_option_correct else R.drawable.bg_option_wrong)

        if (!isCorrect) {
            val correctBtn = when (correctOption) {
                "A" -> btnOptionA
                "B" -> btnOptionB
                "C" -> btnOptionC
                "D" -> btnOptionD
                else -> null
            }
            correctBtn?.setBackgroundResource(R.drawable.bg_option_correct)
        }

        val q = questions[currentIndex]
        if (!q.explanation.isNullOrEmpty()) {
            tvExplanation.text = "💡 ${q.explanation}"
            cardExplanation.visibility = View.VISIBLE
        }
    }

    private fun navigatePrev() {
        if (currentIndex > 0) {
            currentIndex--
            displayQuestion()
        }
    }

    private fun navigateNext() {
        if (currentIndex < questions.size - 1) {
            currentIndex++
            displayQuestion()
        } else {
            finishQuiz()
        }
    }

    private fun finishQuiz() {
        val intent = Intent(this, QuizResultActivity::class.java)
        intent.putExtra("score", correctCount)
        intent.putExtra("total", questions.size)
        intent.putExtra("license", license)
        intent.putExtra("type", type)
        intent.putExtra("category_id", categoryId)
        intent.putExtra("category_name", categoryName)
        startActivity(intent)
        finish()
    }

    private fun resetOptionStyles() {
        listOf(btnOptionA, btnOptionB, btnOptionC, btnOptionD).forEach {
            it.setBackgroundResource(R.drawable.bg_option_normal)
            it.setTextColor(Color.parseColor("#0F172A"))
        }
    }
}