package com.example.smarttraffic.ui.quiz

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.RelativeLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.lesson.LawListActivity
import com.example.smarttraffic.ui.sign.SignListActivity

class QuizResultActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_quiz_result)

        val score = intent.getIntExtra("score", 0)
        val total = intent.getIntExtra("total", 0)
        val license = intent.getStringExtra("license") ?: "b2"
        val type = intent.getStringExtra("type") ?: "Law"
        val categoryId = intent.getIntExtra("category_id", -1)
        val categoryName = intent.getStringExtra("category_name") ?: "Luyện tập"

        val tvFinalScore = findViewById<TextView>(R.id.tvFinalScore)
        val tvCorrectCount = findViewById<TextView>(R.id.tvCorrectCount)
        val tvWrongCount = findViewById<TextView>(R.id.tvWrongCount)
        val tvResultStatus = findViewById<TextView>(R.id.tvResultStatus)
        val tvAdvice = findViewById<TextView>(R.id.tvAdvice)
        val tvCongratulation = findViewById<TextView>(R.id.tvCongratulation)
        val layoutScoreResult = findViewById<RelativeLayout>(R.id.layoutScoreResult)

        tvFinalScore.text = "$score/$total"
        tvCorrectCount.text = String.format("%02d", score)
        tvWrongCount.text = String.format("%02d", total - score)
        
        val percentage = if (total > 0) (score.toDouble() / total.toDouble() * 100) else 0.0

        when {
            percentage == 100.0 -> {
                tvResultStatus.text = "XUẤT SẮC"
                tvCongratulation.text = "Thật không thể tin nổi!"
                tvAdvice.text = "Bạn là một chuyên gia thực thụ. Không có câu hỏi nào làm khó được bạn. Sẵn sàng đi thi ngay thôi!"
                layoutScoreResult.setBackgroundResource(R.drawable.bg_score_card_excellent)
            }
            percentage >= 80.0 -> {
                tvResultStatus.text = "ĐẠT YÊU CẦU"
                tvCongratulation.text = "Tuyệt vời! Bạn đã vượt qua"
                tvAdvice.text = "Kết quả này rất tốt! Bạn đã nắm vững kiến thức cơ bản. Hãy luyện tập thêm vài lần nữa để tự tin hơn."
                layoutScoreResult.setBackgroundResource(R.drawable.bg_score_card)
            }
            percentage >= 50.0 -> {
                tvResultStatus.text = "KHÁ"
                tvCongratulation.text = "Sắp thành công rồi!"
                tvAdvice.text = "Bạn có nền tảng tốt nhưng cần cẩn thận hơn ở một số câu hỏi lắt léo. Hãy xem lại các câu sai nhé."
                layoutScoreResult.setBackgroundResource(R.drawable.bg_score_card_fair)
            }
            else -> {
                tvResultStatus.text = "CẦN CỐ GẮNG"
                tvCongratulation.text = "Đừng nản lòng nhé!"
                tvAdvice.text = "Bạn cần dành thêm thời gian đọc kỹ tài liệu lý thuyết. Đừng lo, luyện tập nhiều sẽ giúp bạn tiến bộ nhanh thôi."
                layoutScoreResult.setBackgroundResource(R.drawable.bg_score_card_poor)
            }
        }

        findViewById<View>(R.id.btnBack).setOnClickListener { finish() }
        
        // Luyện lại từ đầu
        findViewById<View>(R.id.btnRetryQuiz).setOnClickListener {
            val retryIntent = Intent(this, QuizActivity::class.java)
            retryIntent.putExtra("license", license)
            retryIntent.putExtra("type", type)
            retryIntent.putExtra("category_id", categoryId)
            retryIntent.putExtra("category_name", categoryName)
            startActivity(retryIntent)
            finish()
        }

        // Học lại lý thuyết tương ứng
        findViewById<View>(R.id.btnBackTheory).setOnClickListener {
            val theoryIntent = if (type == "Sign") {
                Intent(this, SignListActivity::class.java)
            } else {
                Intent(this, LawListActivity::class.java)
            }
            startActivity(theoryIntent)
            finish()
        }
    }
}