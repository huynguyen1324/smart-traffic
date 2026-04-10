package com.example.smarttraffic.ui.assistant

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.home.HomeActivity
import com.example.smarttraffic.ui.profile.ProfileActivity
import com.example.smarttraffic.ui.search.SearchActivity
import com.google.android.material.button.MaterialButton

class AssistantActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_assistant)

        // 1. Nút Back
        findViewById<View>(R.id.btnBack).setOnClickListener {
            finish()
        }

        // 2. Xử lý gửi tin nhắn
        val btnSend = findViewById<MaterialButton>(R.id.btnSend)
        val edtMessage = findViewById<EditText>(R.id.edtMessage)

        btnSend.setOnClickListener {
            val text = edtMessage.text.toString()
            if (text.isNotBlank()) {
                Toast.makeText(this, "Bạn hỏi: $text (Tính năng AI đang phát triển)", Toast.LENGTH_SHORT).show()
                edtMessage.text.clear()
            }
        }

        // 3. Các nút gợi ý nhanh
        findViewById<View>(R.id.btnSignAsk).setOnClickListener {
            Toast.makeText(this, "Đang tra cứu biển báo...", Toast.LENGTH_SHORT).show()
        }

        findViewById<View>(R.id.btnTurnRight).setOnClickListener {
            Toast.makeText(this, "Quy tắc rẽ phải: Ưu tiên xe đi thẳng...", Toast.LENGTH_SHORT).show()
        }

        // 4. Bottom Navigation Bar
        com.example.smarttraffic.util.NavigationHelper.setupBottomNav(this, -1)
    }
}