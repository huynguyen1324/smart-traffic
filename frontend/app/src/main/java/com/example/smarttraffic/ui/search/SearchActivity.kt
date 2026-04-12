package com.example.smarttraffic.ui.search

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.home.HomeActivity
import com.example.smarttraffic.ui.lesson.LawListActivity
import com.example.smarttraffic.ui.profile.ProfileActivity
import com.example.smarttraffic.ui.quiz.QuizMenuActivity
import com.example.smarttraffic.ui.sign.SignListActivity

class SearchActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_search)

        // 1. Nút Back
        findViewById<View>(R.id.btnBack).setOnClickListener {
            finish()
        }

        // 2. Các Card Danh mục phổ biến
        findViewById<View>(R.id.cardSign).setOnClickListener {
            startActivity(Intent(this, SignListActivity::class.java))
        }

        findViewById<View>(R.id.cardLesson).setOnClickListener {
            startActivity(Intent(this, LawListActivity::class.java))
        }

        findViewById<View>(R.id.cardQuiz).setOnClickListener {
            startActivity(Intent(this, QuizMenuActivity::class.java))
        }

        // 3. Xử lý xóa lịch sử (Giả lập)
        findViewById<View>(R.id.btnClearHistory)?.setOnClickListener {
            Toast.makeText(this, "Đã xóa lịch sử tìm kiếm", Toast.LENGTH_SHORT).show()
        }

        // 4. Bottom Navigation Bar
        com.example.smarttraffic.util.NavigationHelper.setupBottomNav(this, -1)
    }
}