package com.example.smarttraffic.ui.simulation

import android.content.Intent
import android.os.Bundle
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của SimulationDetail.
 */
class SimulationDetailActivity : AppCompatActivity() {
        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_simulation_detail)

        findViewById<LinearLayout>(R.id.optionA).setOnClickListener {
            startActivity(Intent(this, SimulationResultActivity::class.java))
        }

        findViewById<LinearLayout>(R.id.optionB).setOnClickListener {
            startActivity(Intent(this, SimulationResultActivity::class.java))
        }

        findViewById<LinearLayout>(R.id.optionC).setOnClickListener {
            startActivity(Intent(this, SimulationResultActivity::class.java))
        }
    }
}
