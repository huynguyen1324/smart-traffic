package com.example.smarttraffic.ui.quiz

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.home.HomeActivity
import com.example.smarttraffic.util.QuizConstants

class QuizMenuActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_quiz_menu)

        // 1. Quiz Luật
        findViewById<View>(R.id.cardTopicLaw).setOnClickListener {
            val intent = Intent(this, QuizCategoryActivity::class.java)
            intent.putExtra(QuizConstants.KEY_TYPE, QuizConstants.TYPE_LAW)
            startActivity(intent)
        }

        // 2. Quiz Biển báo
        findViewById<View>(R.id.cardTopicSign).setOnClickListener {
            val intent = Intent(this, QuizCategoryActivity::class.java)
            intent.putExtra(QuizConstants.KEY_TYPE, QuizConstants.TYPE_SIGN)
            startActivity(intent)
        }

        // 3. Quiz tình huống
        findViewById<View>(R.id.cardTopicScenario).setOnClickListener {
            val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
            val license = sharedPref.getString("LEARNING_GOAL", "b2") ?: "b2"
            
            val intent = Intent(this, QuizCategoryListActivity::class.java)
            intent.putExtra(QuizConstants.KEY_LICENSE, license)
            intent.putExtra(QuizConstants.KEY_TYPE, QuizConstants.TYPE_SCENARIO)
            intent.putExtra(QuizConstants.KEY_CATEGORY_NAME, "Quiz tình huống")
            startActivity(intent)
        }

        // 4. Điều hướng
        findViewById<View>(R.id.btnBack).setOnClickListener {
            com.example.smarttraffic.util.NavigationHelper.navigateTo(this, com.example.smarttraffic.ui.home.HomeActivity::class.java, true)
        }
        com.example.smarttraffic.util.NavigationHelper.setupBottomNav(this, R.id.navQuiz)
    }
}