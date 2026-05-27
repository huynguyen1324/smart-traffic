package com.example.smarttraffic.ui.quiz

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.home.HomeActivity
import com.example.smarttraffic.util.QuizConstants

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của QuizMenu.
 */
class QuizMenuActivity : AppCompatActivity() {

        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_quiz_menu)

        findViewById<View>(R.id.cardTopicLaw).setOnClickListener {
            val intent = Intent(this, QuizCategoryActivity::class.java)
            intent.putExtra(QuizConstants.KEY_TYPE, QuizConstants.TYPE_LAW)
            startActivity(intent)
        }

        findViewById<View>(R.id.cardTopicSign).setOnClickListener {
            val intent = Intent(this, QuizCategoryActivity::class.java)
            intent.putExtra(QuizConstants.KEY_TYPE, QuizConstants.TYPE_SIGN)
            startActivity(intent)
        }

        findViewById<View>(R.id.cardTopicScenario).setOnClickListener {
            val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
            val license = sharedPref.getString("LEARNING_GOAL", "b2") ?: "b2"
            
            val intent = Intent(this, QuizCategoryListActivity::class.java)
            intent.putExtra(QuizConstants.KEY_LICENSE, license)
            intent.putExtra(QuizConstants.KEY_TYPE, QuizConstants.TYPE_SCENARIO)
            intent.putExtra(QuizConstants.KEY_CATEGORY_NAME, "Quiz tình huống")
            startActivity(intent)
        }

        findViewById<View>(R.id.btnBack).setOnClickListener {
            com.example.smarttraffic.util.NavigationHelper.navigateTo(this, com.example.smarttraffic.ui.home.HomeActivity::class.java, true)
        }
        com.example.smarttraffic.util.NavigationHelper.setupBottomNav(this, R.id.navQuiz)
    }
}