package com.example.smarttraffic.ui.quiz

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.home.HomeActivity
import com.example.smarttraffic.ui.profile.ProfileActivity

class ExamSelectionActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_exam_selection)

        // 1. Điều hướng
        findViewById<View>(R.id.btnBack).setOnClickListener { finish() }
        
        findViewById<View>(R.id.cardExamA1).setOnClickListener {
            startQuiz("exam", "a1")
        }

        findViewById<View>(R.id.cardExamB2).setOnClickListener {
            startQuiz("exam", "b2")
        }

        // Navigation Bar logic
        com.example.smarttraffic.util.NavigationHelper.setupBottomNav(this, -1)
    }

    private fun startQuiz(mode: String, license: String) {
        val intent = Intent(this, SignQuizActivity::class.java)
        intent.putExtra("mode", mode)
        intent.putExtra("license", license)
        startActivity(intent)
    }
}
