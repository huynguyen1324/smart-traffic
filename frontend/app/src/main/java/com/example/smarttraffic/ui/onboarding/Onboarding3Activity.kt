package com.example.smarttraffic.ui.onboarding

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.auth.LoginActivity
import com.google.android.material.button.MaterialButton

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của Onboarding3.
 */
class Onboarding3Activity : AppCompatActivity() {
        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_onboarding_3)

        val btnStart = findViewById<MaterialButton>(R.id.btnStart)
        val tvSkip = findViewById<View>(R.id.tvSkip)

        btnStart.setOnClickListener { navigateToLogin() }
        tvSkip?.setOnClickListener { navigateToLogin() }
    }

    private fun navigateToLogin() {
        val intent = Intent(this, LoginActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
        startActivity(intent)
    }
}