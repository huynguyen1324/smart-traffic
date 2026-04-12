package com.example.smarttraffic.ui.progress

import android.content.Context
import android.os.Bundle
import android.view.View
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.QuizStatsDto
import com.example.smarttraffic.network.QuizApiService
import com.example.smarttraffic.network.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ProgressActivity : AppCompatActivity() {
    private lateinit var quizApi: QuizApiService
    private var userId: Int = -1

    private lateinit var tvQuestionsDone: TextView
    private lateinit var progressBarQuestions: ProgressBar
    private lateinit var tvAccuracyPercent: TextView
    private lateinit var tvCorrectCount: TextView
    private lateinit var tvWrongCount: TextView
    private lateinit var layoutRecentTests: android.widget.LinearLayout
    private lateinit var tvNoTestData: TextView
    private lateinit var tvStreakCount: TextView
    private lateinit var tvLongestStreak: TextView
    private lateinit var tvTodayAdvice: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_progress)

        val sharedPref = getSharedPreferences("UserPrefs", Context.MODE_PRIVATE)
        userId = sharedPref.getInt("USER_ID", -1)
        quizApi = RetrofitClient.retrofit.create(QuizApiService::class.java)

        tvQuestionsDone = findViewById(R.id.tvQuestionsDone)
        progressBarQuestions = findViewById(R.id.progressBarQuestions)
        tvAccuracyPercent = findViewById(R.id.tvAccuracyPercent)
        tvCorrectCount = findViewById(R.id.tvCorrectCount)
        tvWrongCount = findViewById(R.id.tvWrongCount)
        layoutRecentTests = findViewById(R.id.layoutRecentTests)
        tvNoTestData = findViewById(R.id.tvNoTestData)
        tvStreakCount = findViewById(R.id.tvStreakCount)
        tvLongestStreak = findViewById(R.id.tvLongestStreak)
        tvTodayAdvice = findViewById(R.id.tvTodayAdvice)

        findViewById<View>(R.id.btnBack)?.setOnClickListener {
            finish()
        }

        loadProgressData()
        loadRecentTests()
        loadStreak()
    }
    private fun loadProgressData() {
        if (userId == -1) {
            Toast.makeText(this, "Vui lòng đăng nhập để xem tiến độ", Toast.LENGTH_SHORT).show()
            return
        }

        quizApi.getQuizStats(userId).enqueue(object : Callback<QuizStatsDto> {
            override fun onResponse(call: Call<QuizStatsDto>, response: Response<QuizStatsDto>) {
                if (response.isSuccessful && response.body() != null) {
                    val stats = response.body()!!
                    val totalQuestions = stats.total_questions
                    
                    tvQuestionsDone.text = "${stats.total_done} / $totalQuestions"
                    progressBarQuestions.max = totalQuestions
                    progressBarQuestions.progress = stats.total_done
                    
                    tvAccuracyPercent.text = "${stats.accuracy_rate}%"
                    
                    tvCorrectCount.text = "${stats.total_correct} đúng"
                    val wrongCount = stats.total_done - stats.total_correct
                    tvWrongCount.text = "${if (wrongCount > 0) wrongCount else 0} sai"

                    // Cập nhật lời khuyên sau khi có số liệu thống kê
                    updateAdvice(stats.total_correct, if (wrongCount > 0) wrongCount else 0, getIntFromTextView(tvStreakCount))
                }
            }

            override fun onFailure(call: Call<QuizStatsDto>, t: Throwable) {
                Toast.makeText(this@ProgressActivity, "Lỗi tải dữ liệu tiến độ", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun loadRecentTests() {
        if (userId == -1) return

        quizApi.getTestResultsByUser(userId).enqueue(object : Callback<List<com.example.smarttraffic.dto.TestResultDto>> {
            override fun onResponse(call: Call<List<com.example.smarttraffic.dto.TestResultDto>>, response: Response<List<com.example.smarttraffic.dto.TestResultDto>>) {
                if (response.isSuccessful && response.body() != null) {
                    val results = response.body()!!
                    if (results.isNotEmpty()) {
                        tvNoTestData.visibility = View.GONE
                        layoutRecentTests.removeAllViews()
                        
                        val recentResults = results.take(5) 
                        
                        val inflater = android.view.LayoutInflater.from(this@ProgressActivity)
                        val inputFormat = java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", java.util.Locale.getDefault())
                        val outputFormat = java.text.SimpleDateFormat("HH:mm, dd/MM/yyyy", java.util.Locale.getDefault())

                        recentResults.forEach { result ->
                            val itemView = inflater.inflate(R.layout.item_recent_test_row, layoutRecentTests, false)
                            val tvTitle = itemView.findViewById<TextView>(R.id.tvTestTitle)
                            val tvDate = itemView.findViewById<TextView>(R.id.tvTestDate)
                            val tvScore = itemView.findViewById<TextView>(R.id.tvTestScore)

                            tvTitle.text = "Đề thi sát hạch ${result.test_id ?: ""}"
                            
                            // Format date: HH:mm, dd/MM/yyyy
                            val dateStr = result.created_at
                            if (dateStr != null) {
                                try {
                                    val date = inputFormat.parse(dateStr)
                                    tvDate.text = outputFormat.format(date)
                                } catch (e: Exception) {
                                    tvDate.text = dateStr
                                }
                            } else {
                                tvDate.text = "Hạng bài: ${result.license}" 
                            }

                            tvScore.text = "${result.correct} / ${result.total}"
                            
                            layoutRecentTests.addView(itemView)
                        }
                    }
                }
            }

            override fun onFailure(call: Call<List<com.example.smarttraffic.dto.TestResultDto>>, t: Throwable) {}
        })
    }

    private fun loadStreak() {
        if (userId == -1) return

        quizApi.getStreak(userId).enqueue(object : Callback<com.example.smarttraffic.dto.StreakDto> {
            override fun onResponse(call: Call<com.example.smarttraffic.dto.StreakDto>, response: Response<com.example.smarttraffic.dto.StreakDto>) {
                if (response.isSuccessful && response.body() != null) {
                    val streak = response.body()!!
                    tvStreakCount.text = "${streak.current_streak} ngày"
                    tvLongestStreak.text = "${streak.longest_streak} ngày"
                    
                    updateAdvice(getIntFromTextView(tvCorrectCount), getIntFromTextView(tvWrongCount), streak.current_streak)
                }
            }

            override fun onFailure(call: Call<com.example.smarttraffic.dto.StreakDto>, t: Throwable) {}
        })
    }

    private fun updateAdvice(correct: Int, wrong: Int, streak: Int) {
        val adviceText = when {
            streak == 0 -> "Ối, chuỗi học tập của bạn đang bị đứt! Làm ngay một câu Quiz để lấy lại đà học tập nào. 🔥"
            wrong > correct -> "Bạn đang có số câu sai nhiều hơn câu đúng. Đừng lo, hãy chậm lại và đọc kỹ phần giải thích nhé! 💡"
            correct > 100 -> "Phong độ tuyệt vời! Bạn đã chinh phục được ${correct} câu hỏi. Duy trì tốc độ này để sớm lấy bằng nhé! 🏆"
            streak >= 3 -> "Bạn đã duy trì được ${streak} ngày liên tiếp! Rất ấn tượng, thói quen tốt chính là chìa khóa thành công. 🌟"
            else -> "Bạn đang đi đúng hướng rồi đấy! Hãy dành ra 15 phút mỗi ngày để ôn tập thêm phần biển báo nhé. 🚗"
        }
        tvTodayAdvice.text = adviceText
    }

    private fun getIntFromTextView(textView: TextView): Int {
        val text = textView.text.toString().filter { it.isDigit() }
        return text.toIntOrNull() ?: 0
    }
}