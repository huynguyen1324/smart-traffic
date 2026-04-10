package com.example.smarttraffic.ui.progress

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R

class ProgressActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_progress)

        // Sửa lỗi nút Back và các tham chiếu ID đã bị xóa trong XML
        findViewById<View>(R.id.btnBack)?.setOnClickListener {
            finish()
        }
    }
}