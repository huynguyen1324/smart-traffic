package com.example.smarttraffic.ui.test

import android.content.Intent
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.home.HomeActivity
import com.example.smarttraffic.util.SessionManager
import com.google.android.material.button.MaterialButton

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của TestResult.
 */
class TestResultActivity : AppCompatActivity() {

        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_test_result)

        val correct = intent.getIntExtra("CORRECT_COUNT", 0)
        val wrong = intent.getIntExtra("WRONG_COUNT", 0)
        val unanswered = intent.getIntExtra("UNANSWERED_COUNT", 0)
        val total = intent.getIntExtra("TOTAL_COUNT", 25)
        
        val tvFinalScore = findViewById<TextView>(R.id.tvFinalScore)
        val tvStatus = findViewById<TextView>(R.id.tvResultStatus)
        val tvCorrectCount = findViewById<TextView>(R.id.tvCorrectCount)
        val tvWrongCount = findViewById<TextView>(R.id.tvWrongCount)
        val tvUnansweredCount = findViewById<TextView>(R.id.tvUnansweredCount)
        val tvMessage = findViewById<TextView>(R.id.tvMessage)
        val tvAdvice = findViewById<TextView>(R.id.tvAdvice)

        tvFinalScore.text = "$correct/$total"
        tvCorrectCount.text = correct.toString()
        tvWrongCount.text = wrong.toString()
        tvUnansweredCount.text = unanswered.toString()

        val passThreshold = if (total >= 35) 32 else 21 // Giả định ngưỡng đạt cho B2 (32/35) và A1 (21/25)
        
        if (correct >= passThreshold) {
            tvStatus.text = "ĐẠT"
            tvStatus.setTextColor(getColor(R.color.primary))
            tvMessage.text = "Chúc mừng bạn đã thi đỗ!"
            tvAdvice.text = "Kết quả tuyệt vời! Bạn đã sẵn sàng cho kỳ thi thật. Hãy tự tin lên nhé."
        } else {
            tvStatus.text = "KHÔNG ĐẠT"
            tvStatus.setTextColor(0xFFEF4444.toInt()) // Red
            tvMessage.text = "Rất tiếc, bạn cần cố gắng thêm!"
            tvAdvice.text = "Đừng nản lòng! Bạn nên ôn tập kỹ hơn các câu hỏi hay bị sai và thử lại lần nữa."
        }

        findViewById<MaterialButton>(R.id.btnHome).setOnClickListener {
            val intent = Intent(this, HomeActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            startActivity(intent)
            finish()
        }

        findViewById<android.view.View>(R.id.btnBack).setOnClickListener {
            finish()
        }
    }
}
