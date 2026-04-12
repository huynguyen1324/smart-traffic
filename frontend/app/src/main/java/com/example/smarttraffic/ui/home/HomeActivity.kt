package com.example.smarttraffic.ui.home

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.assistant.AssistantActivity
import com.example.smarttraffic.ui.lesson.LawListActivity
import com.example.smarttraffic.ui.profile.ProfileActivity
import com.example.smarttraffic.ui.quiz.QuizMenuActivity
import com.example.smarttraffic.ui.sign.SignListActivity
import com.example.smarttraffic.ui.test.TestListActivity
import com.example.smarttraffic.util.NavigationHelper
import com.example.smarttraffic.ui.progress.ProgressActivity
import com.example.smarttraffic.ui.map.MapActivity
import android.widget.ImageView
import com.bumptech.glide.Glide
import com.example.smarttraffic.dto.UserDto
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.network.UserApiService
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import com.example.smarttraffic.network.QuizApiService
import com.example.smarttraffic.dto.StreakDto
import com.example.smarttraffic.dto.QuizStatsDto
import android.widget.ProgressBar

class HomeActivity : AppCompatActivity() {
    private lateinit var quizApi: QuizApiService
    private lateinit var userApi: UserApiService
    private var userId: Int = -1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
        userId = sharedPref.getInt("USER_ID", -1)

        // Khởi tạo API Services dùng chung
        quizApi = RetrofitClient.retrofit.create(QuizApiService::class.java)
        userApi = RetrofitClient.retrofit.create(UserApiService::class.java)

        if (userId != -1) {
            fetchUserInfo(userId)
            // fetchStreakHome và fetchQuizStatsHome sẽ được gọi trong onResume
        }

        // --- QUICK ACCESS CARDS ---
        findViewById<View>(R.id.cardLesson)?.setOnClickListener {
            startActivity(Intent(this, LawListActivity::class.java))
        }
        findViewById<View>(R.id.cardSign)?.setOnClickListener {
            startActivity(Intent(this, SignListActivity::class.java))
        }
        findViewById<View>(R.id.cardQuiz)?.setOnClickListener {
            startActivity(Intent(this, QuizMenuActivity::class.java))
        }
        findViewById<View>(R.id.cardExam)?.setOnClickListener {
            startActivity(Intent(this, TestListActivity::class.java))
        }
        findViewById<View>(R.id.cardMap)?.setOnClickListener {
            startActivity(Intent(this, MapActivity::class.java))
        }
        findViewById<View>(R.id.cardChatbot)?.setOnClickListener {
            startActivity(Intent(this, AssistantActivity::class.java))
        }
        
        // --- PROGRESS CARD CLICK ---
        findViewById<View>(R.id.cardProgress)?.setOnClickListener {
            startActivity(Intent(this, ProgressActivity::class.java))
        }

        // --- HEADER ---
        findViewById<View>(R.id.btnProfile)?.setOnClickListener {
            startActivity(Intent(this, ProfileActivity::class.java))
        }

        findViewById<View>(R.id.btnAssistant)?.setOnClickListener {
            startActivity(Intent(this, AssistantActivity::class.java))
        }

        // --- BOTTOM NAVIGATION ---
        NavigationHelper.setupBottomNav(this, R.id.navHome)
    }

    override fun onResume() {
        super.onResume()
        // Làm mới dữ liệu mỗi khi quay lại trang chủ
        if (userId != -1) {
            fetchStreakHome(userId)
            fetchQuizStatsHome(userId)
        }
    }

    private fun fetchUserInfo(userId: Int) {
        userApi.getUserById(userId).enqueue(object : Callback<UserDto> {
            override fun onResponse(call: Call<UserDto>, response: Response<UserDto>) {
                if (response.isSuccessful && response.body() != null) {
                    val user = response.body()!!
                    
                    // Hiển thị tên
                    val tvWelcome = findViewById<TextView>(R.id.tvWelcome)
                    val fullName = user.full_name ?: ""
                    if (fullName.isNotEmpty()) {
                        tvWelcome.text = "${fullName.split(" ").last()}!"
                    }

                    // Hiển thị avatar
                    val ivAvatar = findViewById<ImageView>(R.id.ivAvatar)
                    val avatarUrl = RetrofitClient.IMAGE_URL_BASE + "user_avatars/" + (user.avatar_url ?: "default-male.png")
                    Glide.with(this@HomeActivity)
                        .load(avatarUrl)
                        .placeholder(R.drawable.ic_loading_placeholder)
                        .error(R.drawable.ic_loading_placeholder)
                        .circleCrop()
                        .into(ivAvatar)
                }
            }
            override fun onFailure(call: Call<UserDto>, t: Throwable) {
                // Có thể log lỗi ở đây
            }
        })
    }

    private fun fetchStreakHome(userId: Int) {
        quizApi.getStreak(userId).enqueue(object : Callback<StreakDto> {
            override fun onResponse(call: Call<StreakDto>, response: Response<StreakDto>) {
                if (response.isSuccessful && response.body() != null) {
                    val streak = response.body()!!
                    findViewById<TextView>(R.id.tvStreakHome)?.text = "🔥 ${streak.current_streak}"
                }
            }
            override fun onFailure(call: Call<StreakDto>, t: Throwable) {}
        })
    }

    private fun fetchQuizStatsHome(userId: Int) {
        quizApi.getQuizStats(userId).enqueue(object : Callback<QuizStatsDto> {
            override fun onResponse(call: Call<QuizStatsDto>, response: Response<QuizStatsDto>) {
                if (response.isSuccessful && response.body() != null) {
                    val stats = response.body()!!
                    val totalQuestions = 600
                    
                    // Tính % hoàn thành thực tế: (số câu đã làm / tổng số câu) * 100
                    val progressPercent = if (totalQuestions > 0) (stats.total_done * 100 / totalQuestions) else 0
                    
                    findViewById<TextView>(R.id.tvProgressPercent)?.text = "Tiến độ học tập: $progressPercent%"
                    findViewById<TextView>(R.id.tvProgressCount)?.text = "${stats.total_done} / $totalQuestions câu"
                    
                    val progressBar = findViewById<ProgressBar>(R.id.progressBarHome)
                    progressBar?.apply {
                        max = totalQuestions
                        progress = stats.total_done
                    }
                }
            }
            override fun onFailure(call: Call<QuizStatsDto>, t: Throwable) {}
        })
    }
}