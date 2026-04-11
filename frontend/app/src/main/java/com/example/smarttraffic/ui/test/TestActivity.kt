package com.example.smarttraffic.ui.test

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.QuizQuestionDto
import com.example.smarttraffic.network.QuizApiService
import com.example.smarttraffic.network.RetrofitClient
import com.google.android.material.button.MaterialButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class TestActivity : AppCompatActivity() {

    private var questions: List<QuizQuestionDto> = emptyList()
    private var currentQuestionIndex = 0
    private var userAnswers = mutableMapOf<Int, String>() // questionIndex -> chosenOption (A, B, C, D)
    private var license: String = "B2"
    private var testId: Int = -1

    private lateinit var tvIndex: TextView
    private lateinit var tvQuestion: TextView
    private lateinit var imgQuestion: ImageView
    private lateinit var cardImage: View
    private lateinit var radioGroup: RadioGroup
    private lateinit var btnOptionA: RadioButton
    private lateinit var btnOptionB: RadioButton
    private lateinit var btnOptionC: RadioButton
    private lateinit var btnOptionD: RadioButton
    private lateinit var tvTimer: TextView
    private lateinit var progressBar: ProgressBar
    private lateinit var btnNext: MaterialButton
    private lateinit var btnPrev: MaterialButton
    private lateinit var btnSubmit: MaterialButton

    private var countDownTimer: android.os.CountDownTimer? = null
    private val EXAM_TIME_MILLIS: Long = 20 * 60 * 1000 // 20 Phút cho cả A1 và B2

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_test_detail)

        testId = intent.getIntExtra("TEST_ID", -1)
        license = intent.getStringExtra("LICENSE") ?: "B2"

        initViews()
        loadQuestions(license, testId)

        findViewById<View>(R.id.btnBack).setOnClickListener { 
            showExitConfirmation() 
        }
    }

    private fun initViews() {
        tvIndex = findViewById(R.id.tvQuestionIndex)
        tvQuestion = findViewById(R.id.tvQuestion)
        imgQuestion = findViewById(R.id.imgQuestion)
        cardImage = findViewById(R.id.cardImage)
        radioGroup = findViewById(R.id.radioGroup)
        btnOptionA = findViewById(R.id.btnOptionA)
        btnOptionB = findViewById(R.id.btnOptionB)
        btnOptionC = findViewById(R.id.btnOptionC)
        btnOptionD = findViewById(R.id.btnOptionD)
        progressBar = findViewById(R.id.progressBar)
        tvTimer = findViewById(R.id.tvTimer)
        btnNext = findViewById(R.id.btnNext)
        btnPrev = findViewById(R.id.btnPrev)
        btnSubmit = findViewById(R.id.btnSubmit)

        btnNext.setOnClickListener {
            saveCurrentAnswer()
            if (currentQuestionIndex < questions.size - 1) {
                currentQuestionIndex++
                displayQuestion()
            } else {
                showSubmitConfirmation()
            }
        }

        btnPrev.setOnClickListener {
            saveCurrentAnswer()
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--
                displayQuestion()
            }
        }

        btnSubmit.setOnClickListener {
            saveCurrentAnswer()
            showSubmitConfirmation()
        }

        radioGroup.setOnCheckedChangeListener { _, checkedId ->
            // Optionally auto-save or just wait for Next/Submit
        }
    }

    private fun loadQuestions(license: String, testId: Int) {
        val api = RetrofitClient.retrofit.create(QuizApiService::class.java)
        api.getQuestionsByTest(license, testId).enqueue(object : Callback<List<QuizQuestionDto>> {
            override fun onResponse(call: Call<List<QuizQuestionDto>>, response: Response<List<QuizQuestionDto>>) {
                if (response.isSuccessful && response.body() != null) {
                    questions = response.body()!!
                    progressBar.max = questions.size
                    displayQuestion()
                    startTimer()
                } else {
                    Toast.makeText(this@TestActivity, "Không thể tải câu hỏi", Toast.LENGTH_SHORT).show()
                    finish()
                }
            }

            override fun onFailure(call: Call<List<QuizQuestionDto>>, t: Throwable) {
                Toast.makeText(this@TestActivity, "Lỗi kết nối mạng", Toast.LENGTH_SHORT).show()
                finish()
            }
        })
    }

    private fun displayQuestion() {
        if (questions.isEmpty()) return

        val q = questions[currentQuestionIndex]
        tvIndex.text = "Câu ${currentQuestionIndex + 1}/${questions.size}"
        tvQuestion.text = q.description_text
        progressBar.progress = currentQuestionIndex + 1

        if (!q.image_url.isNullOrEmpty()) {
            cardImage.visibility = View.VISIBLE
            val fullUrl = com.example.smarttraffic.network.RetrofitClient.IMAGE_URL_BASE + q.image_url
            Glide.with(this).load(fullUrl).into(imgQuestion)
        } else {
            cardImage.visibility = View.GONE
        }

        btnOptionA.text = q.option_a
        btnOptionB.text = q.option_b
        btnOptionC.text = q.option_c
        btnOptionD.text = q.option_d

        // Check/Uncheck D
        btnOptionC.visibility = if (q.option_c.isNullOrEmpty()) View.GONE else View.VISIBLE
        btnOptionD.visibility = if (q.option_d.isNullOrEmpty()) View.GONE else View.VISIBLE

        // Restore previous answer
        radioGroup.clearCheck()
        val previousAnswer = userAnswers[currentQuestionIndex]
        when (previousAnswer) {
            "A" -> btnOptionA.isChecked = true
            "B" -> btnOptionB.isChecked = true
            "C" -> btnOptionC.isChecked = true
            "D" -> btnOptionD.isChecked = true
        }

        // Update button text
        btnNext.text = if (currentQuestionIndex == questions.size - 1) "Nộp bài" else "Câu sau"
        btnPrev.alpha = if (currentQuestionIndex == 0) 0.5f else 1.0f
        btnPrev.isEnabled = currentQuestionIndex > 0
    }

    private fun saveCurrentAnswer() {
        val selectedId = radioGroup.checkedRadioButtonId
        if (selectedId != -1) {
            val option = when (selectedId) {
                R.id.btnOptionA -> "A"
                R.id.btnOptionB -> "B"
                R.id.btnOptionC -> "C"
                R.id.btnOptionD -> "D"
                else -> ""
            }
            userAnswers[currentQuestionIndex] = option
        }
    }

    private fun showSubmitConfirmation() {
        val unansweredCount = questions.size - userAnswers.size
        val message = if (unansweredCount > 0) {
            "Bạn còn $unansweredCount câu chưa trả lời. Bạn chắc chắn muốn nộp bài?"
        } else {
            "Bạn đã hoàn thành tất cả câu hỏi. Bạn muốn nộp bài ngay?"
        }

        AlertDialog.Builder(this)
            .setTitle("Nộp bài thi")
            .setMessage(message)
            .setPositiveButton("Nộp bài") { _, _ -> processResults() }
            .setNegativeButton("Tiếp tục làm", null)
            .show()
    }

    private fun showExitConfirmation() {
        AlertDialog.Builder(this)
            .setTitle("Thoát bài thi")
            .setMessage("Tiến độ bài thi sẽ không được lưu. Bạn có chắc chắn muốn thoát?")
            .setPositiveButton("Thoát") { _, _ -> finish() }
            .setNegativeButton("Ở lại", null)
            .show()
    }

    override fun onDestroy() {
        super.onDestroy()
        countDownTimer?.cancel()
    }

    private fun startTimer() {
        countDownTimer?.cancel()
        countDownTimer = object : android.os.CountDownTimer(EXAM_TIME_MILLIS, 1000) {
            override fun onTick(millisUntilFinished: Long) {
                val minutes = (millisUntilFinished / 1000) / 60
                val seconds = (millisUntilFinished / 1000) % 60
                tvTimer.text = String.format("%02d:%02d", minutes, seconds)

                // Cảnh báo khi còn dưới 1 phút (chữ đỏ nhấp nháy hoặc hiệu ứng khác có thể thêm sau)
            }

            override fun onFinish() {
                tvTimer.text = "00:00"
                Toast.makeText(this@TestActivity, "Hết giờ làm bài!", Toast.LENGTH_LONG).show()
                processResults()
            }
        }.start()
    }

    private fun processResults() {
        countDownTimer?.cancel()
        var correctCount = 0
        questions.forEachIndexed { index, q ->
            val userAns = userAnswers[index]
            if (userAns == q.correct_option) {
                correctCount++
            }
        }

        val unansweredCount = questions.size - userAnswers.size
        val wrongCount = questions.size - correctCount - unansweredCount

        // --- SAVE TO BACKEND ---
        saveToDatabase(correctCount, wrongCount, unansweredCount)

        val intent = Intent(this, TestResultActivity::class.java)
        intent.putExtra("CORRECT_COUNT", correctCount)
        intent.putExtra("WRONG_COUNT", wrongCount)
        intent.putExtra("UNANSWERED_COUNT", unansweredCount)
        intent.putExtra("TOTAL_COUNT", questions.size)
        startActivity(intent)
        finish()
    }

    private fun saveToDatabase(correct: Int, wrong: Int, unanswered: Int) {
        val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
        val userId = sharedPref.getInt("USER_ID", -1)
        
        if (userId == -1) return

        val api = RetrofitClient.retrofit.create(QuizApiService::class.java)
        val resultDto = com.example.smarttraffic.dto.TestResultDto(
            user_id = userId,
            test_id = testId,
            license = license.uppercase(),
            total = questions.size,
            correct = correct,
            wrong = wrong,
            unanswered = unanswered
        )

        api.saveTestResult(resultDto).enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                // Success - Also tick streak
                api.tickStreak(userId).enqueue(object : Callback<com.example.smarttraffic.dto.StreakDto> {
                    override fun onResponse(call: Call<com.example.smarttraffic.dto.StreakDto>, resp: Response<com.example.smarttraffic.dto.StreakDto>) {}
                    override fun onFailure(call: Call<com.example.smarttraffic.dto.StreakDto>, t: Throwable) {}
                })
            }
            override fun onFailure(call: Call<Void>, t: Throwable) {
                // Error - Log or ignore
            }
        })
    }
}
