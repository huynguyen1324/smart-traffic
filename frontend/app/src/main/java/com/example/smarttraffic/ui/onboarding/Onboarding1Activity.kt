package com.example.smarttraffic.ui.onboarding

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.auth.LoginActivity
import com.google.android.material.button.MaterialButton

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của Onboarding1.
 */
class Onboarding1Activity : AppCompatActivity() {
        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_onboarding_1)

        findViewById<MaterialButton>(R.id.btnNext).setOnClickListener {
            startActivity(Intent(this, Onboarding2Activity::class.java))
        }

        findViewById<View>(R.id.tvSkip).setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }
    }
}