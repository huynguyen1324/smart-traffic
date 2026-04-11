package com.example.smarttraffic.ui.quiz

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.home.HomeActivity
import com.example.smarttraffic.ui.profile.ProfileActivity

class QuizPracticeActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_quiz)

        // 1. Quiz Luật
        findViewById<View>(R.id.cardTopicLaw).setOnClickListener {
            val intent = Intent(this, QuizCategoryActivity::class.java)
            intent.putExtra("type", "Law")
            startActivity(intent)
        }

        // 2. Quiz Biển báo
        findViewById<View>(R.id.cardTopicSign).setOnClickListener {
            val intent = Intent(this, QuizCategoryActivity::class.java)
            intent.putExtra("type", "Sign")
            startActivity(intent)
        }

        // 3. Điều hướng
        findViewById<View>(R.id.btnBack).setOnClickListener {
            com.example.smarttraffic.util.NavigationHelper.navigateTo(this, com.example.smarttraffic.ui.home.HomeActivity::class.java, true)
        }
        com.example.smarttraffic.util.NavigationHelper.setupBottomNav(this, -1)
    }
}