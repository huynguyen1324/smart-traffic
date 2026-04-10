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
import com.example.smarttraffic.ui.quiz.ExamSelectionActivity
import com.example.smarttraffic.ui.quiz.QuizPracticeActivity
import com.example.smarttraffic.ui.search.SearchActivity
import com.example.smarttraffic.ui.sign.SignListActivity
import com.example.smarttraffic.ui.simulation.SimulationListActivity
import com.example.smarttraffic.util.NavigationHelper
import android.widget.ImageView
import com.bumptech.glide.Glide
import com.example.smarttraffic.dto.UserDto
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.network.UserApiService
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
        val userId = sharedPref.getInt("USER_ID", -1)

        if (userId != -1) {
            fetchUserInfo(userId)
        }

        // --- QUICK ACCESS CARDS ---
        findViewById<View>(R.id.cardLesson)?.setOnClickListener {
            startActivity(Intent(this, LawListActivity::class.java))
        }
        findViewById<View>(R.id.cardSign)?.setOnClickListener {
            startActivity(Intent(this, SignListActivity::class.java))
        }
        findViewById<View>(R.id.cardSimulation)?.setOnClickListener {
            startActivity(Intent(this, SimulationListActivity::class.java))
        }
        findViewById<View>(R.id.cardQuiz)?.setOnClickListener {
            startActivity(Intent(this, QuizPracticeActivity::class.java))
        }
        findViewById<View>(R.id.cardExam)?.setOnClickListener {
            startActivity(Intent(this, ExamSelectionActivity::class.java))
        }
        findViewById<View>(R.id.cardMap)?.setOnClickListener {
            // Có thể thêm MapActivity sau
        }

        // --- HEADER ---
        findViewById<View>(R.id.btnProfile)?.setOnClickListener {
            startActivity(Intent(this, ProfileActivity::class.java))
        }
        findViewById<View>(R.id.btnSearch)?.setOnClickListener {
            startActivity(Intent(this, SearchActivity::class.java))
        }
        findViewById<View>(R.id.btnAssistant)?.setOnClickListener {
            startActivity(Intent(this, AssistantActivity::class.java))
        }

        // --- BOTTOM NAVIGATION ---
        NavigationHelper.setupBottomNav(this, R.id.navHome)
    }

    private fun fetchUserInfo(userId: Int) {
        val apiService = RetrofitClient.retrofit.create(UserApiService::class.java)
        apiService.getUserById(userId).enqueue(object : Callback<UserDto> {
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
}