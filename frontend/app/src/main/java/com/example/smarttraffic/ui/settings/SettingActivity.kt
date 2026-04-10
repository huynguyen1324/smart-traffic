package com.example.smarttraffic.ui.settings

import android.os.Bundle
import android.widget.LinearLayout
import android.widget.Switch
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import android.app.AlertDialog
import android.content.Intent

class SettingsActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)

        val switchPush = findViewById<Switch>(R.id.switchPush)
        val switchWarning = findViewById<Switch>(R.id.switchWarning)
        val switchDarkMode = findViewById<Switch>(R.id.switchDarkMode)

        val itemLanguage = findViewById<LinearLayout>(R.id.itemLanguage)
        val itemSupport = findViewById<LinearLayout>(R.id.itemSupport)
        val itemFeedback = findViewById<LinearLayout>(R.id.itemFeedback)
        val itemAbout = findViewById<LinearLayout>(R.id.itemAbout)
        val tvLogout = findViewById<TextView>(R.id.tvLogout)

        switchPush.setOnCheckedChangeListener { _, isChecked ->
            Toast.makeText(this, "Thông báo đẩy: ${if (isChecked) "Bật" else "Tắt"}", Toast.LENGTH_SHORT).show()
        }

        switchWarning.setOnCheckedChangeListener { _, isChecked ->
            Toast.makeText(this, "Cảnh báo giao thông: ${if (isChecked) "Bật" else "Tắt"}", Toast.LENGTH_SHORT).show()
        }

        switchDarkMode.setOnCheckedChangeListener { _, isChecked ->
            Toast.makeText(this, "Chế độ tối: ${if (isChecked) "Bật" else "Tắt"}", Toast.LENGTH_SHORT).show()
        }

        itemLanguage.setOnClickListener {
            Toast.makeText(this, "Chọn ngôn ngữ (demo)", Toast.LENGTH_SHORT).show()
        }

        itemSupport.setOnClickListener {
            Toast.makeText(this, "Trung tâm hỗ trợ (demo)", Toast.LENGTH_SHORT).show()
        }

        itemFeedback.setOnClickListener {
            Toast.makeText(this, "Góp ý ứng dụng (demo)", Toast.LENGTH_SHORT).show()
        }

        itemAbout.setOnClickListener {
            Toast.makeText(this, "Về chúng tôi (demo)", Toast.LENGTH_SHORT).show()
        }

        tvLogout.setOnClickListener {
            AlertDialog.Builder(this)
                .setTitle("Đăng xuất?")
                .setMessage("Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng An toàn Giao thông?")
                .setPositiveButton("Đăng xuất") { _, _ ->
                    val intent = Intent(this, com.example.smarttraffic.ui.auth.LoginActivity::class.java)
                    intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                    startActivity(intent)
                    finish()
                }
                .setNegativeButton("Hủy", null)
                .show()
        }
    }
}